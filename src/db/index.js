import pg from "pg";

function initPostgresDb() {  
    const db = new pg.Client({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD,
        port: process.env.PG_PORT,
      });
      db.connect();
      console.log("DB connection established.");
      
      return db;
};

const pgDb = initPostgresDb();

export default pgDb;


