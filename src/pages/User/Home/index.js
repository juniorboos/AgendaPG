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

export default function Home({ navigation }) {
   const [userInfo, setUserInfo] = useState({})
   const userId = firebase.auth().currentUser.uid;

   const [agendamentos,setAgendamentos] = useState([]);

   useEffect(() => {
      async function loadUser() {
         const userRef = firebase.firestore().collection('Users').doc(userId);
         const user = await userRef.get();
         setUserInfo(user.data())
      }
      loadUser()
   }, []);

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
         <ScrollView>
            {/* Hello user header */}
            <View style={styles.userHeader}>
               {/* Left */}
               <View style={styles.userData}>
                  <Text style={styles.userName}>Olá, {userInfo.fullName}</Text>
                  <Text style={styles.userCPF}>{userInfo.cpf}</Text>
               </View>
               {/* Right */}
               <TouchableOpacity style={styles.userLogo} onPress={() => createTwoButtonAlert()}>
                  <MaterialIcons name="account-circle" size={50} color="#5199E4" />
               </TouchableOpacity>
            </View>

            <View style={styles.sectionAgenda}>
               <Text style={styles.sectionTitle}>Próximos agendamentos</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {/* Card */}
                  {agendamentos.length == 0 ? (
                     <Text>Você não possuí agendamentos.</Text>)
                  : 
                  agendamentos.map((dados, index) => (
                     <TouchableOpacity key={index} style={styles.agendaCard} onPress={() => navigation.navigate('Status', dados)}>
                        {/* Left */}
                        <View style={styles.agendaInfo}>
                           <Text style={styles.agendaTitle}>{dados.servico}</Text>
                           <Text style={styles.agendaDate}>{dados.data}</Text>
                           <Text style={styles.agendaDate}>senha: {dados.senha}</Text>
                        </View>
                        {/* Right */}
                        <View style={{width:'15%'}}>
                           <MaterialIcons name="chevron-right" size={32} color="white" />
                        </View>
                     </TouchableOpacity>
                  ))}  
               </ScrollView>
            </View>

            <View style={styles.sectionCategoria}>
               <Text style={styles.sectionTitle}>Categorias</Text>
               {/* Above */}
               <View style={styles.categoriaRow}>
                  {categories.map(category => (
                     <TouchableOpacity onPress={() => navigation.navigate("Subcategories", category)} key={category.id} style={[styles.categoriaCard, {backgroundColor: category.color}]}>
                        <Text style={styles.categoriaLabel}>{category.label}</Text>
                     </TouchableOpacity>
                     )
                  )}          
               </View>
            </View>
            {/* 
            <View style={styles.verTodas}>
               <Text style={styles.verTodasTitle}>Ver todas</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity style={styles.smallCard}>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallCard}>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallCard}>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.smallCard}>

                  </TouchableOpacity>
               </ScrollView>
            </View>
            */}
         </ScrollView>

         <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton}>
               <MaterialIcons name="home" size={32} color="white" />
               <Text style={styles.footerLabel}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
               <MaterialIcons name="view-agenda" size={32} color="white" />
               <Text style={styles.footerLabel}>Agenda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Chatbot")}>
               <MaterialCommunityIcons name="face-agent" size={32} color="white" />  
               <Text style={styles.footerLabel} >Assistente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
               <MaterialIcons name="settings" size={32} color="white" />
               <Text style={styles.footerLabel}>Config.</Text>
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
      justifyContent: 'space-between',
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
      marginLeft: 20
   },
   sectionCategoria: {
      marginTop: 24,
      paddingHorizontal: 20
   },
   agendaCard: {
      height: 150,
      width: 220,
      backgroundColor: '#0051A6',
      borderRadius: 10,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 5,
      marginBottom: 6
   },
   agendaInfo: {
      paddingVertical: 12,
      paddingLeft: 16,
      width: '85%'
   },
   agendaTitle: {
      fontSize: 16,
      paddingBottom: 26,
      color: '#FFF'
   },
   agendaDate: {
      fontSize: 18,
      color: '#FFF'
   },
   categoriaRow: {
      alignItems: 'center',
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
      textAlignVertical: 'center',
      color: '#FFF'
   },
   verTodas: {
      width: '100%',
   },
   verTodasTitle: {
      width: '100%',
      textAlign: 'right',
      fontSize: 14,
      color: '#0051A6',
      paddingRight: 20,
      marginBottom: 8,
   },
   smallCard: {
      backgroundColor: '#DA8E8E',
      marginHorizontal: 6,
      width: 100,
      height: 100,
      borderRadius: 10,
      elevation: 5,
      marginBottom: 10,
   }
});