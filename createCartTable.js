import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import path from 'node:path'


export async function createCartTable() {
    const db = await open({
        filename:path.join('database.db'),
        driver:sqlite3.Database
    });
    await db.exec(`CREATE TABLE IF NOT EXISTS cart_items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTERGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
        )`)
    
    await db.close();   
}