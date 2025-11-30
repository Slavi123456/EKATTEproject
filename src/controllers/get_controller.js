import { serveStaticFile } from "./main_page.js";

export { get_controller };

async function get_controller(req, res) {
  console.log("->> GET_controller with request url", req.url);
  switch (req.url) {
    case "/": {
      await serveStaticFile(req, res, "public/main.html");
      break;
    }
    case "/main.css": {
      await serveStaticFile(req, res, "public");
      break;
    }
    case "/init": {
      // await data_load();
    }
    default: {
      await serveStaticFile(req, res, "public");
    }
  }
}
