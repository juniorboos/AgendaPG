import React, { useState } from 'react';
import Constants from 'expo-constants';
import { View, ImageBackground, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { CommonActions } from "@react-navigation/native";
import firebase from "../../services/firebase.js";

import Input from "../../components/Input";
import Button from '../../components/Button';

export default function Home({ navigation }) {
   

   return (
      <View>
          {/* Hello user header */}
          <View>
             {/* Left */}
             <View>
               <Text>Olá, Milton Boos Junior</Text>
               <Text>000.000.000-00</Text>
             </View>
             {/* Right */}
             <View>
               <Text>UserLogo</Text>
             </View>
          </View>

          <View>
             <Text>Próximos agendamentos</Text>
             <ScrollView horizontal>
                {/* Card */}
                <View>
                   {/* Left */}
                   <View>
                      <Text>IPTU</Text>
                      <Text>18/09/2020</Text>
                      <Text>14:00</Text>
                   </View>
                   {/* Right */}
                   <View>
                      <Text>Arrow</Text>
                   </View>
                </View>
             </ScrollView>
          </View>

          <View>
             <Text>Categorias</Text>
             {/* Above */}
             <View>
                {/* Left */}
                <View>

                </View>
                {/* Right */}
                <View>

                </View>
             </View>
             {/* Under */}
             <View>
                {/* Left */}
                <View>

                </View>
                {/* Right */}
                <View>

                </View>
             </View>
          </View>

          <View>
             
          </View>
      </View>
   )
}

const styles = StyleSheet.create({
   

});