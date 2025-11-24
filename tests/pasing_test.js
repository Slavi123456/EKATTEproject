import assert from 'assert';
import { parse_names_from_village_text } from '../src/utils/villageParser.js';
// import dotenv from 'dotenv';


function assertWithMessage(test_name, func, expected) {
  return function () {
    const result = func();
    try {
      assert.deepStrictEqual(result, expected);
      console.log(`Test ${test_name} passed!`);
    } catch (err) {
      console.error(`Test ${test_name} failed. Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}.`);
    }
  }
}

//Example
// function add (a,b) {
//   // console.log(add.name);
//   return a+b;
// }
// const test_add = assertWithMessage1 ('test_add', () => add(2,3), 5);
// test_add();


// dotenv.config();
test_parsing_village_test();

function test_parsing_village_test() {
    // console.log(dotenv.process.env.VALIDATION_TYPE_NONEMPTY_STRING);

    const text = "(VAR06) общ. Варна, обл. Варна";
    // const text7 = "(21141) с. Димчево, общ. Бургас, обл. Бургас";
    // const text8 = "(27632) гр. Етрополе, общ. Етрополе, обл. София";
    
    // console.log(typeof text);
    // console.log(parse_names_from_village_text(text));
    
    const test_valid_village_parse = assertWithMessage ('test_valid_village_parse', 
      () => parse_names_from_village_text(text), 
      {
        code: 'VAR06',
        settlement: 'null',
        township: 'Варна',
        district: 'Варна',
      });
    test_valid_village_parse();


    //These should fail
    // const text1 = "(12345) общ. VARNA, обл. Варна";
    // const text4 = "(12345) общ. Варна, обл. дасдадасдасдадсададасдса";
    // const text2 = "(жа) общ. Варна, обл. Варна";
    // const text3 = "(12345678) общ. Варна, обл. Варна";
    // const text5 = "(12345)  Варна, обл. дасдадасдасдадсададасдса";
    // const text6 = "(12_45) общ. Варна, обл. Варна";

    // const texts = [text, text7, text8,  text1, text2, text3, text4, text5,text6];


    // for(let i = 0; i < texts.length; i++) {
    //     const ids = await get_ids_from_text(texts[i]);
    //     if (ids.length < 2) {
    //         console.log("Failed text:", texts[i]);

    //         continue;
    //     } else if (ids[0].length == 0 || ids[1].length == 0) {
    //         console.log("Failed text:", texts[i]);
    //         continue;
    //     }else {
    //         console.log("Succesful text:", texts[i], "with result", ids[0], ids[1]);
    //     }
    // }
}
////////////////////////////////////////////////////

// import test from 'node::test';

// // const test = require('node:test');

// test('synchronous passing test', (t) => {
//   assert.strictEqual(1, 1);
// });

// try {
//   assert.strictEqual(1,2);
  
//   console.log('All tests passed!');
// }
// catch (err) {
//   console.error('Test failed:');
// }
// finally {

// }


// function assertWithMessage(name, func, expected, err_message) {
//   return function (...args) {
//     const result = func(...args);
//     try {
//       assert.strictEqual(result, expected);
//       console.log(`Test ${name} passed!`);
//     } catch (err) {
//       console.error(`Test ${name} failed. Expected ${expected}, got ${result}. ${err_message}`);
//     }
//   }
// }

// const test_village_parse = assertWithMessage ('test_village_parse', add, 5, '...');
// test_village_parse(2,3);
