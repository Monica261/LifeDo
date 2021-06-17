import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';//icone phone

import styles from './styles';

// ICONES
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import back from '../../assets/back.png';
import Contato from '../../views/Contato';


export default function Header({ showNotification, showBack, pressNotification, late, navigation }){
  function Back(){//função que volta pra tela Home
    navigation.navigate('Home');
  }

  function OpenContato(){
    navigation.navigate('Contato');
  }
  
  return(
      <View style={styles.header}>

        {
        showBack ?//se o showBack for true
        <TouchableOpacity style={styles.leftIcon} onPress={Back}>
          <Image source={back} style={styles.leftIconImage} />
        </TouchableOpacity>
        ://se não for
        <TouchableOpacity style={styles.leftIcon} onPress={OpenContato}>
          <AntDesign source={Contato} style={styles.leftIconImage} name="phone" size={30} color="#FBB03B"/>
        </TouchableOpacity>
        }


        <Image source={logo} style={styles.logo} />

        { 
        showNotification && late > 0 && //se o showNotification for maior que 0 ele vai mostrar as notificações         
        <TouchableOpacity style={styles.notification} onPress={pressNotification}>
          <Image source={bell} style={styles.notificationImage} />
          <View style={styles.circle}>
        <Text style={styles.notificationText}>{late}</Text>
          </View>
        </TouchableOpacity>
        }
        
      </View>
  )
}