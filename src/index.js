import http from "http";
import dotenv from "dotenv";
import client from "./config/db.js";
import { bulk_inserts_from_json } from "./services/databese_inserts.js";

("use strict");

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

main();

function main() {
  const server = http.createServer(async (req, res) => {
    await routing_dispatcher(req, res);
  });

  server.on("clientError", (err, socket) => {
    socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

async function routing_dispatcher(req, res) {
  switch (req.url) {
    case "/": {
      await main_page_controller(req, res);
      break;
    }
    default: {
      res.statusCode = 404;
      res.end("Not found");
    }
  }
}

async function main_page_controller(req, res) {
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

//CHECK FOR CONNECTION
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message)

// const curr_db = await client.query('SELECT current_database()');
// console.log(curr_db.rows);

///INSERT
//await bulk_inserts_from_json(client);

///SELECT
// const district_res = await client.query('SELECT * from district;');
// console.log(district_res.rows);
