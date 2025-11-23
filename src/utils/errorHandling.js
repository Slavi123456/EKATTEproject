export {withErrorHandling}

// const tryCatch = (action) => async (...args) => {
//     try {
//         await action(...args);
//     }
//     catch (err) {
//         console.log("Error: ", err);
//     }
// };

// async function tryCatchWrapper(func) {
//     return async function (...args) {
//         try {
//             return await func(args);
//         }
//         catch (err) {
//             console.log(err);

//             return null;
//         }
//     }
// }

function withErrorHandling(fn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
