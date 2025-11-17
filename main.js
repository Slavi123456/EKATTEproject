import readFile from './data/ek_kmet.json' with {type: 'json'};

console.log(readFile[0].name);

// const json = JSON.parse(
//   await readFile(
//     new URL('./ek_kmet.json', import.meta.url)
//   )
// );


// import { createServer } from 'node:http';

// const hostname = '127.0.0.1';
// const port = 3000;
// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });