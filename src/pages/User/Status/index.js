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

export default function Status({ navigation, route }) {
   const userId = firebase.auth().currentUser.uid;
   const dados = route.params;
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
                     <Text style={styles.barTitle}>Status</Text>
                  }
               />
            </View>
            <ScrollView>
               <View style={styles.info}>
                  <Text style={styles.label}>Serviço</Text>
                  <Text style={styles.infoText}>{dados.servico}</Text>
                  <Text style={styles.label}>Data</Text>
                  <Text style={styles.infoText}>{dados.data}</Text>
                  <View style={styles.card}>
                     <View style={styles.senhas}>
                        <View style={{alignItems: 'center'}}>
                           <Text style={styles.label}>Senha atual</Text>
                           <Text style={styles.infoText}>043</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                           <Text style={styles.label}>Minha senha</Text>
                           <Text style={[styles.infoText,{color: '#0051A6'}]}>{dados.senha}</Text>
                        </View>
                     </View>
                     
                     <Text style={[styles.label, {marginTop: 24}]}>Duração média de atendimento</Text>
                     <Text style={[styles.smallText,{color: '#000'}]}>14 min</Text>
                     
                     <Text style={[styles.label, {marginTop: 24}]}>Horário estimado para seu atendimento: </Text>
                     <Text style={styles.smallText}>16:15</Text>
                  </View>
                  <TouchableOpacity style={styles.footerButton} onPress={() => removeAgendamento()}>
                     <Text style={styles.buttonText}>Cancelar Agendamento</Text>
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
      backgroundColor: '#b50520',
      width: '90%',
      elevation: 6,
      borderBottomEndRadius: 15,
      borderBottomLeftRadius: 15,
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
      borderTopEndRadius: 15,
      borderTopLeftRadius: 15,
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
      fontSize: 18,
      color: '#8B9CB3',
      marginTop: 12,
      // alignSelf: 'flex-start'
   },
   infoText: {
      // lineHeight: 32,
      fontSize: 28,
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