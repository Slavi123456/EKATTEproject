import { parse_names_from_village_text } from "../utils/villageParser.js";
import { select_id_query_from_district } from "../db/district.js";
import { select_id_query_from_township } from "../db/township.js";
import { validateMany } from "../utils/validation.js";
import { withErrorHandling } from "../utils/errorHandling.js";
import dotenv from 'dotenv';

export {safe_get_village_values}

dotenv.config();

const safe_get_village_values = withErrorHandling(get_village_values);

async function get_ids_from_text(text, client) {
  validateMany ( {
    text: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);


  ////////
  //Logic
  const values = parse_names_from_village_text(text);
  if(!values) return null;
  
  return await get_ids_from_queries(values.township, values.district, client);
}

async function get_ids_from_queries(township_name, district_name, client) {
  validateMany ( {
    township_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    district_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);

  ////
  //Logic
  let ids = null;
  
  ids = {
      district_id: await select_id_query_from_district(district_name, client),
      township_id: await select_id_query_from_township(township_name, client),
  };
  if (ids.district_id == null || ids.district_id == null) {
    return null;
  }

  return ids;
}


async function get_village_values(file_row, client) {
  validateMany ( {
    file_row: process.env.VALIDATION_TYPE_OBJECT,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);
  
  /////
  //Logic
  const ids = await get_ids_from_text(file_row.area1, client);

  if (!ids || !ids.district_id || !ids.township_id) return null;
//   if (ids.length < 2 || ids[0].length == 0 || ids[1].length == 0) {
//     console.log("Failed text:", row.area1);
//   } else {
//     // console.log("Succesful text:", file_json[i].area1, "with result", ids[0], ids[1]);
//   }
//   const values = {
//     village_id: file_row.ekatte, 
//     name: file_row.name, 
//     name_en: file_row.name_en, 
//     township_id: ids.township_id, 
//     district_id: ids.district_id,
//   };
    
  return [file_row.ekatte, file_row.name, file_row.name_en, ids.township_id, ids.district_id];
}
