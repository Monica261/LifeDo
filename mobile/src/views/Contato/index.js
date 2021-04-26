import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Contato({navigation}){
    return(
        <View style={styles.container}>
            <Feather name="phone-incoming" size={50}/>
            <Text style={styles.title}>Sobre nós</Text>
            <Text style={styles.description}>
                Expecializados em agendas para idosos.
                Suporte 24h.
            </Text>
            <Text style={styles.sub}>
                Qualquer observação, entre em contato conosco:
                +55 12 98280-5148
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ADD8E6',
    },
    title:{
        textAlign:'center',
        fontSize:30,
        color:'#fff',
        fontWeight:'bold',
        padding:20
    },
    description:{
        textAlign:'center',
        color:'#fff',
        fontSize:19,
        padding:5
    },
    sub:{
        color:'#fff',
        fontSize:17,
        textAlign:'center'
    }
});