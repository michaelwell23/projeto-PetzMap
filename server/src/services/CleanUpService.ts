import { getRepository } from 'typeorm';
import { sendMail } from './EmailService';
import Pets from '../models/Pet';

export const cleanUpRecords = async () => {
  const daysUntilDeletion = 60;
  const daysUntilNotification = 55;

  const today = new Date();
  const backendUrl = process.env.BACKEND_URL;

  try {
    const petRepository = getRepository(Pets);
    const pets = await petRepository.find();

    for (const pet of pets) {
      const daysSinceCreation = Math.floor(
        (today.getTime() - pet.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceCreation === daysUntilNotification) {
        const renewUrl = `${backendUrl}/pets/renew/${pet.id}`;
        const deleteUrl = `${backendUrl}/pets/delete/${pet.id}`;

        await sendMail(
          pet.email,
          'Renew registration?',
          `Your registration will be deleted in ${daysUntilDeletion} days. Do you want to renew?
           <a href="${renewUrl}">Renew Registration</a> | <a href="${deleteUrl}">Delete Registration</a>`
        );
      } else if (daysSinceCreation === daysUntilDeletion) {
        await petRepository.remove(pet);
        console.log(`Deleting pet with ID ${pet.id}`);
      }
    }

    console.log('Record verification and deletion completed.');
  } catch (error) {
    console.error('Error executing verification and deletion:', error);
  }
};
