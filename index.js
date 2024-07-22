const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Rota para buscar a localização pelo CEP
app.get('/localizacao/:cep', async (req, res) => {
    const cep = req.params.cep;

    try {
        // Fazendo a requisição para a API dos Correios
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Verificando se o CEP é válido
        if (response.data.erro) {
            return res.status(404).json({ error: 'CEP não encontrado' });
        }

        // Retornando a localização
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o CEP' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
