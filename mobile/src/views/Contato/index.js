import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';

import styles from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { add } from 'date-fns';

export default function Contato({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.arrow}>
                <AntDesign name="arrowleft" size={50} color="#FBB03B"/>
            </TouchableOpacity>
            <Feather name="phone-incoming" size={50} color="#FBB03B" style={{marginTop: -50}}/>
            <Text style={styles.title}>Contato</Text>
            <Text style={styles.description}>
                Expecializados em agendas para idosos.
                Suporte 24h.
            </Text>
            <Text style={styles.sub}>
                Qualquer observação, entre em contato conosco:
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={styles.btnWhats}>
                <FontAwesome name="whatsapp" size={18} color="white" />
                <Text style={styles.btnText}>Whatsapp</Text>
            </TouchableOpacity>
        </View>
    )
}

