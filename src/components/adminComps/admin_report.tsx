interface Report {
    id: number;
    name: string;
    email: string;
    message: string;
}
export default function AdminReport({ report }: { report: Report[] | null }) {
    if (!report || report.length === 0) {
        return <div>Нет доступных отчетов.</div>;
    }

    return (
        <section className=" flex w-screen h-screen justify-center items-center">
        <div className=" flex ">
            <div>
            {report.map((r) => (
                <div key={r.id}>
                    <h2>{r.name}</h2>
                    <p>{r.email}</p>
                    <p>{r.message}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
