import pg from 'pg';
import district__json_file from './data/ek_obl.json' with {type: 'json'};
import township__json_file from './data/ek_obst.json' with {type: 'json'};
import cityhalls__json_file from './data/ek_kmet.json' with {type: 'json'};
import villages__json_file from './data/ek_sobr.json' with {type: 'json'};
import dotenv from 'dotenv';

// import { insert_into_district, insert_into_township, 
//         insert_into_cityhalls, insert_into_villages } from "./services/databese_inserts.js";
import { safe_insert_into_table } from './services/databese_inserts.js';
import { safe_get_village_values } from './services/village.js';

// "use strict";

dotenv.config();

const { Client } = pg;

const client = new Client({
    user: process.env.PDB_USER,
    password: process.env.PDB_PASSWORD,
    host: process.env.PDB_HOST,
    port: process.env.PDB_PORT,
    database: process.env.PDB_NAME,
});
await client.connect();


try {

    //CHECK FOR CONNECTION
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message)

    // const curr_db = await client.query('SELECT current_database()');
    // console.log(curr_db.rows);

    ///INSERT
    // const district_insert = 'INSERT INTO district(id, name, name_en, center_id) VALUES($1, $2, $3, $4) RETURNING *';
    // await safe_insert_into_table(district_insert, client, 'District', district__json_file, row => [row.oblast, row.name, row.name_en, row.ekatte]);

    // const township_insert = ' INSERT INTO township(id, name, name_en, district_id, center_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    // await safe_insert_into_table(township_insert, client, 'Township', township__json_file, row => [row.obshtina, row.name, row.name_en, row.obshtina.substring(0,3), row.ekatte]);

    // const cityhalls_insert = ' INSERT INTO cityhall(id, name, name_en, township_id) VALUES($1, $2, $3, $4) RETURNING *;';
    // await safe_insert_into_table(cityhalls_insert, client, 'Cityhalls', cityhalls__json_file, row => [row.kmetstvo, row.name, row.name_en, row.kmetstvo.substring(0,5)]);

    const villages_insert = ' INSERT INTO villages(id, name, name_en, township_id, district_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    await safe_insert_into_table(villages_insert, client, 'Villages', villages__json_file, safe_get_village_values);

    ///SELECT
    // const district_res = await client.query('SELECT * from district;');
    // console.log(district_res.rows);
} catch (err) {
    console.log("Error in query: ", err);
} finally {
    await client.end()
}

