const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const dbConfig = {
  user: 'rm551126',
  password: '250802',
  connectString: 'oracle.fiap.com.br:1521/ORCL',
};

const app = express();
app.use(cors());

app.get('/api/colaborador', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexão ao banco de dados bem-sucedida!');

    const result = await connection.execute(
      `SELECT ID, NOME, FUNCIONAL, EMAIL, CARGO FROM COLABORADOR`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum colaborador encontrado.' });
    }

    const colaboradores = result.rows.map(row => ({
      ID_COLABORADOR: row[0],
      NOME_COLABORADOR: row[1],
      FUNCIONAL_COLABORADOR: row[2],
      CARGO_COLABORADOR: row[3],
      EMAIL_COLABORADOR: row[4],
    }));

    res.json(colaboradores);

  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar dados do colaborador.' });
  } 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
