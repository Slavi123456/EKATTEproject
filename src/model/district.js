import { validateMany } from "../utils/validation.js";

export {select_id_query_from_district};

async function select_id_query_from_district(district_name, client) {
  validateMany ( {
    district_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);
  
  ////
  //Logic
  const district_id_res = await client.query(
    "SELECT id FROM district WHERE district.name = $1;",
    [district_name]
  );
  // console.log("District id ", district_id_res.rows[0]?.id, "for ", district_name );
  return district_id_res.rows[0]?.id;
}