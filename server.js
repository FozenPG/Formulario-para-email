const express = require('express'); //node_module para lidar com solicitação de usuario e gerar respostas
const nodemailer = require("nodemailer");//node_module para enviar emails
const bodyParser = require('body-parser'); //passar os dados do corpo da solicitação HTTP
const config = require('./config'); //caminho para o config.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // Adicione esta linha
app.use(express.static('.'));

//configurando quem vai mandar o email
let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: config.AutorEmail,
        pass: config.SenhaEmail
    }
});

//configurando como o email sera enviado e para quem sera enviado
app.post('/enviar-email', (req, res) => { //define uma rota HTTP POST para o caminho /enviar-email. As solicitações POST são usadas para enviar dados para o servidor
    console.log('Dados recebidos:', req.body);
    const {nome, telefone, email } = req.body; //usa o operador de deestruturação para extrair os dados do corpo da solicitação POST. Os dados estão disponíveis na propriedade req.body.
    if(!nome || !telefone) {
        return res.status(400).json({message: 'Preencha todos os campos do formulário.'});
    }

    const mailOptions = { //um objeto mailOptions que contém as opções para o envio do e-mail.
        from: "Odonto Bot <" + config.AutorEmail + ">",
        to: config.DestinatarioEmail,
        subject: `Formulario de Contato do(a) Cliente ${nome}`,
        text: `Nome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}`,
    };

    transporter.sendMail(mailOptions, (error, info) => { // envia o e-mail usando o objeto
        if(error) {
            console.error(error);
            res.status(500).json({message: 'Erro ao enviar o e-mail'});
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.json({message: 'E-mail enviado com sucesso'});
        }
    });
});

//rota para servir a pagina HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.listen(PORT, () =>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});