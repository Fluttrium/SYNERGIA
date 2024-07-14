import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

interface BukletRow {
  id: number;
  name: string;
  image: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    db.all<BukletRow>("SELECT id, name, image FROM buklets", [], (err, rows) => {
      if (err) {
        console.error('Ошибка при получении буклетов:', err);
        res.status(500).json({ error: 'Ошибка при получении буклетов' });
        reject(err);
      } else {
        const result = rows.map((row) => ({
          ...row,
          image: JSON.parse(row.image),
        }));
        res.status(200).json(result);
        resolve();
      }
    });
  });
}
