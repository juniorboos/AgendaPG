import React, { useState, useEffect, useCallback } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, TouchableOpacity, RefreshControl, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
// import Accordion from 'react-native-collapsible/Accordion';
// import openMap from 'react-native-open-maps';
// import LoadingScreen from '../../components/LoadingScreen'
import moment from 'moment';
import _ from 'lodash';
import AppBar from '../../../components/AppBar'
import Button from '../../../components/Button'
import { Calendar } from 'react-native-calendars';
import categories from "../../../services/categories.json";
import AsyncStorage from '@react-native-community/async-storage';


import {
   Alert,
   Modal,
   TouchableHighlight,
 } from "react-native";

export default function ItemView({ navigation, route }) {
   const subcategory = route.params;
   const [selected, setSelected] = useState('');
   const [modalVisible, setModalVisible] = useState(false);

   const onDayPress = (day) => {
      setSelected(day.dateString);
   };

   const getDisabledDates = (startDate, endDate, daysToDisable) => {
      const disabledDates = {};
      const start = moment(startDate);
      const end = moment(endDate);
      for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
         if (_.includes(daysToDisable, m.weekday())) {
         disabledDates[m.format('YYYY-MM-DD')] = {disabled: true};
         }
      }
      return disabledDates;
   };

   const realizaAgendamento = async () => {
      //const value = await AsyncStorage.getItem('@agendamentos');
      //let finalValue = JSON.parse(value);
      //return console.log("------",finalValue,"------");
      if (selected == "") {
         return Alert.alert("É necessário escolher uma data.");
      }

      const agendamento = { id: Math.round(Math.random() * 3000), servico: subcategory.label, form: subcategory.haveForm  ,data: selected, senha: Math.round(Math.random() * 400)}
      try {
         const value = await AsyncStorage.getItem('@agendamentos');
         if(value !== null) {
           // value previously stored
           let finalValue = JSON.parse(value);
           finalValue.push(agendamento);

           const jsonValue = JSON.stringify(finalValue);
           await AsyncStorage.setItem('@agendamentos', jsonValue)
         } else {
            const jsonValue = JSON.stringify([agendamento])
            await AsyncStorage.setItem('@agendamentos', jsonValue)
         }
       } catch (e) {
         // saving error
         console.log(e);
       }
      setModalVisible(false);
      navigation.navigate('UserHome');
   };
      
   return (
      <>
         <View style={styles.container}>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
         >
            <View style={styles.modalContainer}>
               <View style={styles.modalView}>
                  <Calendar
                     current={'2020-09-17'}
                     style={styles.calendar}
                     minDate={'2020-09-17'}
                     hideExtraDays
                     onDayPress={onDayPress}
                     disableArrowLeft={true}
                     markedDates={{
                        [selected]: {
                           selected: true,
                           disableTouchEvent: true,
                           selectedColor: '#0051A6',
                           selectedTextColor: 'white',
                        },
                        '2020-09-18': {disabled: true},
                        '2020-09-19': {disabled: true},
                        '2020-09-20': {disabled: true},
                        '2020-09-21': {disabled: true},
                        '2020-09-26': {disabled: true},
                        '2020-09-27': {disabled: true},
                     }}
                  />
   
                  <View style={styles.containerBtnView}>
                     <TouchableOpacity
                           style={styles.btClose}
                           onPress={async () => {
                              setModalVisible(false);
                        }}
                     >
                        <Text style={styles.btText}>Cancelar</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.btConfirm}
                        onPress={() => realizaAgendamento()}
                     >
                        <Text style={styles.btText}>Confirmar</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </Modal>

               <View style={{width: '100%', paddingHorizontal: 20, }}>
                  <AppBar
                     renderLeft={
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                           <Feather name="chevron-left" size={24} color="#FFF" />
                        </TouchableOpacity>
                     }
                     renderCenter={
                        <Text style={styles.barTitle}>Agendamento</Text>
                     }
                  />
               </View>
               
               <View style={styles.viewDetails}>
                  <ScrollView  contentContainerStyle={styles.scrollView}>
                     <Text style={styles.labelText}>Serviço:</Text>
                     <Text style={styles.subcategoryText}>{subcategory.label}</Text>       

                     <View style={styles.subcategoryInfo}>
                        <Text style={styles.labelText}>Necessita de Formulário?</Text>
                        <Text style={styles.subcategoryText}>{ subcategory.haveForm ? 'SIM' : 'NÃO' }</Text>
                        <Text style={styles.labelText}>{ subcategory.haveForm ? 'Acesso ao Formulário:' : 'Dados sobre o Serviço:' }</Text>
                        <TouchableOpacity style={styles.accessButton} onPress={ () =>{ Linking.openURL(subcategory.url)}}>
                           <Text style={styles.buttonText}>{ subcategory.haveForm ? 'Acessar Formulário' : 'Acessar dados' }</Text>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>
                  
                  <TouchableOpacity style={styles.footerButton} onPress={() => setModalVisible(true)}>
                     <Text style={styles.buttonText}>Realizar Agendamento</Text>
                  </TouchableOpacity>
               </View>
               
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   viewDetails: {
      alignItems: 'center', 
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderTopEndRadius: 40, 
      borderTopStartRadius: 40, 
      flex: 1
   },
   scrollView: {
      marginTop: 16,
      padding: 24,
      
   },
   modalView: {
      backgroundColor: '#EBEBEB',
      borderRadius: 20,
      // padding: 20,
      shadowColor: "#000",
      width: '80%',
      borderBottomEndRadius: 20, 
      borderBottomStartRadius: 20,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
   footerButton: {
      width: "100%",
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#31CC18'
   },
   subcategoryInfo: {
      alignItems: 'center',
      minWidth: '100%'
   },
   accessButton: {
      marginVertical: 16,
      borderRadius: 15,
      width: '100%',
      height: 50,
      backgroundColor: '#0051A6',
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonText: {
      color: '#FFF',
      fontWeight: "bold",
      fontSize: 24
   }, 
   container: {
      paddingTop: 24 + Constants.statusBarHeight,
      // marginHorizontal: 20,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#0051A6',
      height: '100%',
   },
   barTitle: {
      fontSize:24,
      fontWeight: '900',
      fontFamily: 'Raleway_800ExtraBold',
      color: '#FFF',       
      textAlignVertical: 'center'
   },
   labelText: {
      fontSize: 18,
      color: '#8B9CB3',
      alignSelf: 'flex-start'
   },
   
   subcategoryText: {
      lineHeight: 32,
      fontSize: 22,
      alignSelf: 'flex-start',
      marginTop: 8,
      marginBottom: 24
   },
   modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
   },
   containerBtnView: {
      width: '100%',
      //justifyContent: 'space-between',
      flexDirection: 'row',
   },
   btClose: {
      padding: 2,
      borderWidth: 1,
      backgroundColor: '#4c4c4c',
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 0,
      alignItems: 'center',
      width: '50%',
      height: 50,
      justifyContent: 'center'
    },
   btConfirm: {
      padding: 2,
      borderWidth: 1,
      backgroundColor: '#0051A6',
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 0,
      alignItems: 'center',
      width: '50%',
      height: 50,
      justifyContent: 'center'
   },
   btText: {
      fontSize: 18,
      color: '#ffffff',
      alignSelf: 'center',
   },
   calendar: {
      // marginBottom: 10,
   },
   
})