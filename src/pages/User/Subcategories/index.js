import React, { useState, useEffect, useCallback } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, TouchableOpacity, RefreshControl, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import firebase from "../../../services/firebase.js";
// import Accordion from 'react-native-collapsible/Accordion';
// import openMap from 'react-native-open-maps';
// import LoadingScreen from '../../components/LoadingScreen'
import AppBar from '../../../components/AppBar'

import categories from "../../../services/categories.json";

export default function SubCategory({ navigation, route }) {
   const [reservations, setReservations] = useState(null)
   const [refreshing, setRefreshing] = useState(false)
   const [activeSections, setActiveSections] = useState([])
   const [currentReservation, setCurrentReservation] = useState()
   const [loadingState, setLoadingState] = useState(false)
   const userId = firebase.auth().currentUser.uid
   const category = route.params
   const subcategories = category.data

   
   return (
      <>
         <View style={styles.container}>
            <View style={{width: '100%', paddingHorizontal: 20}}>
               <AppBar
                  renderLeft={
                     <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={24} color="#0051A6" />
                     </TouchableOpacity>
                  }
                  renderCenter={
                     <Text style={styles.barTitle}>Subcategorias</Text>
                  }
               />
            </View>

            <ScrollView >
               {subcategories.map ((subcategory, index) => (
                  <TouchableOpacity key={index} style={styles.subcategory}  onPress={() => navigation.navigate("ItemView", subcategory)}>
                     <View style={styles.subcategoryLabel}>
                        <Text style={styles.subcategoryText}>{subcategory.label}</Text>
                     </View>
                     <View style={styles.subcategoryIcon}>
                        <Feather name="chevron-right" size={24} color="#0051A6" />
                     </View>
                     
                  </TouchableOpacity>
                  
               ))}
            </ScrollView>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 24 + Constants.statusBarHeight,
      // marginHorizontal: 20,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#EBEBEB',
      height: '100%'
   },
   barTitle: {
      fontSize:24,
      fontWeight: '900',
      fontFamily: 'Raleway_800ExtraBold',
      color: '#0051A6',       
      textAlignVertical: 'center'
   },
   
   subcategory: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 0.5,
      paddingHorizontal: 8,
      paddingVertical: 18,
      alignItems: 'center',
      
   },
   subcategoryLabel: {
      width: '90%',
   },
   subcategoryIcon: {
      width: '10%'
   },
   subcategoryText: {
      lineHeight: 24,
      fontSize: 16
   }
})