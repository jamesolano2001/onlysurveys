import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  // Button,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/logo.png")} /> 
          <TextInput label="Username" style={styles.input} onChangeText={email => setEmail(email)} value={email}/>
          <TextInput label="Password" secureTextEntry={true} style={styles.input} onChangeText={password => setPassword(password)} value={password}/>
      <Button mode='contained' buttonColor="#8AC83F" onPress={() => navigation.navigate('(tabs)/home')}>Login</Button>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20%'
  },
  image: {
    width: 330,
    height: 110,
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    border: 'solid',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8AC83F",
  },
  input: {
    width: 300,
    height: 50,
    margin: 10,
    backgroundColor: "white",
  },
});