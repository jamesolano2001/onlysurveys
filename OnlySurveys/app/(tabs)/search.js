import { TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SearchScreen() {
  let array = []
  const [data, setData] = useState(array);
  const [searchText, setSearchText] = useState('');
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

  const ButtonCardLayout = () => {
    const handleButtonPress = (buttonText) => {
      // Handle button press logic
      console.log(`${buttonText} button pressed`);
    }
  };

  useEffect(() => {
    var timer = setInterval(() => {
      importData();
    }, 300);
    return () => clearInterval(timer);
  }, [searchText]);

  const renderButton = ({ item, index }) => (
    <View style={[styles.buttonContainer, index % 2 !== 0 && styles.leftButtonContainer]}>
      <Button
        mode="contained"
        buttonColor="#8AC83F"
        key={item[0]}
        style={styles.buttonCard}
        onPress={() => {
          // Handle button press logic
        }}
      >
        {item[0]}
      </Button>
    </View>
  );




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
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  buttonCard: {
    marginBottom: 8,
    borderRadius: 8,
    height: 100,
  },
  leftButtonContainer: {
    alignItems: 'flex-start',
  },
});
