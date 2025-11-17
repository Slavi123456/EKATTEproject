import pg from 'pg';
import readFile from './data/ek_kmet.json' with {type: 'json'};
import dotenv from 'dotenv';

dotenv.config();

// console.log(readFile[0].name);
// console.log(process.env.PDB_PASSWORD);
// console.log(process.env.PDB_NAME);

const {Client} = pg;

const client = new Client({
  user: process.env.PDB_USER,
  password: process.env.PDB_PASSWORD,
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  database: process.env.PDB_NAME,
});
await client.connect();


const text = `
    CREATE TABLE IF NOT EXISTS villages ( 
    id          integer PRIMARY KEY,
    name        char(25) UNIQUE,
    township_id integer NOT NULL
        CHECK ( name IS NOT NULL AND name <> '')
) `;
const values = [];

try {
    //CHECK FOR CONNECTION
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message)
    
    // const curr_db = await client.query('SELECT current_database()');
    // console.log(curr_db.rows);

    //////CREATE TABLE
    // const tableCreate = await client.query(text, values)
    // console.log(tableCreate.rows[0])

    ///INSERT
    // const insert_into_db = 'INSERT INTO villages(id, name, township_id) VALUES($1, $2, $3) RETURNING *';
    // const ins_values = ['2', 'саlvi','4'];
 
    // const ins_res = await client.query(insert_into_db, ins_values)
    // console.log(ins_res.rows[0]);
    // console.log(ins_res.rows[1]);

    ///SELECT
    const sel_res = await client.query('SELECT * from villages;');
    console.log(sel_res.rows);
}catch(err) {
    console.log("Error in query: ", err);
}finally {
    await client.end()
}

