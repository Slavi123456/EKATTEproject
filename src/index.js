import pg from 'pg';
import district__json_file from './data/ek_obl.json' with {type: 'json'};
import township__json_file from './data/ek_obst.json' with {type: 'json'};
import cityhalls__json_file from './data/ek_kmet.json' with {type: 'json'};
import villages__json_file from './data/ek_sobr.json' with {type: 'json'};
import dotenv from 'dotenv';

// import { insert_into_district, insert_into_township, 
//         insert_into_cityhalls, insert_into_villages } from "./services/databese_inserts.js";
import { insert_into_table, get_village_values } from './services/databese_inserts.js';

// "use strict";

dotenv.config();

const {Client} = pg;

const client = new Client({
  user: process.env.PDB_USER,
  password: process.env.PDB_PASSWORD,
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  database: process.env.PDB_NAME,
});
await client.connect();


try {
    
    // const text = "(VAR06) общ. Варна, обл. Варна";
    // const text7 = "(21141) с. Димчево, общ. Бургас, обл. Бургас";
    // const text8 = "(27632) гр. Етрополе, общ. Етрополе, обл. София";
    
    // const text1 = "(12345) общ. VARNA, обл. Варна";
    // const text4 = "(12345) общ. Варна, обл. дасдадасдасдадсададасдса";
    // const text2 = "(жа) общ. Варна, обл. Варна";
    // const text3 = "(12345678) общ. Варна, обл. Варна";
    // const text5 = "(12345)  Варна, обл. дасдадасдасдадсададасдса";
    // const text6 = "(12_45) общ. Варна, обл. Варна";

    
    // const texts = [text, text7, text8,  text1, text2, text3, text4, text5,text6];
    // const texts = ["(DOB03) общ. Балчик, обл. Добрич"];
    // // const village_area_regex = /^\(([A-Za-z0-9]{5})\)\s*(?:(?:с\.|гр\.)?\s*([^,]+),\s*)?общ\.?\s*([^,]+),\s*обл\.?\s*(.+)$/;

    // for(let i = 0; i < texts.length; i++) {
    //     const ids = await get_ids_from_text(texts[i]);
    //     if (ids.length < 2) {
    //         console.log("Failed text:", texts[i]);

    //         continue;
    //     } else if (ids[0].length == 0 || ids[1].length == 0) {
    //         console.log("Failed text:", texts[i]);
    //         continue;
    //     }else {
    //         console.log("Succesful text:", texts[i], "with result", ids[0], ids[1]);
    //     }
    // }

    //CHECK FOR CONNECTION
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message)
    
    // const curr_db = await client.query('SELECT current_database()');
    // console.log(curr_db.rows);

    ///INSERT
    //////Old inserts
    // const district_insert = 'INSERT INTO district(id, name, name_en, center_id) VALUES($1, $2, $3, $4) RETURNING *';
    // await insert_into_district(district_insert, client, 'District', district__json_file);
    
    // const township_insert = ' INSERT INTO township(id, name, name_en, district_id, center_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    // await insert_into_township(township_insert, client, 'Township', township__json_file);
    
    // const cityhalls_insert = ' INSERT INTO cityhall(id, name, name_en, township_id) VALUES($1, $2, $3, $4) RETURNING *;';
    // await insert_into_cityhalls(cityhalls_insert, client, 'Cityhalls', cityhalls__json_file);
    
    // const villages_insert = ' INSERT INTO villages(id, name, name_en, township_id, district_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    // await insert_into_villages(villages_insert, client, 'Villages', villages__json_file);
    
    //////New inserts
    // const district_insert = 'INSERT INTO district(id, name, name_en, center_id) VALUES($1, $2, $3, $4) RETURNING *';
    // await insert_into_table(district_insert, client, 'District', district__json_file, row => [row.oblast, row.name, row.name_en, row.ekatte]);
    
    // const township_insert = ' INSERT INTO township(id, name, name_en, district_id, center_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    // await insert_into_table(township_insert, client, 'Township', township__json_file, row => [row.obshtina, row.name, row.name_en, row.obshtina.substring(0,3), row.ekatte]);
    
    // const cityhalls_insert = ' INSERT INTO cityhall(id, name, name_en, township_id) VALUES($1, $2, $3, $4) RETURNING *;';
    // await insert_into_table(cityhalls_insert, client, 'Cityhalls', cityhalls__json_file, row => [row.kmetstvo, row.name, row.name_en, row.kmetstvo.substring(0,5)]);
    
    // const villages_insert = ' INSERT INTO villages(id, name, name_en, township_id, district_id) VALUES($1, $2, $3, $4, $5) RETURNING *;';
    // await insert_into_table(villages_insert, client, 'Villages', villages__json_file, get_village_values);
    
    ///SELECT
    // const district_res = await client.query('SELECT * from district;');
    // console.log(district_res.rows);
}catch(err) {
    console.log("Error in query: ", err);
}finally {
    await client.end()
}

