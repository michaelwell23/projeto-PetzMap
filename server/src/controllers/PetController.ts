import { Request, Response, request } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import petsView from '../views/pets_view';
import Pets from '../models/Pet';

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
    } = request.body;

    const petsRepository = getRepository(Pets);
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
    const petsRepository = getRepository(Pets);

    const pets = await petsRepository.find({
      relations: ['images'],
    });

    return response.json(petsView.renderMany(pets));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const petsRepository = getRepository(Pets);

    const pet = await petsRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(petsView.render(pet));
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const petsRepository = getRepository(Pets);

    const pet = await petsRepository.findOne(id);
    if (!pet) {
      return response.status(404).json({ message: 'Pet not found' });
    }

    await petsRepository.delete(id);

    return response.status(204).send();
  },

  async renew(request: Request, response: Response) {
    const { id } = request.params;
    const petsRepository = getRepository(Pets);

    const pet = await petsRepository.findOne(id);

    if (!pet) {
      return response.status(404).json({ message: 'Pet not found' });
    }

    pet.createdAt = new Date();
    await petsRepository.save(pet);

    return response.json({ message: 'Cadastro renovado por mais 60 dias' });
  },
};
