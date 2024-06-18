import { getRepository, LessThanOrEqual } from 'typeorm';
import Pets from '../models/Pet';
import EmailService from './EmailService';
import { subDays } from 'date-fns';

class CleanupService {
  private interval: NodeJS.Timeout;

  public start() {
    this.interval = setInterval(async () => {
      const petsRepository = getRepository(Pets);

      const now = new Date();
      const warningDate = subDays(now, 55);

      const petsToWarn = await petsRepository.find({
        where: {
          createdAt: LessThanOrEqual(warningDate),
        },
      });

      for (const pet of petsToWarn) {
        const renewUrl = `${process.env.BACKEND_URL}/api/pets/renew/${pet.id}`;
        const deleteUrl = `${process.env.BACKEND_URL}/api/pets/delete/${pet.id}`;
        const message = `Seu cadastro será excluído em 5 dias. Para renovar por mais 60 dias, clique no link: ${renewUrl}.\nPara deletar o cadastro agora, clique no link: ${deleteUrl}`;
        await EmailService.sendMail(
          pet.email,
          'Aviso de Exclusão de Cadastro',
          message
        );
      }

      const deleteDate = subDays(now, 60);
      const petsToDelete = await petsRepository.find({
        where: {
          createdAt: LessThanOrEqual(deleteDate),
        },
      });

      for (const pet of petsToDelete) {
        await petsRepository.delete(pet.id);
      }
    }, 24 * 60 * 60 * 1000);
  }

  public stop() {
    clearInterval(this.interval);
  }
}

export default new CleanupService();
