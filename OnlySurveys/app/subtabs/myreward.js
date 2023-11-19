import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  // Button,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button, TextInput, List, Card} from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const db = [
    {
      id: 1,
      name: 'Experiment 1',
      // img: require('../../assets/img/richard.jpg')
      description:  'This is Experiment 1',
      eligibility: '18-25 year olds',
      reward: '$50 HKD',
      unit: 'Department of Psychology',
      hrec: 'EA1000000',
      contact: ['Mr AT', '13728943'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      is_reward: true
    },
    {
      id: 2,
      name: 'Experiment 2',
      // img: require('../../assets/img/erlich.jpg')
      description:  'This is Experiment 2',
      eligibility: 'A human',
      reward: '$20 HKD',  
      unit: 'School of English',
      hrec: 'EA2000000',
      contact: ['Mr Inno Wing', '10111213'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      is_reward: true
    },
    {
      id: 3,
      name: 'Experiment 3',
      // img: require('../../assets/img/monica.jpg')
      description:  'This is Experiment 3',
      eligibility: 'Native Cantonese or English speakers',
      reward: '$50 HKD',  
      unit: 'Department of Linguistics',
      hrec: 'EA3000000',
      contact: ['Mr J Lee', '56781234'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      is_reward: false
    },
  ]

export default function rewardScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title} lightColor="black" darkColor="white">My Reward</Text>
        <View style = {styles.balanceContainer}>
            <Text style = {styles.availableText}>Available Cash Balance</Text>
            <Text style = {styles.balanceText}>$120</Text>
        </View>
        {/* To do: Account History */}
        <Text style = {styles.availableText}>Account History</Text>
        <ScrollView> 
          {db.map((data) => ( 
            <View key={data.id}> 
              <View style={styles.summary}> 
                <Text style={styles.summaryText}> 
                  <List.Item title="Title" description={data.name} left={props => <MaterialIcons name="description" size={24} color="#8AC83F" />}/>
                  <List.Item title="Reward" description={data.reward} left={props => <Ionicons name="md-wallet" size={24} color="#8AC83F" />}/>
                  <List.Item title="Offering Faculty/Department" description={data.unit} left={props => <MaterialCommunityIcons name="offer" size={24} color="#8AC83F" />}/>
                  <Text style={styles.amount}> {data.reward}</Text> 
                </Text> 
              </View> 
            </View> 
          ))} 
        </ScrollView> 
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    balanceContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    availableText: {
        color: 'black',
        opacity: 0.5,
        fontSize: 15,
    },
    balanceText: {
        color: 'black',
        fontWeight: '500',
        opacity: 0.85,
        marginVertical: 7,
        fontSize: 45
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    summaryText: { 
      fontFamily: "openSansBold", 
      fontSize: 18, 
    }, 
    amount: { 
      color: "#C2185B", 
    }, 
    summary: { 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "space-between", 
      marginBottom: 20, 
      padding: 10, 
      shadowColor: "black", 
      shadowOpacity: 0.26, 
      shadowOffset: { width: 0, height: 2 }, 
      shadowRadius: 8, 
      elevation: 5, 
      borderRadius: 10, 
      backgroundColor: "white", 
    }, 
  
});