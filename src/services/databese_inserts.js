import { validateMany } from "../utils/validation.js";
import dotenv from 'dotenv';
import {withErrorHandling } from "../utils/errorHandling.js";

export { safe_insert_into_table};

dotenv.config();

// const safe_insert_into_table = withErrorHandling(insert_into_table, {notRethrow: true});
const safe_insert_into_table = withErrorHandling(insert_into_table);

async function insert_into_table(insert_statement, db_client, table_name, file_json, valueMapper) {
  /////////////////////////////////////////////////////
  //Validation
  validateMany ( {
    insert_statement: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    db_client: process.env.VALIDATION_TYPE_DB_CLIENT,
    table_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    file_json: process.env.VALIDATION_TYPE_ARRAY,
    valueMapper: process.env.VALIDATION_TYPE_FUNCTION
  }, arguments);

  /////////////////////////////////////////////////////
  //Actual logic
  console.log("Inserting into table " + table_name);
  // console.log(file_json.length - 1);
  // let succesful_isertions = 0;

  let data_count = file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES;
  for (let i = 0; i < data_count; i++) {
    let values = await valueMapper(file_json[i], db_client);
    // console.log(values);
    
    const res = await db_client.query(insert_statement, values);
    // succesful_isertions++;
  }
  
  // console.log(
  //   `Successfuly inserted into table ${table_name} this many rows ${succesful_isertions}`
  // );
}

//////////////////////////////////////
// async function insert_into_district(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].oblast, file_json[i].name, file_json[i].name_en, file_json[i].ekatte];
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_township(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].obshtina, file_json[i].name, file_json[i].name_en, file_json[i].obshtina.substring(0,3), file_json[i].ekatte];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_cityhalls(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;
//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].kmetstvo, file_json[i].name, file_json[i].name_en, file_json[i].kmetstvo.substring(0,5)];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_villages(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     // console.log(file_json.length);
//     // console.log(file_json[0]);

//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {

//         const ids = await get_ids_from_text(file_json[i].area1, client);
//         if (ids.length < 2 || ids[0].length == 0 || ids[1].length == 0) {
//             console.log("Failed text:", file_json[i].area1);
//             continue;
//         }else {
//             // console.log("Succesful text:", file_json[i].area1, "with result", ids[0], ids[1]);
//         }

//         const values = [file_json[i].ekatte, file_json[i].name, file_json[i].name_en, ids[0],  ids[1]];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////




