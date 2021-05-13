const express = require('express');//modulo express que eu instalei
const cors = require('cors');
const server = express();//inicializando o meu servidor
server.use(cors());
server.use(express.json());


const TaskRoutes = require('./routes/TaskRoutes');
server.use('/task', TaskRoutes);

server.listen(3333, () => {//ele ta recebendo requisições na porta 3333
  console.log('API ONLINE');
});