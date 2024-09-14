const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.get('/api/combine', async (req, res) => {
  try {
    // Consultar dos APIs externas
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const dogResponse = await axios.get('https://dog.ceo/api/breeds/image/random');
    
    // Extraer datos de las respuestas
    const users = usersResponse.data;
    const dogImageUrl = dogResponse.data.message;

    // Enviar la combinación de datos al frontend
    res.json({
      users: users,
      dog: dogImageUrl
    });
  } catch (error) {
    console.error('Error al consultar las APIs:', error.message);
    res.status(500).json({ error: 'Error al consultar las APIs' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
