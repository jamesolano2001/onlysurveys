import { StyleSheet } from 'react-native';
import React, { useEffect,useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SearchScreen() {
  const [text, setText] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  _retrieveData = async (item) => {
    try {
      let value = await AsyncStorage.getItem(item);
      console.log('item', item)
      if (value !== null) {
        // We have data!!
        console.log(value);
        // alert(value)
      }
    } catch (error) {
      // Error retrieving data
      console.log('Error retrieving data')
      alert(error)
    }
  };
  let array = []
  const [data, setData] = React.useState(array);
  importData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      array = await AsyncStorage.multiGet(keys);
      setData(array);
      // console.log('importData')
      // return array.map(req => JSON.parse(req)).forEach(console.log);
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // write your code here, it's like componentWillMount
    // location.reload()
    importData();
}, [])


  const handleSearch = () => {
    // Perform search logic with the searchQuery
    // ...
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <TextInput
      label="Search Survey"
      value={text}
      mode = 'outlined'
      outlineColor="#8AC83F"
      activeOutlineColor = "#8AC83F"
      activeUnderlineColor="#8AC83F"
      
      onChangeText={text => setText(text)}
      />
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      {data.map((item) => {
        return <Button mode='contained' key={item} style={styles.buttons} buttonColor="#8AC83F" onClick={(item) => _retrieveData(item[0])}>{item[0]}</Button>
      })}
      {array.map(req => JSON.parse(req)).forEach(console.log)}
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
});
