import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

type SQLiteDatabase = Database<sqlite3.Database, sqlite3.Statement>;

let db: SQLiteDatabase | null = null;

export async function GET(req: Request): Promise<Response> {
  try {
    
    if (!db) {
      
      db = await open({
        filename: "./collection.db", 
        driver: sqlite3.Database,
      });
    }

    
    const items = await db.all("SELECT * FROM items");

    
    return new Response(JSON.stringify(items), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error querying database:", error);

    
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
