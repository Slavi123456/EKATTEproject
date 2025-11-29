import { parse_names_from_village_text } from "../utils/villageParser.js";
import { select_id_query_from_district } from "../model/district.js";
import { select_id_query_from_township } from "../model/township.js";
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
  // if(!values) throw new ;
  // console.log(JSON.stringify(values));

  const ids = await get_ids_from_queries(values.township, values.district, client);
  // console.log(ids);
  return ids;
}

async function get_ids_from_queries(township_name, district_name, client) {
  validateMany ( {
    township_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    district_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);

  ////
  //Logic
  let ids = {
      district_id: await select_id_query_from_district(district_name, client),
      township_id: await select_id_query_from_township(township_name, client),
  };
  
  if (ids.district_id == null || ids.township_id == null) {
    return new NotFoundError(`Couldn't get the district_id with district: ${district_name} or township_id from township ${township_name}`);
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
  if (!ids) return new NotFoundError(`Couldn't get ids from information ${JSON.stringify(file_row.area1)}`);
    
  return [file_row.ekatte, file_row.name, file_row.name_en, ids.township_id, ids.district_id];
}
