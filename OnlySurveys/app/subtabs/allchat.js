import React, { useEffect } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

import { Text, View } from '../../components/Themed';

export default function ChatScreen({ navigation }) {
  let array = []      // used for storing all data that is marked chat == true
  const [data, setData] = React.useState(array);
  
  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log('keys', keys)
      array = await AsyncStorage.multiGet(keys);
      for (let i = 0; i < array.length; i++) {
        console.log('array', array)
        console.log('array[i][0]', array[i][0])
        if(array[i][0] == "EXPO_CONSTANTS_INSTALLATION_ID"){
          array.splice(i, 1);
          break;
        }
        let dataGot = JSON.parse(array[i][1])
        if(!dataGot.hasOwnProperty('chat') || dataGot.chat == false){
            array.splice(i, 1);
          }
      }
      setData(array);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
      var timer = setInterval(() => {
        importData();
      }, 3000);
      return () => clearInterval(timer);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat room </Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      {data.map((item, index) => {
        const buttonColor = index % 2 === 0 ? 'rgba(138, 200, 63, 0.3)' : 'rgba(0, 0, 0 )';
        return (
          <Button
            mode='contained' 
            key={item} style={styles.buttons} 
            buttonColor={buttonColor}   // Replace 'buttonColor' with 'color'
            onPress={() => {
                navigation.navigate('Chatroom', {
                chatNum: item[0],
              });
            }}
            >
            <Text style={styles.Text}>{item[0]}</Text>  
            </Button>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttons: {
    padding: 10,
    width: '100%',
    borderRadius: 0,
  },
});