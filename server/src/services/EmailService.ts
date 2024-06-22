import nodemailer from 'nodemailer';
import Pets from '../models/Pet';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '2525'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
    console.log('Email enviado para', to);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};

export const sendDonationConfirmationEmail = async (pet: Pets) => {
  const confirmationLink = `${process.env.FRONTEND_URL}/confirmDonation/${pet.id}?confirmed=true`;
  const cancellationLink = `${process.env.FRONTEND_URL}/confirmDonation/${pet.id}?confirmed=false`;

  const html = `
    <p>Por favor, confirme a doação do seu pet clicando no link abaixo:</p>
    <p><a href="${confirmationLink}">Confirmar Doação</a></p>
    <p>Se você não deseja confirmar a doação, clique no link abaixo:</p>
    <p><a href="${cancellationLink}">Cancelar Doação</a></p>
  `;

  await sendMail(pet.email, 'Confirmação de Doação', html);
};
