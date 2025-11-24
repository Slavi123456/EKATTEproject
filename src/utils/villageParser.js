import { validateMany } from "../utils/validation.js";
import dotenv from 'dotenv';
export {parse_names_from_village_text};

dotenv.config();

function parse_names_from_village_text(text_to_parse) {
  // console.log(process.env.VALIDATION_TYPE_NONEMPTY_STRING);
  validateMany ( {
    text_to_parse: process.env.VALIDATION_TYPE_NONEMPTY_STRING,
  }, arguments);

  /////
  //Logic
  const village_area_regex =
    /^\(([A-Za-z0-9]{5})\)\s*(?:(?:с\.|гр\.)?\s*([^,]+),\s*)?общ\.?\s*([^,]+),\s*обл\.?\s*(.+)$/;
  const match = text_to_parse.match(village_area_regex);

  if (!match) return null;
  //   console.log(match);
  const [, code, settlement, township, district] = match;
  
  return {
    code: code.trim(),
    settlement: settlement == null ? "null" : settlement.trim(),
    township: township.trim(),
    district: district.trim(),
  };
}