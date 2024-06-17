import { getRepository } from 'typeorm';
import cron from 'node-cron';

import Pets from '../models/Pet';

class CleanupService {
  public start() {
    cron.schedule('0 0 * * *', async () => {
      const petsRepository = getRepository(Pets);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 60);

      try {
        await petsRepository
          .createQueryBuilder()
          .delete()
          .from(Pets)
          .where('createdAt < :cutoffDate', { cutoffDate })
          .execute();

        console.log('Registros antigos excluídos com sucesso');
      } catch (error) {
        console.error('Erro ao excluir registros antigos:', error);
      }
    });
  }
}

export default new CleanupService();
