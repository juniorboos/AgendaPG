import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { CommonActions } from "@react-navigation/native";
import firebase from "../../../services/firebase.js";
import { LinearGradient } from 'expo-linear-gradient';
import Input from "../../../components/Input";
import Button from '../../../components/Button';

import categories from "../../../services/categories.json";
import AsyncStorage from '@react-native-community/async-storage';
import { Calendar } from 'react-native-calendars';


export default function AdminHome({ navigation }) {
   //const [userInfo, setUserInfo] = useState({})
   //const userId = firebase.auth().currentUser.uid;

   const [agendamentos,setAgendamentos] = useState([]);
   const [selected, setSelected] = useState('');


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


   useFocusEffect(() => {
      async function getAgendamentos() {
         const value = await AsyncStorage.getItem('@agendamentos');
         if (value != null) {
            setAgendamentos(JSON.parse(value));
         } else {
            setAgendamentos([]);
         }
      }

      getAgendamentos();
   })

   function Logout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				navigation.dispatch(
					CommonActions.reset({
						index: 0,
						routes: [{ name: "Login" }],
					})
				);
			});
	}
   
   const createTwoButtonAlert = () =>
    Alert.alert(
      "Logout",
      "Are you sure you want to Logout ?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes", 
          onPress: () => Logout() }
      ],
      { cancelable: false }
    );

   return (
      <View style={styles.wrapper}>
         <LinearGradient
            colors={['#FFF','#FFF']}
            style={styles.linearGradient}
         >
         <ScrollView style={{width: '100%'}}>
            {/* Hello user header */}
            <View style={styles.userHeader}>
               {/* Left */}
               <View style={styles.userData}>
                  <Text style={styles.userName}>Olá, Servidor</Text>
                  <Text style={styles.userCPF}>109.985.865-27</Text>
               </View>
               {/* Right */}
               <TouchableOpacity style={styles.userLogo} onPress={() => createTwoButtonAlert()}>
                  <MaterialIcons name="account-circle" size={50} color="#5199E4" />
               </TouchableOpacity>
            </View>

            <View style={styles.sectionAgenda}>
               <Text style={styles.sectionTitle}>Gerencimento de Atendimentos</Text>
               <ScrollView vertical showsHorizontalScrollIndicator={false}>
               <TouchableOpacity style={styles.agendaCard} onPress={() => navigation.navigate('Pass', {})}>
                     <View style={styles.agendaInfo}>
                        <Text style={styles.agendaTitle}>17/09/2020</Text>
                        <Text style={styles.agendaDate0}>Senhas restantes: 155</Text>
                        <Text style={styles.agendaDate}>Total de Senhas: 400</Text>
                     </View>
                     <View style={{width:'15%'}}>
                        <MaterialIcons name="chevron-right" size={32} color="white" />
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.agendaCard} onPress={() => navigation.navigate('Pass', {})}>
                     <View style={styles.agendaInfo}>
                        <Text style={styles.agendaTitle}>18/09/2020</Text>
                        <Text style={styles.agendaDate0}>Senhas restantes: 285</Text>
                        <Text style={styles.agendaDate}>Total de Senhas: 450</Text>
                     </View>
                     <View style={{width:'15%'}}>
                        <MaterialIcons name="chevron-right" size={32} color="white" />
                     </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.agendaCard} onPress={() => navigation.navigate('Status', dados)}>
                     <View style={styles.agendaInfo}>
                        <Text style={styles.agendaTitle}>19/09/2020</Text>
                        <Text style={styles.agendaDate0}>Senhas restantes: 395</Text>
                        <Text style={styles.agendaDate}>Total de Senhas: 500</Text>
                     </View>
                     <View style={{width:'15%'}}>
                        <MaterialIcons name="chevron-right" size={32} color="white" />
                     </View>
                  </TouchableOpacity>
               </ScrollView>
               
            </View>

            
         </ScrollView>

         <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton}>
               <MaterialIcons name="view-agenda" size={32} color="white" />
               <Text style={styles.footerLabel}>Gerenciamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
                  <MaterialIcons name="add-circle" size={32} color="white" />
                  <Text style={styles.footerLabel}>Adicionar</Text>
               </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Pass")}>
               <MaterialIcons name="confirmation-number" size={32} color="white" />  
               <Text style={styles.footerLabel}>Controle de Senhas</Text>
            </TouchableOpacity>
         </View>
         </LinearGradient>
      </View>
   )
}

const styles = StyleSheet.create({
   linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      paddingTop: 24 + Constants.statusBarHeight,
   },
   wrapper: {
      flex: 1,
   },
   footer: {
      width: "100%",
      height: 70,
      backgroundColor: '#0051A6',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 16,
      alignItems: 'center'
   },
   footerButton: {
      alignItems: 'center'
   },
   footerLabel : {
      color: '#FFF'
   },
   userHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
   },
   userData: {
      flexDirection: 'column'
   },
   userLogo: {
      justifyContent:'center'
   },
   userLogo2: {
      justifyContent:'center',
      alignSelf: 'flex-end',
      marginRight: 25,
   },
   userName: {
      fontSize: 24,
   },
   userCPF: {
      fontSize: 18,
      color: '#888888'
   },
   sectionTitle: {
      fontWeight: 'bold',
      color: '#424242',
      fontSize: 18,
      paddingBottom: 16,
   },
   sectionAgenda: {
      marginTop: 24,
      marginLeft: 20,
      flexDirection: 'column',
      flex: 1,
   },
   sectionCategoria: {
      marginTop: 24,
      paddingHorizontal: 20
   },
   agendaCard: {
      height: 100,
      width: '95%',
      backgroundColor: '#0071a6',
      borderRadius: 10,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 20
   },
   agendaInfo: {
      paddingVertical: 8,
      paddingLeft: 16,
      width: '85%',
      justifyContent: 'space-evenly',
   },
   agendaTitle: {
      fontSize: 20,
      paddingBottom: 10,
      color: '#FFF'
   },
   agendaDate0: {
      fontSize: 16,
      color: '#FFF',
      fontWeight: 'bold'
   },
   agendaDate: {
      fontSize: 16,
      color: '#FFF',
   },
   categoriaRow: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      // justifyContent: "space-between",
      // flexWrap: "wrap",
   },
   categoriaCard: {
      width: '100%',
      height: 72,
      borderRadius: 10,
      marginBottom: 16,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
   },
   categoriaLabel: {
      fontSize: 18,
      textAlign: 'center',
      height: '100%',
      textAlignVertical: 'center'
   },
   smallCard: {
      backgroundColor: '#DA8E8E',
      marginHorizontal: 6,
      width: 100,
      height: 100,
      borderRadius: 10,
      elevation: 5,
      marginBottom: 10,
   },
   calendar: {
      width: '100%',
   },
});