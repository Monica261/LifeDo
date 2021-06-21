const express = require('express');//modulo express que eu instalei
const cors = require('cors');
const server = express();//inicializando o meu servidor com o express
server.use(cors());
server.use(express.json());//minha API devolver e receber infos em json


const TaskRoutes = require('./routes/TaskRoutes');//minha rota
server.use('/task', TaskRoutes);//toda vez que chamar /task, eu passo o meu arq TaskRoutes

server.listen(3333, () => {//ele ta recebendo requisições na porta 3333
  console.log('API ONLINE');
});