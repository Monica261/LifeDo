const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');//pra verificar se uma data está no passado

const TaskValidation = async (req, res, next) => {//recebo sempre a rq, res e o next quem é a prox função

  const { macaddress, type, title, description, when } = req.body;//eu vou fazer uma desestruturação de tudo que vem pelo corpo da minha req

  if(!macaddress)//se for nulo
  return res.status(400).json({ error: 'macaddress é obrigatório'});
  else if(!type)
  return res.status(400).json({ error: 'tipo é obrigatório'});
  else if(!title)
  return res.status(400).json({ error: 'título é obrigatório'});
  else if(!description)
  return res.status(400).json({ error: 'Descrição é obrigatória'});
  else if(!when)
  return res.status(400).json({ error: 'Data e Hora são obrigatórios'});
  
  else{
    let exists;
    
    if(req.params.id){//se na req, nos params existe um ID, é pq eu quero atualizar uma tarefa
      exists = await TaskModel.//eu faço uma consulta
                    findOne(
                      { '_id': { '$ne': req.params.id },
                        'when': {'$eq': new Date(when) },
                        'macaddress': {'$in': macaddress}
                      });
    }else{
      if(isPast(new Date(when)))//caso a data esteja no passado, exibe:
        return res.status(400).json({ error: 'escolha uma data e hora futura'});
      exists = await TaskModel.
        findOne(
          { 
            'when': {'$eq': new Date(when)},//vai na minha tabela e busca por uma tar. que tenha a mesma data e hora
            'macaddress': {'$in': macaddress}//verifico tambem se o macaddress é o mesmo
          });
    }
    
    if(exists){//se existir uma tarefa na mesma data e horário
      return res.status(400).json({ error: 'já existe uma tarefa nesse dia e horário'});
    }

    next();
  }

}

module.exports = TaskValidation;