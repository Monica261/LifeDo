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

const current = new Date();

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

  async show(req, res){
    await TaskModel.findById(req.params.id)
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

  async delete(req, res){
    await TaskModel.deleteOne({'_id': req.params.id})
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async done(req, res){
    await TaskModel.findByIdAndUpdate(
      {'_id': req.params.id},
      {'done': req.params.done},
      {new: true})
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async late(req, res){
    await TaskModel
    .find({
      'when': {'$lt': current},
      'macaddress': {'$in': req.params.macaddress}
    })
    .sort('when')
    .then( response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

  async today(req, res){
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async week(req, res){
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async month(req, res){
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

  async year(req, res){
    await TaskModel
          .find({ 
            'macaddress': {'$in': req.params.macaddress},
            'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
          })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }

}

module.exports = new TaskController();