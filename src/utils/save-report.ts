import { FormData } from '@/components/form';

export function saveReport(data: FormData) {
    const apiEndpoint = '/api/report';

    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message);
        })
        .catch((err) => {
            alert(err);
        });
}