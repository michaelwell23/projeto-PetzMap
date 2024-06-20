import cron from 'node-cron';
import { getRepository } from 'typeorm';
import Pet from '../models/Pet';

const scheduleInactivePetsCleanup = () => {
  cron.schedule('0 0 * * *', async () => {
    const petRepository = getRepository(Pet);

    try {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      await petRepository.delete({
        active: false,
        updatedAt: { $lt: threeDaysAgo },
      });
      console.log('Pets inativos há mais de 3 dias excluídos com sucesso');
    } catch (error) {
      console.error('Erro ao excluir pets inativos:', error);
    }
  });
};

export default scheduleInactivePetsCleanup;
