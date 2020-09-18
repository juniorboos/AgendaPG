import React, { useState, useEffect, useCallback } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, TouchableOpacity, RefreshControl, ScrollView, Linking, Platform, ActivityIndicator, ImageBackground } from 'react-native';
import firebase from "../../../services/firebase.js";
// import Accordion from 'react-native-collapsible/Accordion';
// import openMap from 'react-native-open-maps';
// import LoadingScreen from '../../components/LoadingScreen'
import AppBar from '../../../components/AppBar'
import categories from "../../../services/categories.json";
import AsyncStorage from '@react-native-community/async-storage';

export default function Pass({ navigation, route }) {
   //const userId = firebase.auth().currentUser.uid;
   const [senha,setSenha] = useState(0);
   // const subcategories = category.data

   const removeAgendamento = async () => {
      try {
         const value = await AsyncStorage.getItem('@agendamentos');
         if(value !== null) {
           // value previously stored
           let finalValue = JSON.parse(value);
           let finalJson = finalValue.filter(item => item.id !== dados.id && item.senha !== dados.senha)
           const jsonValue = JSON.stringify(finalJson);
           await AsyncStorage.setItem('@agendamentos', jsonValue);
         }
       } catch (e) {
         console.log(e);
       }
      navigation.navigate('UserHome');
   }
   
   return (
         <View style={styles.container}>
            <View style={styles.appBar}>
               <AppBar
                  renderLeft={
                     <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={24} color="#0051A6" />
                     </TouchableOpacity>
                  }
                  renderCenter={
                     <Text style={styles.barTitle}>Controle de Senhas</Text>
                  }
               />
            </View>
            <ScrollView>
               <View style={styles.info}>
                  <Text style={styles.label}>Data</Text>
                  <Text style={styles.infoText}>17/09/2020</Text>
                  <View style={styles.card}>
                     
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.label2}>Senha atual</Text>
                        <Text style={styles.infoText2}>{senha}</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.label2}>Total de Senhas</Text>
                        <Text style={[styles.infoText2,{color: '#0051A6'}]}>400</Text>
                    </View>
                     
                     
                     <Text style={[styles.label, {marginTop: 24}]}>Duração média de atendimento</Text>
                     <Text style={[styles.smallText,{color: '#000'}]}>14 min</Text>

                  </View>
                  <TouchableOpacity style={styles.footerButton} onPress={() => setSenha(senha+1)}>
                     <Text style={styles.buttonText}>Chamar Próxima Senha</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </View>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#EBEBEB',
      height: '100%',
   },
   buttonText: {
      color: '#FFF',
      fontWeight: "bold",
      fontSize: 24
   }, 
   footerButton: {
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0051A6',
      width: '90%',
      elevation: 6,
      marginTop: 30,
      borderRadius: 10,
   },
   senhas: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      paddingBottom: 20,
      borderBottomWidth: 0.5
   },
   bgimage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
   card: {
      width: '90%',
      paddingTop: 12,
      paddingBottom: 20,
      paddingHorizontal: 20,
      // alignItems: 'center',
      // height: 200,
      marginTop: 20,
      backgroundColor: '#FFF',
      //borderTopEndRadius: 15,
      //borderTopLeftRadius: 15,
      borderRadius: 15,
   },
   info: {
      flex: 1,
      marginHorizontal: 20,
      alignItems: 'center',
      marginTop: 12,
      // justifyContent: 'center'
   },
   appBar : {
      width: '100%', 
      paddingHorizontal: 20, 
      backgroundColor: '#FFF',
      paddingTop: 24 + Constants.statusBarHeight,
   },
   barTitle: {
      fontSize:24,
      fontWeight: '900',
      fontFamily: 'Raleway_800ExtraBold',
      color: '#0051A6',       
      textAlignVertical: 'center'
   },
   label: {
      textAlign: 'center',
      fontSize: 24,
      color: '#8B9CB3',
      marginTop: 12,
      // alignSelf: 'flex-start'
   },
   infoText: {
      // lineHeight: 32,
      fontSize: 40,
      // alignSelf: 'flex-start',
      marginTop: 6,
      textAlign: 'center'
      // marginBottom: 24
   },
   label2: {
    textAlign: 'center',
    fontSize: 32,
    color: '#8B9CB3',
    marginTop: 12,
    // alignSelf: 'flex-start'
    },
    infoText2: {
    // lineHeight: 32,
    fontSize: 50,
    // alignSelf: 'flex-start',
    marginTop: 6,
    textAlign: 'center'
    // marginBottom: 24
    },
   smallText : {
      textAlign: 'center',
      fontSize: 24,
      color: '#0051A6',
      marginTop: 6,
   }
})