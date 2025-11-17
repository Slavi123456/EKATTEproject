import pg from 'pg';

const {Client} = pg;

const client = new Client({
  user: process.env.PDB_USER,
  password: process.env.PDB_PASSWORD,
  host: process.env.PDB_HOST,
  port: process.env.PDB_PORT,
  database: process.env.PDB_NAME,
});
await client.connect();

try {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message)
}catch(err) {
    console.log("Error in query: ", err);
}finally {
    await client.end()
}