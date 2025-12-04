// import { describe, it, expect, vi } from "vitest";

// vi.mock("../src/model/district/select_id_query_from_district.js", () => ({
//   select_id_query_from_district: vi.fn(),
// }));

// import { select_id_query_from_district } 
//   from "../src/model/district/select_id_query_from_district.js";

// import { get_ids_from_queries } from "../src/model/village.js";

// import client from "../src/config/db.js";

// vi.mock("../src/config/db.js", () => ({
//   default: {
//     query: vi.fn(),
//   },
// // }));

// vi.mock("../src/utils/validation/validateMany.js", () => ({
//   default: vi.fn(),
// }));

// vi.mock("../src/utils//villageParser/parse_names_from_village_text.js", () => ({
//   default: vi.fn(),
// }));

// describe("get_ids_from_queries()", () => {
//   it("check for success", async () => {
//     select_id_query_from_district.mockResolvedValue(20);
//     select_id_query_from_township.mockResolvedValue(10);

//     const result = await get_ids_from_queries("TownX", "DistrictY");

//     expect(select_id_query_from_district).toHaveBeenCalledWith("DistrictY");
//     expect(select_id_query_from_township).toHaveBeenCalledWith("TownX");

//     expect(result).toEqual({
//       district_id: 20,
//       township_id: 10,
//     });
//   });
// });


import { describe, it, expect } from 'vitest';

describe('sum()', () => {
  it('adds numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

function sum(a, b) {
  return a + b;
}
