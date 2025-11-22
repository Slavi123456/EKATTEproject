export {insert_into_table, get_village_values}
// export {insert_into_district, insert_into_township, 
//         insert_into_cityhalls, insert_into_villages}

async function insert_into_table(insert_statement, db_client, table_name, file_json, valueMapper) {
    console.log("Inserting into table " + table_name);
    let succesful_isertions = 0;

    for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
        let values;
        try {
            values = await valueMapper(file_json[i], db_client);

            const res = await db_client.query(insert_statement, values);
            succesful_isertions ++;
        }
        catch (err){
            console.log("Error in query: ", err);
        }
    }
    console.log(`Successfuly inserted into table ${table_name} this many rows ${succesful_isertions}`);
}

// async function insert_into_district(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].oblast, file_json[i].name, file_json[i].name_en, file_json[i].ekatte];
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_township(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].obshtina, file_json[i].name, file_json[i].name_en, file_json[i].obshtina.substring(0,3), file_json[i].ekatte];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_cityhalls(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;
//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
//         const values = [file_json[i].kmetstvo, file_json[i].name, file_json[i].name_en, file_json[i].kmetstvo.substring(0,5)];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }

// async function insert_into_villages(insert_statement, client, table_name, file_json) {
//     console.log("Inserting into table " + table_name);
//     let succesful_isertions = 0;

//     // console.log(file_json.length);
//     // console.log(file_json[0]);
    
//     for (let i = 0; i < file_json.length - process.env.EKATTE_TABLES_EXTRA_LINES; i++) {
        
//         const ids = await get_ids_from_text(file_json[i].area1, client);
//         if (ids.length < 2 || ids[0].length == 0 || ids[1].length == 0) {
//             console.log("Failed text:", file_json[i].area1);
//             continue;
//         }else {
//             // console.log("Succesful text:", file_json[i].area1, "with result", ids[0], ids[1]);
//         }
        
//         const values = [file_json[i].ekatte, file_json[i].name, file_json[i].name_en, ids[0],  ids[1]];
//         // console.log(values);
//         try {
//             const res = await client.query(insert_statement, values);
//             succesful_isertions ++;
//         }
//         catch (err){
//             // console.log("Error in query: ", err);
//         }
//     }
//     console.log("Successfuly inserted into table ", table_name, " this many rows ", succesful_isertions);
// }
/////////////////////////////////////////////////////////////////////////////
async function get_village_values(row, client) {
    const ids = await get_ids_from_text(row.area1, client);
    
    if (ids.length < 2 || ids[0].length == 0 || ids[1].length == 0) {
        console.log("Failed text:", row.area1);
      
    }else {
        // console.log("Succesful text:", file_json[i].area1, "with result", ids[0], ids[1]);
    }
    
    const values = [row.ekatte, row.name, row.name_en, ids[0],  ids[1]];
    return values;
}

/////////////////////////////////////////////////////////////////////////////
function get_names_from_regex_match (match) {
    if (match) {
        const code = match[1].trim();         
        const settlement = match[2] == null ? "null" : match[2].trim();
        const township = match[3].trim(); 
        const district = match[4].trim();     

        // console.log(code, settlement , township , district);
        return [township, district];
    }
    return [];
}

async function select_id_query_from_district (district_name, client) {
    const district_id_res = await client.query('SELECT id FROM district WHERE district.name = $1;', [district_name]);
    // console.log("District id ", district_id_res.rows[0]?.id, "for ", district_name );   
    return district_id_res.rows[0]?.id;
}

async function select_id_query_from_township (township_name, client) {
    const township_id_id_res = await client.query('SELECT id FROM township WHERE township.name = $1;', [township_name]);
    // console.log("Township id ", township_id_id_res.rows[0]?.id, "for ", township_name );   
    return township_id_id_res.rows[0]?.id;
}

async function get_village_district_township_id(township_name, district_name, client) {
    try {
        const district_id = await select_id_query_from_district(district_name, client);                
        const township_id = await select_id_query_from_township(township_name, client);
        if (typeof(district_id) == "undefined" || typeof(township_id) == "undefined") {
            return [];
        }

        return [township_id,district_id];
    }
    catch (err) {
        console.log("Error in query:", err);
    }
    return [];
}

function get_names_from_village_text(text) {
    const village_area_regex = /^\(([A-Za-z0-9]{5})\)\s*(?:(?:с\.|гр\.)?\s*([^,]+),\s*)?общ\.?\s*([^,]+),\s*обл\.?\s*(.+)$/;
    const match = text.match(village_area_regex);

    const names = get_names_from_regex_match(match);
    if (names.length < 2) {
        return [];
    } 
    // console.log("Township name:", township_name, "District name:", district_name);
    // return [township_name, district_name];
    return names;
}

async function get_ids_from_text (text, client){
    const names = get_names_from_village_text(text);
    if (names.length < 2) {
        return [];
    } 
    const ids = await get_village_district_township_id(names[0], names[1], client);
    return ids;
}

