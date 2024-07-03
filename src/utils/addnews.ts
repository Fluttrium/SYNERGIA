export type NewsData = {
  date?: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

    

export function addNews(data: NewsData): Promise<string> {
  const apiEndpoint = '/api/additem';

  return fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to add news');
      }
      return res.json();
    })
    .then((response) => {
      return response.message;
    })
    .catch((err) => {
      console.error('Error adding news:', err);
      throw err; // Перебросить ошибку для обработки в коде вызывающего места
    });
}

