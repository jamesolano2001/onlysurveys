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
} from "react-native";
import { Button, TextInput, List, Card} from "react-native-paper";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const db = [
    {
      name: 'Experiment 1',
      // img: require('../../assets/img/richard.jpg')
      description:  'This is Experiment 1',
      eligibility: '18-25 year olds',
      reward: '$50 coupon',
      unit: 'Department of Psychology',
      hrec: 'EA1000000',
      contact: ['Mr AT', '13728943'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      reward: true
    },
    {
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
      reward: true
    },
    {
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
      reward: true
    },
    {
      name: 'Experiment 4',
      // img: require('../../assets/img/jared.jpg')
      description:  'This is Experiment 4',
      eligibility: 'If you suffer from insomnia for more than 3 months',
      reward: '$30 HKD',  
      unit: 'Faculty of Education',
      hrec: 'EA4000000',
      contact: ['Ms qwerty', '09876543'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      reward: true
    },
    {
      name: 'Experiment 5',
      // img: require('../../assets/img/dinesh.jpg')
      description:  'This is Experiment 5',
      eligibility: 'Native English speakers',
      reward: '$50 HKD and a keychain',  
      unit: 'Department of Linguistics',
      hrec: 'EA5000000',
      contact: ['Ms Chi Wah', '12345678'],
      link: 'https://forms.office.com/r/0h01kcnfMn?origin=lprLink',
      fav: false,
      chat: true,
      reward: true
    }
  ]

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title} lightColor="black" darkColor="white">My Reward</Text>
        <View style = {styles.balanceContainer}>
            <Text style = {styles.availableText}>Available Cash Balance</Text>
            <Text style = {styles.balanceText}>$120</Text>
        </View>
        {/* To do: Account History */}
        <Text style = {styles.availableText}>Account History</Text>
        <View style={styles.cardContainer}>
        {db.map((data) =>
          <Card key={data.name} onSwipe={(dir) => {swiped(dir, data.name); onShowSnackBar(); _storeData(data);_removeData(data.name, dir);}} onCardLeftScreen={() => {outOfFrame(data.name); }}>
            <View style={styles.card}>
              <Text style={{fontSize: 24}}>{data.name}</Text>
                <List.Item title="Reward" description={data.reward} left={props => <Ionicons name="md-wallet" size={24} color="#8AC83F" />}/>
                <List.Item title="Offering Faculty/Department" description={data.unit} left={props => <MaterialCommunityIcons name="offer" size={24} color="#8AC83F" />}/>
            </View>
          </Card>
        )}
      </View>
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
    cardContainer: {
        width: '85%',
        height: 300,
      },
      card: {
        position: 'absolute',
        backgroundColor: 'white',
        // set border color to black
        borderColor: '#8AC83F',
        // set border width to 2px
        borderWidth: 3,
        width: '100%',
        height: 200,
        shadowColor: '#8AC83F',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius: 20,
        resizeMode: 'cover',
      },
      cardImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        position: 'relative',
        left: 10,
        overflow: 'auto',
      },
      cardTitle: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
        color: '#8AC83F',
      },
  
});