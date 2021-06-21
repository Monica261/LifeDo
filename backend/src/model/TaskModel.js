const mongoose = require('../config/database');//pego o meu arquivo mongoose de conexão
const Schema = mongoose.Schema;//criando a representação de informações

const TaskSchema = new Schema({
  macaddress: {type: String, required: true},
  type: {type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  when: {type: Date, required: true},//guardando data e hora juntos no bd
  done: {type: Boolean, default: false},//done defini se a tarefa foi concluida ou não no meu front, ele guarda valor booleano, e por padrão ele é false
  created: {type: Date, default: Date.now()}//o valor padrão vai ser a data e hora que a tarefa foi cadastrada, não é obrigatorio pq o usuario não vai avisar quando cadastrou a data
});

module.exports = mongoose.model('Task', TaskSchema);//passo o nome que vai ser guardado no bd 'Task', e o nome do obj que acabei de criar TaskSchema