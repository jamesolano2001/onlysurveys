import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import profile from '../subtabs/profileSummary';
import myreward from '../subtabs/myreward';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      <View style={{ alignItems: 'flex-start'}}>
        <Text style={styles.infoLabel}>Username: <Text style={styles.infoText}>{username}</Text></Text>
        <Text style={styles.infoLabel}>Email: <Text style={styles.infoText}>{email}</Text></Text>
      </View>
      <View style={styles.profileBtn}>
      <Button mode='contained' buttonColor="#8AC83F" onPress={showModal}>Edit info</Button> 
      </View>
      {/* Modal for editing personal info */}
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <TextInput label="Username" style={styles.input} onChangeText={editUsername => setEditUsername(editUsername)} value={editUsername}/>

        {/* cancel and save buttons, not functional yet, currently rely on changing the var itself upon typing */}
        <View style={styles.buttons}>
          <Button mode='contained' buttonColor="red" onPress={() => {setEditUsername(username); hideModal();}}>Cancel</Button>
          <Button mode='contained' buttonColor="grey" onPress={() => {setUsername(editUsername); hideModal();}}>Save</Button>
        </View>
      </Modal>
      <View style={styles.profileBtn}>
      <Button mode='contained' buttonColor="#8AC83F" onPress={() => navigation.navigate('subtabs/myreward')}>My Reward</Button>
      </View>
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
    backgroundColor: "#8AC83F",
    flexDirection: 'row',   // make the cancel and save buttons on the same row
    marginTop: 10,
    justifyContent: 'space-between',
  },
  profileBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8AC83F",
  },
  input: {
    margin: 10,
    backgroundColor: "white",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8AC83F',
    margin: '5px',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#000000',
  },
});
