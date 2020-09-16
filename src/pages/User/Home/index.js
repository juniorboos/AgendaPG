import React, { useState } from 'react';
import Constants from 'expo-constants';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, ImageBackground, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import firebase from "../../../services/firebase.js";

import Input from "../../../components/Input";
import Button from '../../../components/Button';

import categories from "../../../services/categories.json";

export default function Home({ navigation }) {
   

   return (
      <View style={styles.wrapper}>
         <ScrollView>
            {/* Hello user header */}
            <View style={styles.userHeader}>
               {/* Left */}
               <View style={styles.userData}>
                  <Text style={styles.userName}>Olá, Milton Boos Junior</Text>
                  <Text style={styles.userCPF}>000.000.000-00</Text>
               </View>
               {/* Right */}
               <View style={styles.userLogo}>
                  <MaterialIcons name="account-circle" size={50} color="#5199E4" />
               </View>
            </View>

            <View style={styles.sectionAgenda}>
               <Text style={styles.sectionTitle}>Próximos agendamentos</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {/* Card */}
                  <View style={styles.agendaCard}>
                     {/* Left */}
                     <View style={styles.agendaInfo}>
                        <Text style={styles.agendaTitle}>IPTU</Text>
                        <Text style={styles.agendaDate}>18/09/2020</Text>
                        <Text style={styles.agendaDate}>14:00</Text>
                     </View>
                     {/* Right */}
                     <View>
                        <MaterialIcons name="chevron-right" size={32} color="black" />
                     </View>
                  </View>
                  <View style={styles.agendaCard}>
                     {/* Left */}
                     <View style={styles.agendaInfo}>
                        <Text style={styles.agendaTitle}>IPTU</Text>
                        <Text style={styles.agendaDate}>18/09/2020</Text>
                        <Text style={styles.agendaDate}>14:00</Text>
                     </View>
                     {/* Right */}
                     <View>
                        <MaterialIcons name="chevron-right" size={32} color="black" />
                     </View>
                  </View>
               </ScrollView>
            </View>

            <View style={styles.sectionCategoria}>
               <Text style={styles.sectionTitle}>Categorias</Text>
               {/* Above */}
               <View style={styles.categoriaRow}>
                  {categories.map(category => (
                     <View key={category.id} style={styles.categoriaCard}>
                        <Text style={styles.sectionTitle}>{category.label}</Text>
                     </View>
                     )
                  )}          
               </View>
            </View>

            <View style={styles.verTodas}>
               <Text style={styles.verTodasTitle}>Ver todas</Text>
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.smallCard}>

                  </View>
                  <View style={styles.smallCard}>

                  </View>
                  <View style={styles.smallCard}>

                  </View>
                  <View style={styles.smallCard}>

                  </View>
               </ScrollView>
            </View>
         </ScrollView>

         <View style={styles.footer}>
            <View style={styles.footerButton}>
               <MaterialIcons name="home" size={32} color="white" />
               <Text style={styles.footerLabel}>Início</Text>
            </View>
            <View style={styles.footerButton}>
               <MaterialIcons name="view-agenda" size={32} color="white" />
               <Text style={styles.footerLabel}>Agenda</Text>
            </View>
            <View style={styles.footerButton}>
               <MaterialCommunityIcons name="face-agent" size={32} color="white" />  
               <Text style={styles.footerLabel}>Assistente</Text>
            </View>
            <View style={styles.footerButton}>
               <MaterialIcons name="settings" size={32} color="white" />
               <Text style={styles.footerLabel}>Config.</Text>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingTop: 24 + Constants.statusBarHeight,
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
      height: 120,
      width: 180,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   agendaInfo: {
      padding: 8
   },
   agendaTitle: {
      fontSize: 24,
      paddingBottom: 24
   },
   agendaDate: {
      fontSize: 18,
      color: '#0051A6'
   },
   categoriaRow: {
      flexDirection: 'row',
      justifyContent: "space-between",
      flexWrap: "wrap",
   },
   categoriaCard: {
      backgroundColor: '#DA8E8E',
      width: '47%',
      height: 110,
      borderRadius: 10,
      marginBottom: 16,
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
   }



});