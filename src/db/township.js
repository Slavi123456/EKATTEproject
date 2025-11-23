import { validateMany } from "../utils/validation.js";

export {select_id_query_from_township};

async function select_id_query_from_township(township_name, client) {
  validateMany ( {
    township_name: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
    client: process.env.VALIDATION_TYPE_DB_CLIENT,
  }, arguments);

  ////
  //Logic
  const township_id_id_res = await client.query(
    "SELECT id FROM township WHERE township.name = $1;",
    [township_name]
  );
  // console.log("Township id ", township_id_id_res.rows[0]?.id, "for ", township_name );
  return township_id_id_res.rows[0]?.id;
}