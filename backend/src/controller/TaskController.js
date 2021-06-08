const TaskModel = require('../model/TaskModel');
const { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
 } = require('date-fns');

const current = new Date();//essa minha const guarda a data e hora atual

class TaskController {

  async create(req, res){//recebe por parametro a req e a resp, essa função cria uma nova tarefa no BD
    const task = new TaskModel(req.body);//recebe oq vai chegar pelo corpo da req
    await task
          .save()//quando receber as infos, salva no bd
          .then(response => {//caso tudo der certo
            return res.status(200).json(response);//devolvo a resposta junto com o status
          })
          .catch(error => {//caso tudo der errado
            return res.status(500).json(error);//devolvo o status e o erro que deu
          });
  }

  async update(req, res){//função pra atualizar os dados de uma tarefa
    await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, { new: true })//procura a tarefa pelo ID que é passado como parametro, e verifica oq mudou no corpo da minha req
    .then(response => {//new: true, vai retornar os dados da minha tarefa semrpe atualizados
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });

  }

  async all(req, res){//função para listar todas as tarefas
    await TaskModel.find({ macaddress: {'$in': req.params.macaddress }})//filtra pelo macaddres, mostrando somente as tarefas de um determinado dispositivo, eu recupero pelo param da req
          .sort('when')//trazer as infos organizadas por data e hora
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async show(req, res){//função para listar uma tarefa especifica
    await TaskModel.findById(req.params.id)//pega o ID que vem como param 
    .then(response => {
      if(response)
        return res.status(200).json(response);
      else
        return res.status(404).json({error: 'tarefa não encontrada'});
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

  async delete(req, res){//função para deletar uma tarefa especifica
    await TaskModel.deleteOne({'_id': req.params.id})//recebe o ID pelo param que vem na req
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async done(req, res){//função para definir se uma tarefa foi concluida ou n.
    await TaskModel.findByIdAndUpdate(//buscar a tarefa pelo ID e atualizar os:
      {'_id': req.params.id},//recebo o ID pelo param
      {'done': req.params.done},
      {new: true})//sempre devolver os dados da tarefa atualizados
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async late(req, res){//função para exibir as tarefas atrasadas
    await TaskModel
    .find({
      'when': {'$lt': current},//menor que a data e hora corrente
      'macaddress': {'$in': req.params.macaddress}//informar pelo param da req o mac
    })
    .sort('when')//devolve as tarefas organizadas por data e hora
    .then( response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

  async today(req, res){//função para exibir as tarefas do dia
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}//busca o primeiro e ultimo horario do dia com o Date FNS
          })
          .sort('when')//traz as tarefas organizadas por data e hora
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async week(req, res){//função para listar as tarefas da semana
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}//traz a data do inicio da semana e do fim da semana
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async month(req, res){//função para listar as tarefas do mês
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}//traz as tarefas do inicio do mês e do fim do mês
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async year(req, res){//função para listar as tarefas do ano
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}//traz as tarefas do primeiro dia do ano e do ultimo dia do ano
          })
          .sort('when')//traz as tarefas organizadas por data e hora
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

}

module.exports = new TaskController();