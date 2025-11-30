import client from "../config/db.js";
import { bulk_inserts_from_json } from "../services/databese_inserts.js";
import { getStatistics } from "../services/statistics.js";
import path from "path";
import fs from "fs/promises";
import { __projectdir } from "../paths.js";

export { serveStaticFile };
// export { main_page_handler, data_load, main_page_css};

("use-strict");

// async function main_page_handler(req, res) {
//   console.log("->> Main_page handler");
//   try {
//     const main_page = await load_files("public", "main.html");

//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(main_page);
//   } catch (err) {
//     res.writeHead(404);
//     res.end("main.html not found");
//   }
// }

// async function main_page_css(req, res) {
//   console.log("->> Main.css");
//   try {
//     const main_css = await load_files("public", "main.css")

//     res.writeHead(200, { "Content-Type": "text/css" });
//     res.end(main_css);
//   } catch (err) {
//     res.writeHead(404);
//     res.end("CSS not found");
//   }
// }

// async function load_files(folder, file) {
//   const filePath = path.join(__projectdir, folder, file);
//   const file = await fs.readFile(filePath, "utf-8");

//   return file;
// }

// async function data_load() {
//   await bulk_inserts_from_json(client);
//   const tableStats = await getStatistics();
// }

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
};

async function serveStaticFile(req, res, folder) {
  try {
    const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
    const filePath = path.join(__projectdir, folder, urlPath);

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    // console.log(urlPath, "\n", filePath, "\n", ext, "\n", contentType);
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end(`${req.url} not found`);
  }
}
