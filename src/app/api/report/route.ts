import {NextRequest, NextResponse} from "next/server";
import {addReport, initDatabase} from "@/db/db";

export async function POST(request: NextRequest) {
    const {email, name, message} = await request.json();
    const saveReportPromise = () =>
        new Promise<string>(async (resolve, reject) => {
            await initDatabase();
            addReport({email, name, message}, function (err) {
                if (!err) {
                    resolve("Report saved!");
                } else {
                    reject(err.message);
                }
            })
        });


    try {
        await saveReportPromise();
        return NextResponse.json({ message: "Email sent" });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }

}