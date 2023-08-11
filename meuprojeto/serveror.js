FROM node:latest
ENV APP_HOME /app
RUN mkdir -pv $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn
# ADD CUSTOM REGISTRY HERE IF REQUIRED
# ENV CUSTOM_REGISTRY https://registry.npmjs.org/ 
# RUN npm config set strict-ssl false
# RUN npm config set registry $CUSTOM_REGISTRY
RUN npm install
const express = require('express');
const app1 = express(); // Primeira instância do Express para a porta 3000
const path = require('path');
const axios = require('axios');

app1.use(express.static(path.join(__dirname, 'music')));

app1.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'music', 'index.html'));
});

app1.get('/convert', async (req, res) => {
    try {
        const { amount } = req.query;

        const apiUrl = `https://api.deezer.com/search?q=${encodeURIComponent(amount)}`;

        const response = await axios.get(apiUrl);
        const data = response.data.data.map((track) => ({
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            prev: track.preview, // Corrigir a propriedade aqui para 'track.preview'
        }));

        res.json(data); // Enviar os dados como resposta JSON para o cliente
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while converting the currency.' });
    }
});

const PORT = process.env.PORT || 80;


app1.listen(PORT1, () => {
    console.log(`Servidor 1 ouvindo na porta ${PORT1}`);
});




