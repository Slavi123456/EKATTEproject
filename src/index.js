import pg from 'pg';
import district__json_file from './data/ek_obl.json' with {type: 'json'};
import township__json_file from './data/ek_obst.json' with {type: 'json'};
import cityhalls__json_file from './data/ek_kmet.json' with {type: 'json'};
import villages__json_file from './data/ek_sobr.json' with {type: 'json'};
import dotenv from 'dotenv';

dotenv.config();

// console.log(readFile[0].name);
// console.log(township__json_file[0].name_en);
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


const create_district = `CREATE TABLE district
(
    id        char(3) PRIMARY KEY NOT NULL,
    name      varchar(25) UNIQUE,
    center_id integer      NOT NULL 
        CHECK (name IS NOT NULL AND name <> '')
        CHECK ( length(id) = 3)
);`; 
try {
    //CHECK FOR CONNECTION
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message)
    
    // const curr_db = await client.query('SELECT current_database()');
    // console.log(curr_db.rows);

    //////CREATE TABLE
    // const tableCreate = await client.query(text, values)
    // console.log(tableCreate.rows[0])

    // const district_Create = await client.query(create_district);

    ///INSERT

    const district_insert = 'INSERT INTO district(id, name, center_id) VALUES($1, $2, $3) RETURNING *';
    await insert_into_district_table(district_insert, client, 'District', district__json_file);
    
    const township_insert = ' INSERT INTO township(id, name,district_id, center_id) VALUES($1, $2, $3, $4) RETURNING *;';
    await insert_into_township_table(township_insert, client, 'Township', township__json_file);
    
    const cityhalls_insert = ' INSERT INTO cityhall(id, name, township_id) VALUES($1, $2, $3) RETURNING *;';
    await insert_into_cityhalls_table(cityhalls_insert, client, 'Cityhalls', cityhalls__json_file);
    
    const villages_insert = ' INSERT INTO villages(id, name, township_id, district_id) VALUES($1, $2, $3, $4) RETURNING *;';
    await insert_into_villages_table(villages_insert, client, 'Villages', villages__json_file);
    
    ///SELECT
    // const district_res = await client.query('SELECT * from district;');
    // console.log(district_res.rows);
}catch(err) {
    console.log("Error in query: ", err);
}finally {
    await client.end()
}

async function create_table(create_table_text, client, table_name) {
    
    try {
        const table_create = await client.query(create_table_text);
        
        console.log("Created table " + table_create.rows[0]);
        return true;
    }
    catch (err) {
        console.log("Error in query: ", err);
        return false;
    }
    finally {

    }
}

async function insert_into_district_table(insert_into_table_text, client, table_name, file_json) {
    console.log("Inserting into table " + table_name);
    let succesful_isertions = 0;

    for (let i = 0; i < file_json.length - process.env.EKATTE_OBLASTI_EXTRA_LINES; i++) {
        const values = [file_json[i].oblast, file_json[i].name_en, file_json[i].ekatte];
        try {
            const res = await client.query(insert_into_table_text, values);
            succesful_isertions ++;
        }
        catch (err){
            // console.log("Error in query: ", err);
        }
    }
    console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
}

async function insert_into_township_table(insert_into_table_text, client, table_name, file_json) {
    console.log("Inserting into table " + table_name);
    let succesful_isertions = 0;

    for (let i = 0; i < file_json.length - process.env.EKATTE_OBLASTI_EXTRA_LINES; i++) {
        const values = [file_json[i].obshtina, file_json[i].name_en, file_json[i].obshtina.substring(0,3),file_json[i].ekatte];
        // console.log(values);
        try {
            const res = await client.query(insert_into_table_text, values);
            succesful_isertions ++;
        }
        catch (err){
            // console.log("Error in query: ", err);
        }
    }
    console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
}

async function insert_into_cityhalls_table(insert_into_table_text, client, table_name, file_json) {
    console.log("Inserting into table " + table_name);
    let succesful_isertions = 0;

    for (let i = 0; i < file_json.length - process.env.EKATTE_OBLASTI_EXTRA_LINES; i++) {
        const values = [file_json[i].kmetstvo, file_json[i].name_en, file_json[i].kmetstvo.substring(0,5)];
        // console.log(values);
        try {
            const res = await client.query(insert_into_table_text, values);
            succesful_isertions ++;
        }
        catch (err){
            // console.log("Error in query: ", err);
        }
    }
    console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
}

async function insert_into_villages_table(insert_into_table_text, client, table_name, file_json) {
    console.log("Inserting into table " + table_name);
    let succesful_isertions = 0;

    console.log(file_json.length);
    console.log(file_json[0]);
    
    for (let i = 0; i < file_json.length - process.env.EKATTE_OBLASTI_EXTRA_LINES; i++) {
        const values = [file_json[i].ekatte, file_json[i].name_en, file_json[i].area1.substring(1,6), file_json[i].area1.substring(1,4)];
        // console.log(values);
        try {
            const res = await client.query(insert_into_table_text, values);
            succesful_isertions ++;
        }
        catch (err){
            // console.log("Error in query: ", err);
        }
    }
    console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
}