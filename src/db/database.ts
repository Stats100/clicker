import sqlite3 from 'sqlite3';
import * as fs from 'fs';
import path from 'path';

const CLICKS_FILE_PATH = './src/db/data/clicks.txt';
const DB_FILE_PATH = './src/db/data/db.db';
const DB_DIRECTORY_PATH = path.dirname(DB_FILE_PATH);

let db: any;
let isInit: boolean = false;
let clicksToAdd: number = 0;
let dbLastValueSaved: number = 0;

function initDb() {
    if (isInit) {
        console.log('initDb() was called again');
        return;
    }

    // Create the directory if it doesn't exist
    if (!fs.existsSync(DB_DIRECTORY_PATH)) {
        fs.mkdirSync(DB_DIRECTORY_PATH, { recursive: true });
    }

    // ./data/clicks.txt
    try {
        if (!fs.existsSync(CLICKS_FILE_PATH)) {
            fs.writeFileSync(CLICKS_FILE_PATH, '0');
        }
    }
    catch (error) {
        console.error('Error initalising clicks.txt: ', error);
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
    }
    catch (error) {
        console.error('Error initialising database:', error);
        throw error;
    }
    isInit = true;
}
initDb();

export async function getClicks(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(CLICKS_FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

export async function increaseClicks() {
    clicksToAdd += 1;
}

setInterval(async () => {
    if (clicksToAdd == 0) return;
    try {
        // Read the file asynchronously
        const fileContents = await fs.promises.readFile(CLICKS_FILE_PATH, 'utf8');

        // Parse the file contents as a number
        let currentValue = parseInt(fileContents, 10);

        // Add the addend to the current value
        currentValue += clicksToAdd;

        // Write the updated value back to the file
        await fs.promises.writeFile(CLICKS_FILE_PATH, currentValue.toString(), 'utf8');

        console.log(`Updated value (${currentValue}) has been written to ${CLICKS_FILE_PATH}`);
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }

    clicksToAdd = 0;
}, 100);

setInterval(async () => {
    const fileContents = parseInt(await fs.promises.readFile(CLICKS_FILE_PATH, 'utf8'), 10);
    if (dbLastValueSaved == fileContents) return;
    dbLastValueSaved = fileContents;
    try {
        db.run('INSERT INTO clicks (epochTime, clicks) VALUES (?, ?)', [new Date().getTime(), fileContents], function(err: any) {
            if (err) {
                console.error('Error inserting data:', err);
            }
            else {
                console.log('New row inserted successfully');
            }
        });
    }
    catch (e) {
        console.error('Error:', e);
        throw e;
    }
}, 1000);