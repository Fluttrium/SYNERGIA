import { FormData } from '@/components/form';
import { Report } from "@/types";
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

export function getReport(): Promise<Report[]> {
    const apiEndpoint = '/api/report';

    return fetch(apiEndpoint, {
        method: 'GET',
    })
        .then((res) => res.json())
        .then((response) => {
            return response as Report[]; // Указываем тип возвращаемого значения
        })
        .catch((err) => {
            console.error("Ошибка при получении отчета:", err);
            throw err;
        });
}