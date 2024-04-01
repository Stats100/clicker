import sqlite3 from 'sqlite3';
import * as fs from 'fs';
import path from 'path';

const CLICKS_FILE_PATH  = './src/db/data/clicks.txt'
const DB_FILE_PATH = './src/db/data/db.db';
const DB_DIRECTORY_PATH = path.dirname(DB_FILE_PATH);

let db:any;

export function initDb() {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(DB_DIRECTORY_PATH)) {
        fs.mkdirSync(DB_DIRECTORY_PATH, { recursive: true });
    }

    // ./data/clicks.txt
    try {
        if (!fs.existsSync(CLICKS_FILE_PATH)) {
            fs.writeFileSync(CLICKS_FILE_PATH, '0')
        }
    } catch (error) {
        console.error('Error initalising clicks.txt: ', error)
        throw error;
    }

    // ./data/db.db
    try {
        // Create the database file if it doesn't exist
        if (!fs.existsSync(DB_FILE_PATH)) {
            fs.writeFileSync(DB_FILE_PATH, '');
        }

        db = new sqlite3.Database(DB_FILE_PATH);
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS clicks (
                    epochTime INTEGER,
                    clicks INTEGER
                );     
            `);
        });
    } catch (error) {
        console.error('Error initialising database:', error);
        throw error;
    }
}
