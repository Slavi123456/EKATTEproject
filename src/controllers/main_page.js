import client from "../config/db.js";
import {bulk_inserts_from_json} from "../services/databese_inserts.js";
export { main_page_handler };

async function main_page_handler(req, res) {
  try {
    await bulk_inserts_from_json(client);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, main page!\n");
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.end("Server error");
    await client.end();
  }
}
