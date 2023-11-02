import React, { useState, useRef, useEffect } from 'react'
import { Animated, ImageBackground, Text, View } from 'react-native'
import TinderCard from 'react-tinder-card'
import { Octicons } from '@expo/vector-icons'; 

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
  }
]

function Simple() {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // if (lastDirection === 'left') {
      // Fade In Animation
      fadeAnimation.setValue(0);
      console.log('fadeAnimation: ', fadeAnimation )
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 5000, // Adjust the duration as per your preference
        useNativeDriver: true,
      }).start();
      // console.log('fadeAnimation: ', fadeAnimation )
    // } 
    // else {
    //   // Fade Out Animation
    //   Animated.timing(fadeAnimation, {
    //     toValue: 0,
    //     duration: 1000, // Adjust the duration as per your preference
    //     useNativeDriver: true,
    //   }).start();
    // }
  }, [lastDirection, fadeAnimation]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>React Native Tinder Card</Text> */}
      <Text style={styles.title} lightColor="black" darkColor="white">Home</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      <View style={styles.cardContainer}>
        {characters.map((character) =>
          <TinderCard key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <View style={styles.card}>
              <ImageBackground style={styles.cardImage} source={character.img}>
                <Text style={styles.cardTitle}>{character.name}</Text>
                <Text >Description: {character.description}</Text>
                <Text >Eligibility: {character.eligibility}</Text>
                <Text >Reward: {character.reward}</Text>
                <Text >Offering Faculty/Department: {character.unit}</Text>
                <Text >HREC: {character.hrec}</Text>
                <Text >Contact: {character.contact[0]} - {character.contact[1]}</Text>
              </ImageBackground>
            </View>
          </TinderCard>
        )}
      </View>
      {/* {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text style={styles.infoText} />} */}
      {lastDirection === 'left' ? <Octicons style={{opacity: fadeAnimation.current}} name="star-fill" size={64} color="#8AC83F" />: <Text/>}
      {/* {lastDirection === 'left' && (<Octicons style={{opacity: fadeAnimation}} name="star-fill" size={64} color="#8AC83F" />)} */}
    </View>
  )
}

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
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
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '85%',
    // maxWidth: 260,
    height: 300,
    // backgroundColor: "#8AC83F",
  },
  card: {
    position: 'absolute',
    backgroundColor: 'white',
    // set border color to black
    borderColor: '#8AC83F',
    // set border width to 2px
    borderWidth: 3,
    width: '100%',
    // maxWidth: '95%',
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
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#8AC83F',
  },
  infoText: {
    // height: 28,
    justifyContent: 'center',
    display: 'flex',
    // alignItems: 'baseline',

    // position: 'absolute',
    // bottom: 20,
    // zIndex: -100,
    color: '#8AC83F',
  },
  star: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
  },
}

export default Simple