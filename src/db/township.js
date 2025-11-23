export {select_id_query_from_township};

async function select_id_query_from_township(township_name, client) {
  const township_id_id_res = await client.query(
    "SELECT id FROM township WHERE township.name = $1;",
    [township_name]
  );
  // console.log("Township id ", township_id_id_res.rows[0]?.id, "for ", township_name );
  return township_id_id_res.rows[0]?.id;
}