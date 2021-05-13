const mongoose = require('mongoose');//importo o mongoose

const url = 'mongodb://localhost:27017/todo';//url de conexão com o mongo
mongoose.connect(url, { useNewUrlParser: true });//defino pra ele ter compatibilidade com qualquer versão de mongo

module.exports = mongoose;//retorna o mongoose já conectado