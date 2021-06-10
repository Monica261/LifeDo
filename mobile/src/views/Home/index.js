import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as Network from 'expo-network';
import styles from './styles';

// COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

// API
import api from '../../services/api';

export default function Home({ navigation }){
  const [filter, setFilter] = useState('today');
  const [tasks, setTasks] = useState([]);//armazena as tarefas que a api vai devolver
  const [load, setLoad] = useState(false);//o load vai ser verdadeiro quando tiver algo carregando e falso quando não tiver nada
  const [lateCount, setLateCount] = useState();//variavel de estado que armazena a quantidade de tarefas atrasadas
  const [macaddress, setMacaddress] = useState();

  async function getMacAddress(){
    await Network.getMacAddressAsync().then(mac => {
      setMacaddress(mac);
    });
  }
  
  async function loadTasks(){//função que carrega as tarefas que retornam do bd
    setLoad(true);//vai ser true quando for carregar as tarefas
    await api.get(`/task/filter/${filter}/${macaddress}`)//aguardando api fazer uma req get
    .then(response => {
      setTasks(response.data)//guardo em setTaks os dados que vão voltar da res      
      setLoad(false)//depois que eu guardar as tarefas que voltaram na variavel de estado, vai ser falso
    });
  }

  async function lateVerify(){//verifica quantas tarefas tem atrasadas
    await api.get(`/task/filter/late/${macaddress}`)
    .then(response => {
      setLateCount(response.data.length)      
    });
  }

  function Notification(){//função que atualiza o filtro
    setFilter('late');
  }

  function New(){
    navigation.navigate('Task');
  }

  function Show(id){
    navigation.navigate('Task', {idtask: id});
  }
 
  useEffect(() => {
    getMacAddress().then(() => {
      loadTasks();//chama a função sempre que a tela for carregada
    });
    
    lateVerify();
  }, [filter, macaddress])//toda vez que o filtro mudar vai chamar de novo a função loadtask

  return (
  <View style={styles.container}>
    <Header showNotification={true} showBack={false} pressNotification={Notification} late={lateCount} navigation={navigation} />

    <View style={styles.filter}>
      <TouchableOpacity onPress={() => setFilter('all')}>
        <Text style={filter == 'all' ? styles.filterTextActived : styles.filterTextInative}>Todos</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('today')}>
      <Text style={filter == 'today' ? styles.filterTextActived : styles.filterTextInative}>Hoje</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('month')}>
      <Text style={filter == 'month' ? styles.filterTextActived : styles.filterTextInative}>Semana</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('week')}>
      <Text style={filter == 'week' ? styles.filterTextActived : styles.filterTextInative}>Mês</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setFilter('year')}>
      <Text style={filter == 'year' ? styles.filterTextActived : styles.filterTextInative}>Ano</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.title}>
      <Text style={styles.titleText}>TAREFAS {filter == 'late' && ' ATRASADAS'}</Text>
    </View>

  
    <ScrollView style={styles.content} contentContainerStyle={{alignItems: 'center'}}>          
        {//uso laço de repetição pra retornar todas as tarefas do bd com map
          load 
          ? //se o load for true, executa o ActivityIndicator
          <ActivityIndicator color='#FBB03B' size={50}/>
          : //se for falso, executa as tarefas, o carregamento
          tasks.map(t => //t de task
          (
            <TaskCard //passo as minhas propriedas
              done={t.done} 
              title={t.title} 
              when={t.when} 
              type={t.type}  //está indo nos icones e retornando a posição de forma dinamica
              onPress={() => Show(t._id)}           
            />   
          ))       
        }
    </ScrollView>

    <Footer icon={'add'} onPress={New} />
  </View>
  )  
}