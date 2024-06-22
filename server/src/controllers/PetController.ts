import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import petsView from '../views/pets_view';
import Pet from '../models/Pet';

import {
  sendDonationConfirmationEmail,
  sendMail,
} from '../services/EmailService';

export default {
  async create(request: Request, response: Response) {
    const {
      id,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      ad_title,
      species,
      breed,
      sex,
      castrated,
      color_animal,
      info_pet,
      info_donation,
      createdAt,
    } = request.body;

    const petsRepository = getRepository(Pet);
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return {
        path: image.filename,
      };
    });

    const data = {
      id,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      ad_title,
      species,
      breed,
      sex,
      castrated,
      color_animal,
      info_pet,
      info_donation,
      images,
      createdAt,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      whatsapp: Yup.string().required('WhatsApp number is required'),
      latitude: Yup.number()
        .required('Latitude is required')
        .typeError('Latitude must be a number'),
      longitude: Yup.number()
        .required('Longitude is required')
        .typeError('Longitude must be a number'),
      ad_title: Yup.string().required('Ad title is required'),
      species: Yup.string().required('Species is required'),
      breed: Yup.string().default('Não informar'),
      sex: Yup.string().required('Sex is required'),
      castrated: Yup.string().default('Não informar'),
      color_animal: Yup.string().required('Color is required'),
      info_pet: Yup.string().required('Information about the pet is required'),
      info_donation: Yup.string().required(
        'Information about the donation is required'
      ),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required('Image path is required'),
        })
      )
        .required('At least one image is required')
        .min(1, 'At least one image is required'),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const pet = petsRepository.create(data);
    await petsRepository.save(pet);

    return response.status(201).json(petsView.render(pet));
  },

  async index(request: Request, response: Response) {
    const petsRepository = getRepository(Pet);

    const pets = await petsRepository.find({
      relations: ['images'],
    });

    return response.json(petsView.renderMany(pets));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const petsRepository = getRepository(Pet);

    const pet = await petsRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(petsView.render(pet));
  },

  async renew(req: Request, res: Response) {
    const petRepository = getRepository(Pet);
    const petId = req.params.id;

    try {
      const pet = await petRepository.findOne(petId);

      if (!pet) {
        return res.status(404).send('Registration not found.');
      }

      pet.createdAt = new Date();
      await petRepository.save(pet);

      res.send('Registration successfully renewed!');
    } catch (error) {
      res.status(500).send('Error renewing registration.');
    }
  },

  async delete(req: Request, res: Response) {
    const petRepository = getRepository(Pet);
    const petId = req.params.id;

    try {
      const pet = await petRepository.findOne(petId);

      if (!pet) {
        return res.status(404).send('Registration not found.');
      }

      await petRepository.remove(pet);

      res.send('Registration successfully deleted!');
    } catch (error) {
      res.status(500).send('Error deleting registration.');
    }
  },

  async contactPetOwner(req: Request, res: Response) {
    const { id } = req.params;
    const petRepository = getRepository(Pet);

    try {
      const pet = await petRepository.findOne(id);

      if (!pet) {
        return res.status(404).json({ error: 'Pet não encontrado' });
      }

      const subject = 'A doação foi realizada?';
      const html = `
        <p>Olá, gostaríamos de saber se a doação do pet foi realizada.</p>
        <p>
          <a href="${process.env.APP_URL}/confirm-donation/${id}?confirmed=true">Sim</a>
          <a href="${process.env.APP_URL}/confirm-donation/${id}?confirmed=false">Não</a>
        </p>
      `;

      await sendMail(pet.email, subject, html);

      // Marcar como inativo
      pet.active = false;
      await petRepository.save(pet);

      res
        .status(200)
        .json({ message: 'E-mail enviado e pet marcado como inativo' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar solicitação' });
    }
  },

  async confirmDonation(req: Request, res: Response) {
    const { id } = req.params;
    const { confirmed } = req.query;
    const petRepository = getRepository(Pet);

    try {
      const pet = await petRepository.findOne(id);

      if (!pet) {
        return res.status(404).json({ error: 'Pet não encontrado' });
      }

      // Se a confirmação não foi recebida, envia e-mail de confirmação
      if (confirmed === undefined) {
        await sendDonationConfirmationEmail(pet);
        return res
          .status(200)
          .json({ message: 'Email de confirmação enviado com sucesso.' });
      }

      // Atualizar o status de doação apenas se houver confirmação explícita
      if (confirmed === 'true') {
        pet.active = false; // Marca como inativo se confirmado
      } else if (confirmed === 'false') {
        pet.active = true; // Deixa ativo se a doação foi cancelada
      }

      await petRepository.save(pet);
      return res
        .status(200)
        .json({ message: 'Status de doação atualizado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao processar solicitação' });
    }
  },

  async contact(req: Request, res: Response) {
    const { id } = req.params;
    const petRepository = getRepository(Pet);

    try {
      const pet = await petRepository.findOne(id);

      if (!pet) {
        return res.status(404).json({ error: 'Pet não encontrado' });
      }

      await sendDonationConfirmationEmail(pet);
      return res
        .status(200)
        .json({ message: 'Email de contato enviado com sucesso.' });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Erro ao enviar e-mail de contato.' });
    }
  },
};
