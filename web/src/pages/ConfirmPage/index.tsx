import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from 'services/api';

const ConfirmDonation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const query = new URLSearchParams(useLocation().search);
  const confirmed = query.get('confirmed');

  useEffect(() => {
    const confirmDonation = async () => {
      try {
        await api.post(`/pets/${id}/confirmDonation?confirmed=${confirmed}`);
        alert('Status de doação atualizado com sucesso.');
      } catch (error) {
        alert('Erro ao atualizar status de doação.');
      }
    };

    confirmDonation();
  }, [id, confirmed]);

  return <p>Processando sua confirmação...</p>;
};

export default ConfirmDonation;
