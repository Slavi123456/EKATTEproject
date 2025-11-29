import { main_page_handler } from "./main_page.js";
export { get_controller };

async function get_controller(req, res) {
  console.log("->> GET_controller with request url", req.url);
  switch (req.url) {
    case "/": {
      await main_page_handler(req, res);
      break;
    }
    default: {
      res.statusCode = 404;
      res.end("Not found");
    }
  }
}
