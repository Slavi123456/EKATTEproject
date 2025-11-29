import dotenv from "dotenv";
import { getQueryParams } from "./query_params.js";
export { loggerMiddleware };

dotenv.config();

function loggerMiddleware(req, res, next) {
  const { method, url } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  const whole_url = new URL(`http://${process.env.HOST}${req.url}`);
  console.log("URL:", `http://${process.env.HOST}${req.url}`);
  console.log("Query:", whole_url.search);
  console.log("Params:", getQueryParams(url));
  // console.log(whole_url.searchParams.get('api'));
  // console.log("Body:", body);

  next();
}
