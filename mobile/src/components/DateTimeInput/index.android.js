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

  //quando o component for carregado eu faço uma verificação, pq date e hora são formatos diferentes:
  useEffect(() => {
    if(type == 'date' && date){//se o tipo é igual a date e se date tem alguma coisa é pq eu quero formatar ele
      setDateTime(format(new Date(date), 'dd/MM/yyyy'));//formato a data que fica visivel pro usuario no campo
      save(format(new Date(date), 'yyyy-MM-dd'));//formato que salva no bd, essa não aparece pro usuario
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
        if(isPast(new Date(year, month, day, 24, 59, 59, 0))){//verifica se a data selecionada tá no passado
          return Alert.alert('Você não pode escolhar uma data passada!');
        }else{//se não, eu salvo as informações
          setDateTime(`${day} - ${month} - ${year}`); 
          save(format(new Date(year, month, day), 'yyyy-MM-dd'));
        }
    }else{//se o usuario n selecionou data é pq ele quer guardar hora
      const { action, hour, minute } = await TimePickerAndroid.open({//vou recuperar do TimePicker
        is24Hour: true//habilita o relogio pra selecionar de 0 a 24hs
      });

      if(action !== TimePickerAndroid.dismissedAction)//verifico se a ação é diferente
      setDateTime(`${hour}:${minute}`);
      save(format(new Date(2021, 12, 1, hour, minute, 0, 0), 'HH:mm:ss'));      
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