import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, Modal, TextInput } from 'react-native-paper';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function ProfileScreen() {
  const [username, setUsername] = useState();
  const [editUsername, setEditUsername] = useState();
  var email = "abc@connect.hku.hk"

  // var for modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: "#8AC83F", padding: 20};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      <View style={{ alignItems: 'flex-start'}}>
        <Text>Username: {username}</Text>
        <Text>Email: {email}</Text>
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
    // width: 300,
    // height: 50,
    margin: 10,
    backgroundColor: "white",
  },
});
