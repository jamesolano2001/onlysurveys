import { Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SearchScreen() {
  let array = []
  const [data, setData] = useState(array);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      array = await AsyncStorage.multiGet(keys);
      // Filter the array based on the search text
      const filteredArray = array.filter(item => item[0].toLowerCase().includes(searchText.toLowerCase()));
      for (let i = 0; i < filteredArray.length; i++) {
        if (filteredArray[i][0] === "EXPO_CONSTANTS_INSTALLATION_ID") {
          filteredArray.splice(i, 1);
          break;
        }
      }
      setData(filteredArray);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    var timer = setInterval(() => {
      importData();
    }, 300);
    return () => clearInterval(timer);
  }, [searchText]);

  const renderButton = ({ item, index }) => {
    const itemData = JSON.parse(item[1]);

    return (
      <View style={[styles.buttonContainer, index % 2 !== 0 && styles.leftButtonContainer]}>
        <Button
          mode="contained"
          buttonColor="#8AC83F"
          key={item[0]}
          style={styles.buttonCard}
          onPress={() => {
            setSelectedValue(itemData);
            setModalVisible(true);
          }}
        >
          {item[0]}
        </Button>
      </View>
    );
  };




  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        label="Search Survey"
        value={searchText}
        mode="outlined"
        outlineColor="#8AC83F"
        activeOutlineColor="#8AC83F"
        activeUnderlineColor="#8AC83F"
        onChangeText={text => setSearchText(text)}
      />
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />

      <FlatList
        data={data}
        renderItem={renderButton}
        numColumns={2}
        keyExtractor={(item) => item[0]}
        contentContainerStyle={styles.buttonContainer}
        initialNumToRender={10}
        windowSize={5}
      />
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
            <Text style={styles.title}>Name: {selectedValue.name}</Text>
            <Text style={styles.Text}>Procedures: {selectedValue.procedures}</Text>
            <Text style={styles.Text}>Duration: {selectedValue.duration}</Text>
            <Text style={styles.Text}>Risks: {selectedValue.risks}</Text>
            <Text style={styles.Text}>Eligibility: {selectedValue.eligibility}</Text>
            <Text style={styles.Text}>Rewards: {selectedValue.reward}</Text>
            <Text style={styles.Text}>HREC Reference Number: {selectedValue.hrec}</Text>
            <Text style={styles.Text}>Contact: {selectedValue.contact}</Text>
            <Button
              mode='contained' 
              key={selectedValue} style={styles.modalButton} 
              buttonColor={'#8AC83F'}
              onPress={() => {
                  navigation.navigate('Chatroom', {
                  chatNum: selectedValue.name,
                });
              }}
              >
              <Text style={styles.Text}>{selectedValue.name}</Text>  
            </Button>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}



const styles = StyleSheet.create({
  Text:{
    color: 'black',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    marginBottom: '30px',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonContainer: {
    color: 'black',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  buttonCard: {
    marginBottom: 8,
    borderRadius: 8,
    height: 100,
  },
  leftButtonContainer: {
    color: 'black',
    alignItems: 'flex-start',
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
    marginTop: 20,
    padding: 10,
    color: 'black',
    backgroundColor: '#8AC83F',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
