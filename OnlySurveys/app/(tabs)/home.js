import React, { useState, useRef, useEffect } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import TinderCard from 'react-tinder-card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List, Snackbar } from 'react-native-paper';
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
  }
]

function Simple() {
  // const datas = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const [visible, setVisible] = React.useState(false);
  const onShowSnackBar = () => {
    setVisible(true); setTimeout(() => {
    setVisible(false);
  }, 2000);};
  const onDismissSnackBar = () => setVisible(false);

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem(
        data.name,
        // "Experiment 1"
        JSON.stringify(data),
      );
      // alert(JSON.stringify(testData))
      // console.log('first', first)
    } catch (error) {
      // Error saving data
      // console.log('Error saving data')
      alert(error)
      // console.log('JSON.stringify(testData', JSON.stringify(testData))
    }
  };

  _retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('Experiment 1');
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

  _removeData = async (key, dir) => { 
    if (dir === 'left') {
    }
    else {
      try {
        await AsyncStorage.removeItem(key);
        // return true;
        // alert(dir)
      }
      catch(error) {
        // return false;
        alert(error)
      }}
};
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} lightColor="black" darkColor="white">Home</Text>
      {/* <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" /> */}
      <Text lightColor="black" darkColor="white">Swipe left to favourite</Text>
      <View style={styles.cardContainer}>
        {db.map((data) =>
          <TinderCard key={data.name} onSwipe={(dir) => {swiped(dir, data.name); onShowSnackBar(); _storeData(data);_removeData(data.name, dir);}} onCardLeftScreen={() => {outOfFrame(data.name); }}>
            <View style={styles.card}>
              <ImageBackground style={styles.cardImage} source={data.img}>
              <Text style={{fontSize: 24}}>{data.name}</Text>
                <List.Item title="Description" description={data.description} left={props => <MaterialIcons name="description" size={24} color="#8AC83F" />}/>
                <List.Item title="Eligibility" description={data.eligibility} left={props => <MaterialCommunityIcons name="sticker-check" size={24} color="#8AC83F" />}/>
                <List.Item title="Reward" description={data.reward} left={props => <Ionicons name="md-wallet" size={24} color="#8AC83F" />}/>
                <List.Item title="Offering Faculty/Department" description={data.unit} left={props => <MaterialCommunityIcons name="offer" size={24} color="#8AC83F" />}/>
                <List.Item title="HREC" description={data.hrec} left={props => <FontAwesome name="folder" size={24} color="#8AC83F" />}/>
                <List.Item title="Contact" description={data.contact} left={props => <MaterialCommunityIcons name="contacts" size={24} color="#8AC83F" />}/>
                {/* <List.Item title="Link" description={data.link} left={props => <MaterialCommunityIcons name="contacts" size={24} color="#8AC83F" />}/> */}
              </ImageBackground>
            </View>
          </TinderCard>
        )}
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'x',
          onPress: () => {
            onDismissSnackBar
          },
        }}
        style={{backgroundColor: '#8AC83F'}}
      >
      {lastDirection === 'left' ? <Text>Added to Favourites!</Text>: <Text>Not interested</Text>}
      </Snackbar>
      <Text style={{zIndex: -999, color: '#8AC83F', width:"80%"}} >No more surveys!{"\n"}Check out Favourites tab to view saved surveys,{"\n"}or Search tab to discover more surveys.</Text>
    </View>
  )
}

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // height: '100%',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
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
    height: 500,
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
  infoText: {
    justifyContent: 'center',
    display: 'flex',
    color: '#8AC83F',
  },
  star: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 0,
  },
}

export default Simple