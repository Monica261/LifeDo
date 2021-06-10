import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity, 
  Image, 
  TextInput,
  DatePickerAndroid,
  TimePickerAndroid,  
  Alert,
} from 'react-native'
import { format, isPast } from 'date-fns';

import styles from './styles';

//ICONES
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

export default function DateTimeInputAndroid({ type, save, date, hour }){
  const [datetime, setDateTime] = useState();

  useEffect(() => {
    if(type == 'date' && date){
      setDateTime(format(new Date(date), 'dd/MM/yyyy'));
      save(format(new Date(date), 'yyyy-MM-dd'));
    }

    if(type == 'hour' && hour){
      setDateTime(format(new Date(hour), 'HH:mm'));
      save(format(new Date(hour), 'HH:mm:ss'));
    }
  },[])

  async function selectDataOrHour(){//função pra selecionar data ou hora
    if(type == 'date'){//caso o tipo for igual a data
      const {action, year, month, day} = await DatePickerAndroid.open({//vai devolver a ação do usuario
        mode: 'calendar'//vou abrir o DatePicker no modo calendario
      });

      if(action == DatePickerAndroid.dateSetAction)//se de fato o usuario selecionou a data
        if(isPast(new Date(year, month, day, 24, 59, 59, 0))){ 
          return Alert.alert('Você não pode escolhar uma data passada!');
        }else{
          setDateTime(`${day} - ${month} - ${year}`); 
          save(format(new Date(year, month, day), 'yyyy-MM-dd'));
        }
    }else{//se o usuario n selecionou data é pq ele quer guardar hora
      const { action, hour, minute } = await TimePickerAndroid.open({//vou recuperar do TimePicker
        is24Hour: true//habilita o relogio pra selecionar de 0 a 24hs
      });

      if(action !== TimePickerAndroid.dismissedAction)//verifico se a ação é diferente
      setDateTime(`${hour}:${minute}`);
      save(format(new Date(2020, 12, 1, hour, minute, 0, 0), 'HH:mm:ss'));      
    }
  }

  return(//chama a função que verifica se é data ou hora que quer armazenar
    <TouchableOpacity onPress={selectDataOrHour}>
      <TextInput 
      style={styles.input} 
      placeholder={type == 'date' ? 'Clique aqui para definir a data...' : 'Clique aqui para definir a hora...' }
      editable={false}//a pessoa não vai conseguir editar, só clicar pra selecionar
      value={datetime}
      />
      <Image 
      style={styles.iconTextInput} 
      source={type == 'date' ? iconCalendar : iconClock} />
    </TouchableOpacity>
  )

}