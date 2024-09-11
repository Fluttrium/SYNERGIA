"use client"
import { useEffect, useState } from "react";
import AdminReport from "@/components/adminComps/admin_report";
import { getReport } from "@/utils/save-report";
import { Report } from "@/types";

export const revalidate = 0;

export default function Home() {
    const [report, setReport] = useState<Report[] | null>(null);

    useEffect(() => {
        getReport()
            .then((data) => setReport(data))
            .catch((err) => console.error("Ошибка при загрузке отчетов:", err));
    }, []);

    return (
        <>
            <AdminReport report={report} />
        </>
    );
}
