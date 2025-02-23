import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import bodyParser from 'body-parser';

const { Pool } = pkg;

const app = express();
const port = 5000;

// Utilisation des variables d'environnement pour la connexion à PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',  // 'postgres' par défaut si la variable est absente
  host: process.env.DB_HOST || 'db',  // Utilisation de 'db' comme hôte pour la base de données
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

// Le reste de ton code backend reste inchangé
app.use(cors());
app.use(bodyParser.json());

app.post("/create", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const result = await pool.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
