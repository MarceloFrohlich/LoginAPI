require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const URL = process.env.MONGO_CONNECTION_URL
const MY_ENV_PORT = process.env.PORT;
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

//Inicio da conexão com o MongoDB
mongoose.connect(URL)

let db = mongoose.connection
db.on("error", () => { console.log("Houve um erro") });
db.once("open", () => { console.log("Banco carregado com sucesso!") })

// // Forçando https
// app.use('*', (req, res, next) => {
//     if (req.headers['x-forwarded-proto'] == 'https'){
//         next()
//     } else {
//         res.redirect('https://' + req.headers.host + req.originalUrl)
//     }
// })

//Rotas
app.use('/user', express.json(), userRouter);

app.use('/admin', adminRouter);

app.listen(MY_ENV_PORT, () => {
    console.log(`Server running on port ${MY_ENV_PORT}`)
})