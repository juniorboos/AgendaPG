import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, ImageBackground, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from "@react-navigation/native";
//import firebase from "../../../services/firebase.js";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import Input from "../../../components/Input";
import Button from '../../../components/Button';
import AppBar from '../../../components/AppBar'

//import ChatBot from 'react-native-chatbot';
import ChatBot from 'react-native-chatbot';

const validaMensagem = ({ value, steps }) => {
   //console.log({ value, steps });
}

const steps = [
   {
     id: '0',
     message: 'Olá, sou o PG-Bot, ajudarei a encontrar o serviço que procura!',
     trigger: '1',
   },
   {
      id: '1',
      message: 'Selecione a opção que melhor se encaixe no serviço que busca',
      trigger: '2',
   },
   {
      id: '2',
      options: [
        { value: 1, label: 'Atividades Econômicas', trigger: '3' },
        { value: 2, label: 'Vigilância Sanitária', trigger: '4' },
        { value: 3, label: 'Medidas sobre COVID', trigger: '44' },
        { value: 4, label: 'Outros Serviços', trigger: '5' },
        { value: 5, label: 'Finalizar Chat', trigger: '102' },
      ],
   },
   {
      id: '3',
      options: [
         { value: 1, label: 'Alvarás', trigger: '33' },
         { value: 2, label: 'Declarações', trigger: '33' },
         { value: 3, label: 'Habite-se', trigger: '33' },
         { value: 4, label: 'Nenhum dos anteriores', trigger: '99' },
       ],   
   },
   {
      id: '4',
      options: [
         { value: 1, label: 'Requerimentos', trigger: '44' },
         { value: 2, label: 'SINAVISA', trigger: '44' },
         { value: 3, label: 'Licença Sanitária', trigger: '44' },
         { value: 4, label: 'Nenhum dos anteriores', trigger: '99' },
       ],   
   },
   {
      id: '5',
      options: [
         { value: 1, label: 'Solicitações', trigger: '55' },
         { value: 2, label: 'Requerimentos', trigger: '55' },
         { value: 3, label: 'Nenhum dos anteriores', trigger: '99' },
       ],   
   },
   {
      id: '33',
      message: 'Para encontrar esse tipo de serviço, acesse o menu principal e a categoria "1 - DIVISÃO DE RENDAS DE ATIVIDADES ECONÔMICAS".',
      trigger: '100'
   },
   {
      id: '55',
      message: 'Para encontrar esse tipo de serviço, acesse o menu principal e a categoria "3 - DIVERSOS".',
      trigger: '100'
   },
   {
      id: '44',
      message: 'Para encontrar esse tipo de serviço, acesse o menu principal e a categoria "2 - DEPARTAMENTO DE VIGILÂNCIA SANITÁRIA".',
      trigger: '100'
   },
   {
      id: '99',
      message: 'Desculpe mas não posso ajudá-lo nesse caso.',
      trigger: '100'
   },
   {
      id: '100',
      message: 'Deseja realizar outra pergunta?',
      trigger: '101'
   },
   {
      id: '101',
      options: [
         { value: 1, label: '      Sim      ', trigger: '1' },
         { value: 2, label: '      Não      ', trigger: '102' },
      ],
   },
   {
      id: '102',
      message: 'Obrigado e até logo.',
      end: true
   },
 ];

export default function Chatbot({ navigation }) {
   
   return (
      <View style={styles.wrapper}>
         <View style={styles.wrapperBar}>
            <View style={styles.side}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Feather name="chevron-left" size={24} color="#0051A6" />
               </TouchableOpacity>
            </View>
            <View style={styles.center}>
               <Text style={styles.barTitle}>Assistente Virtual</Text>
            </View>
            <View style={styles.side}>
            
            </View>
         </View>

         
         <ChatBot 
         steps={steps} 
         style={styles.chatBox}
         // Cores dos diálogos //
         botFontColor={ '#FFFDF8' } 
         userFontColor={ '#FFFDF8' }
         botBubbleColor={ '#E89984' } 
         userBubbleColor={ '#FFC286' }

         // Cores do fundo do chat //
         //style={{  }}
         contentStyle={{ backgroundColor: '#FFFDF8' }}

         // Estilo do Rodapé (Footer) //
         //footerStyle={{ visibility: 'hidden', backgroundColor: '#fff', margin: 5, padding: 1, borderRadius: 7, elevation: 2, }}
         //submitButtonStyle={{ visibility: 'hidden', backgroundColor: '#E89984', borderRadius: 4, width: 63, margin: 2 }}
      />
         

      </View>
   )
}

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      paddingTop: 12 +  Constants.statusBarHeight,
      backgroundColor: '#FFF'
   },
   appBar: {
      height: '10%',
   },
   chatBox: {
      height: '97%',
      //backgroundColor: '#FFFDF8',
      marginTop: 2
   },
   wrapperBar: {
      width: "100%",
      height: '9%',
      paddingHorizontal:12,
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: "space-between"
    },
    barTitle: {
      fontSize:24,
      fontWeight: '900',
      fontFamily: 'Raleway_800ExtraBold',
      color: '#0051A6',       
      textAlignVertical: 'center'
    },
    title: {
      flex: 1,
      fontSize: 32,
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },
    center: {
      alignContent: 'center',
      justifyContent: "center",
      alignItems: 'center',
    },
    side: {
      width: 42,
      height: '100%',
      alignItems: "flex-start",
      justifyContent: "center",
    }
   
});