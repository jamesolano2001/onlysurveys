import React, { useEffect } from 'react';
import { Modal, Alert, RefreshControl, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function FavScreen({ navigation }) {
  
  // _retrieveData = async (item) => {
  //   try {
  //     let value = await AsyncStorage.getItem(item);
  //     if (value !== null) {
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //     console.log('Error retrieving data')
  //     alert(error)
  //   }
  // };
  const [modalVisible, setModalVisible] = React.useState(false);
  let array = []      // used for storing all data that is marked as "fav"
  const [data, setData] = React.useState(array);
  const [dataPart, setDataPart] = React.useState({});
  const [arrayPos, setArrayPos] = React.useState(0);
  importData = async () => {
    try {
      // get all keys in async storage
      const keys = await AsyncStorage.getAllKeys();
      // store all items in async storage in array
      array = await AsyncStorage.multiGet(keys);
      // loop through array
      for (let i = 0; i < array.length; i++) {
        //console.log('array', array)
        // remove non-survey data
        //console.log('array[i][0]', array[i][0])
        if(array[i][0] == "EXPO_CONSTANTS_INSTALLATION_ID"){
          array.splice(i, 1);
          break;
        }
        let dataGot = JSON.parse(array[i][1])
        // if there is no "fav" or "fav" is false, remove from array
        if(!dataGot.hasOwnProperty('fav') || dataGot.fav == false){
            array.splice(i, 1);
          }
      }
      setData(array);
    } catch (error) {
      console.error(error)
    }
  }

useEffect(() => {
    // fetch data from async storage every 3 seconds
    var timer = setInterval(() => {
      importData();
    }, 3000);
    return () => clearInterval(timer);
}, [])

// removeAllFav = async () => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     // await AsyncStorage.multiRemove(keys); // DO NOT USE THIS IN PRODUCTION, cuz would remove ALL data from async storage
//     array = await AsyncStorage.multiGet(keys);
//     for (let i = 0; i < array.length; i++) {
//       // remove non-survey data
//       if(array[i][0] == "EXPO_CONSTANTS_INSTALLATION_ID"){
//         array.splice(i, 1);
//         break;
//       }
//       let dataGot = JSON.parse(array[i][1])
//       // if there is no "fav" or "fav" is false, remove from array
//       if(dataGot.hasOwnProperty('fav') && dataGot.fav == true){
//         dataGot['fav'] = false;
//         console.log('dataGot', dataGot)
//         await AsyncStorage.setItem(
//           array[i][0],
//           JSON.stringify(dataGot),
//         );
//       }
//       // console.log('dataGot', dataGot)
//     }
//     array = [];
//     setData(array);
//     console.log('data', data)
//       // array = await AsyncStorage.multiGet(keys);
//       // setData(array);
//       // console.log('importData')
//       // return array.map(req => JSON.parse(req)).forEach(console.log);
    
//   } catch (error) {
//     console.error(error)
//   }
// }

  return (
    <View style={styles.container}>
      {/* <ScrollView style={{width: "100%", margin: 'auto',}}> */} {/* ScrollView width is somehow too small, need fix if use */}
      <Text style={styles.title}>Favourites</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
			<View ></View>
      {data.map((item) => {
        return <Button mode='contained' 
                        key={item} 
                        style={styles.buttons} 
                        buttonColor="#8AC83F" 
                        onPress={() => {setModalVisible(true);
                                        setArrayPos(data.indexOf(item));
                                        setDataPart(JSON.parse(data[arrayPos][1]));
                                        console.log('dataPart', dataPart)
                                        }}
                        >{item[0]}</Button>
      })}
      {array.map(req => JSON.parse(req)).forEach(console.log)}
      {/* <Button mode='contained-tonal' buttonColor="#8AC83F" onPress={() => {importData();setData(array)}}>Refresh</Button> */}
      {/* <Button mode='contained-tonal' color="red" onPress={() => {removeAllFav();}}>Clear</Button> */}
      {/* </ScrollView> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.Title}>{dataPart['name']}</Text>
            <Text style={styles.Text}>Procedures: {dataPart['procedures']}</Text>
            <Text style={styles.Text}>Duration: {dataPart['duration']}</Text>
            <Text style={styles.Text}>Risks: {dataPart['risks']}</Text>
            <Text style={styles.Text}>Eligibility: {dataPart['eligibility']}</Text>
            <Text style={styles.Text}>Rewards: {dataPart['rewards']}</Text>
            <Text style={styles.Text}>HREC Reference Number: {dataPart['hrec']}</Text>
            <Text style={styles.Text}>Contact: {dataPart['contact']}</Text>
            <Button
              mode='contained' 
              key={dataPart} style={styles.modalButton} 
              buttonColor={'#8AC83F'}
              onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Chatroom', {
                  chatNum: dataPart.name,
                });
              }}
              >
              <Text style={styles.modalButtonText}>Chat with {dataPart.name}</Text>  
            </Button>
            <Button
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Button>
          </View>
        </View>
      </Modal>
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
		marginBottom: 10,
		width: '80%',
		borderColor: 'white',
		
	},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'black'
  },
  modalContent: {
    backgroundColor: 'white',
    color: 'black',
    padding: 20,
    borderRadius: 8,
    border: '2px solid #8AC83F',
  },
  modalButton: {
    marginTop: 10,
    color: 'black',
    backgroundColor: '#8AC83F',
    borderRadius: 8,
    alignItems: 'center',
  },
  Text: {
    color: 'black',
  },
  Title:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '30px',
    alignSelf: 'center',
  },

});
