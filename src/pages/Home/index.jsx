import { useEffect, useState } from 'react';
import axios from 'axios'; // Certifique-se de importar axios
import './style.css';

function Home() {
  const [colaboradores, setColaboradores] = useState([]); // Estado inicial como array
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', funcional: '' });
  const [colaboradorEncontrado, setColaboradorEncontrado] = useState(null);

  const fetchColaborador = async () => {
    try {
      const response = await axios.get('/api/colaborador');
      console.log('Dados recebidos:', response);

      // Verificar se a resposta é um array antes de atualizar o estado
      if (Array.isArray(response.data)) {
        setColaboradores(response.data);
      } else {
        console.error('A resposta não é um array:', response.data);
        setColaboradores([]);
      }
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchColaborador();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colaborador = colaboradores.find(
      (c) =>
        c.NOME_COLABORADOR === formData.name &&
        c.FUNCIONAL_COLABORADOR === parseInt(formData.funcional)
    );

    if (colaborador) {
      setColaboradorEncontrado(colaborador);
      console.log('Colaborador encontrado:', colaborador);
    } else {
      setColaboradorEncontrado(null);
      alert('Colaborador não encontrado.');
    }
  };

  return (
    <div className="container">
      <h1>Consultar Funcionário</h1>
      {error && <p className="error">Erro: {error.message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Funcional"
          name="funcional"
          type="number"
          value={formData.funcional}
          onChange={handleChange}
          required
        />
        <button type="submit">Consultar</button>
      </form>

        <div>
          <h2>Todos os Colaboradores</h2>
          {colaboradores.map((colab) => (
            <div key={colab.ID_COLABORADOR}>
              <p>Nome: <span>{colab.NOME_COLABORADOR}</span></p>
              <p>Funcional: <span>{colab.FUNCIONAL_COLABORADOR}</span></p>
              <p>Cargo: <span>{colab.CARGO_COLABORADOR}</span></p>
              <p>Email: <span>{colab.EMAIL_COLABORADOR}</span></p>
            </div>
          ))}
        </div> 
    </div>
  );
}

export default Home;
