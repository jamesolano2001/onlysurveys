import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function FavScreen() {
  
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

  // let array = ["Experiment 1", "Experiment 2", "Experiment 3", "Experiment 4", "Experiment 5"];
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



  return (
    <View style={styles.container}>
      {/* <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={() => {importData(); location.reload();}} />}> */}
      <Text style={styles.title}>Favourites</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
			<View ></View>
      {data.map((item) => {
        return <Button mode='contained' key={item} style={styles.buttons} buttonColor="#8AC83F" onClick={(item) => _retrieveData(item[0])}>{item[0]}</Button>
      })}
      {array.map(req => JSON.parse(req)).forEach(console.log)}
      <Button mode='contained-tonal' buttonColor="#8AC83F" onClick={() => {importData("Experiment 5"); location.reload();}}>Refresh</Button>
      {/* </ScrollView> */}
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
});
