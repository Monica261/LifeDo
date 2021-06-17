import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Network from 'expo-network';

import styles from './styles';

import api from '../../services/api';

// COMPONENTES
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/typeIcons';
import DateTimeInput from '../../components/DateTimeInput';

export default function Task({ navigation }){
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();  
  const [macaddress, setMacaddress] = useState(); 
  const [load, setLoad] = useState(true);//a tela já abre carregando

  async function SaveTask(){
    //verificações para garantir que o usuario preencheu tudo:
    if(!title)
    return Alert.alert('Defina o nome da tarefa!');

    if(!description)
    return Alert.alert('Defina a descrição da tarefa!');

    if(!type)
    return Alert.alert('Escolha um tipo para a tarefa!');

    if(!date)
    return Alert.alert('Escolha uma data para a tarefa!');

    if(!hour)
    return Alert.alert('Escolha uma hora para a tarefa!');

    if(id){//verifico se tem o ID, pq se tiver quero atualizar a tarefa
      await api.put(`/task/${id}`, {
        macaddress,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}.000`
      }).then(() => {
        navigation.navigate('Home');
      });

    }else{//se não tiver o ID, vai cadastrar
      await api.post('/task', {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}.000`
      }).then(() => {
        navigation.navigate('Home');
      });
    }

  }

  async function LoadTask(){//função que carrega os detalhes de uma tarefa atraves do ID
    await api.get(`task/${id}`).then(response => {//rota que carrega o id de uma tarefa
      setLoad(true);
      setDone(response.data.done);
      setType(response.data.type);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.when);//recebe dessa form 'when' pq o mongo guarda a hora e a data juntos
      setHour(response.data.when);
    });
  }

  async function getMacAddress(){//função para pegar o macaddress
    await Network.getMacAddressAsync().then(mac => {
      setMacaddress(mac);
      setLoad(false);//se o macaddress for carregado, o setLoad é falso
    });
  }

  async function DeleteTask(){//utilizando a API para deletar uma tarefa pelo ID
    await api.delete(`/task/${id}`).then(() => {
      navigation.navigate('Home');
    });
  }

  async function Remove(){//função que remove a tarefa
    Alert.alert(
      'Remover Tarefa',
      'Deseja realmente remover essa tarefa?',
      [
        {text: 'Cancelar'},
        {text: 'Confirmar', onPress: () => DeleteTask()},
      ],
      { cancelable: true }
    )
  }

  useEffect(() => {
    getMacAddress();   
    
    if(navigation.state.params){//se existir parametros
      setId(navigation.state.params.idtask);//atualiza o ID. o id ta chegando junto com o parametro
      LoadTask().then(() => setLoad(false));//se ele carregar as infos eu coloco o setLoad como falso
    }
      
     

  }, [macaddress]);

  return (    
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Header showBack={true} navigation={navigation} />
      
      {
        load 
        ? 
        <ActivityIndicator color='#FBB03B' size={50} style={{ marginTop: 150}}/>
        :
        <ScrollView style={{width: '100%'}}>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
            {
              typeIcons.map((icon, index) => (
                icon != null &&
                <TouchableOpacity onPress={() => setType(index)}>
                  <Image source={icon} style={[styles.imageIcon, type && type != index && styles.typeIconInative]}/>
                </TouchableOpacity>
                ))
            }
          </ScrollView>

          <Text style={styles.label}>Título</Text>
          <TextInput 
            style={styles.input} 
            maxLength={30} 
            placeholder="Lembre-me de fazer..." 
            onChangeText={(text) => setTitle(text)}
            value={title}
          />

          <Text style={styles.label}>Detalhes</Text>
          <TextInput 
            style={styles.inputarea} 
            maxLength={200} 
            multiline={true}
            placeholder="Detalhes da atividade que eu tenho que lembrar..."
            onChangeText={(text) => setDescription(text)}
            value={description}
          />

        <DateTimeInput type={'date'} save={setDate} date={date} />
        <DateTimeInput type={'hour'} save={setHour} hour={hour} />
    
          {
          id && //se o ID já existir, exibe isso
          <View style={styles.inLine}>
            <View style={styles.inputInline}>
              <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={ done ? '#00761B' : '#EE6B26'}/>
                <Text style={styles.switchLabel}>Concluído</Text>
              </View>
              <TouchableOpacity onPress={Remove}>
                <Text style={styles.removeLabel}>EXCLUÍR</Text>
              </TouchableOpacity>
          </View> 
          }          
          
        </ScrollView> 
    }     

      <Footer icon={'save'} onPress={SaveTask} />
    </KeyboardAvoidingView>
  )
}
