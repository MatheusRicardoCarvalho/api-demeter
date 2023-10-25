const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); 

const Sequelize = require('sequelize')
const sequelize = new Sequelize('Demeter', 'demeter', '12345678', {
    host: "awseb-e-9kpmnwhjbg-stack-awsebrdsdatabase-e2znhwhizbgl.cdezgrvslogt.sa-east-1.rds.amazonaws.com",
    dialect: "mysql"
})

sequelize.authenticate().then(() => {
    console.log("Conexão realizada com sucesso")
}).catch((error) => {
    console.log("Erro ao se conectar: "+ error)
});

app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

const Sensores = sequelize.define('sensores', {
    nome: {
        type: Sequelize.STRING
    },
    valor: {
        type: Sequelize.STRING
    }
});

app.get('/', async (req, res) => {
    const query = `
        SELECT * FROM sensores
    `;

    // Execute a consulta SQL personalizada
    const sensor = await sequelize.query(query, {
        // replacements: { evento: 'Evento de exemplo' },
        type: Sequelize.QueryTypes.SELECT,
    });

    return res.render('index', {dados: sensor});
});

app.get('/flow', async (req, res) => {
    console.log("Requisição execultada");

    return res.status(200).json({
        ligar: false
    });
});

app.post('/sensor/flow', (req, res) => {
    const data = req.body;

    Sensores.create({
        nome: data.nome,
        valor: data.valor
    })

    return res.status(200).json({
        error:false,
        message: "Dados enviados com sucesso",
        data: {
            nome: data.nome,
            valor: data.valor
        }
    })
});

app.post('/sensor/sonoff/on', (req, res) => {
    console.log(req.body);
});
app.post('/sensor/sonoff/off', (req, res) => {
    console.log(req.body);
});

// Fazer uma requisição à API fictícia
app.post('/sensor/temp', (req, res) => {
    const data = req.body;

    Sensores.create({
        nome: data.nome,
        valor: data.valor
    })

    return res.status(200).json({
        error:false,
        message: "Dados enviados com sucesso",
        data: {
            nome: data.nome,
            valor: data.valor
        }
    })
});



//Inícia o serviço
app.listen(8080, () => {
    console.log('Servidor iniciado!');
});
