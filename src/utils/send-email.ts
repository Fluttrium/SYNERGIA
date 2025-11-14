import { ContactFormValues } from '@/components/form';

export async function sendEmail(data: ContactFormValues) {
  const apiEndpoint = '/api/email';
  const formData = new FormData();

  formData.append('category', data.category);
  formData.append('fullName', data.fullName);
  formData.append('organization', data.organization ?? '');
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('message', data.message);

  if (data.attachments && data.attachments.length > 0) {
    Array.from(data.attachments).forEach((file) => {
      formData.append('attachments', file);
    });
  }

  const response = await fetch(apiEndpoint, {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || 'Не удалось отправить обращение');
  }

  return payload;
}