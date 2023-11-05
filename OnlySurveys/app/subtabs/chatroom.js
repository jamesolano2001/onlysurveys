import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function Chatroom({ route, navigation }) {
  const { chatNum } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.length > 0) {  // Don't send an empty message
      setMessages(prevMessages => [...prevMessages, message]);
      setMessage('');  // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      <ScrollView>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  message: {
    fontSize: 16,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
});