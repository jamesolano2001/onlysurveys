import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function Chatroom({ route, navigation }) {
  const { chatNum } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello, I heard you're conducting a research on mobile applications. I'm interested to participate.", timestamp: '09:00 AM', date: new Date(2023, 10, 18).toLocaleDateString(), sender: 'self' },
    { text: "Hi there! Yes, we are. Your participation would be greatly appreciated. The survey is about user experiences with mobile applications. Shall we get started?", timestamp: '09:15 AM', date: new Date(2023, 10, 18).toLocaleDateString(), sender: 'other' },
    { text: "Sounds good. Let's start.", timestamp: '09:30 AM', date: new Date(2023, 10, 18).toLocaleDateString(), sender: 'self' },
    { text: "Perfect! So, the first question - Do you primarily use Android or iOS?", timestamp: '09:45 AM', date: new Date(2023, 10, 19).toLocaleDateString(), sender: 'other' },
    { text: "I primarily use Android.", timestamp: '10:00 AM', date: new Date(2023, 10, 19).toLocaleDateString(), sender: 'self' },
  ]);

  const sendMessage = () => {
    if (message.length > 0) {  // Don't send an empty message
      const now = new Date();
      const timestamp = now.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
      const date = now.toLocaleDateString();
      setMessages(prevMessages => [...prevMessages, { text: message, timestamp, date, sender: 'self' }]);
      setMessage('');  // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
      <ScrollView>
        {messages.map((msg, index, array) => (
          <View key={index}>
            {(index === 0 || msg.date !== array[index - 1].date) && (
              <Text style={styles.date}>{msg.date}</Text>
            )}
            <View style={msg.sender === 'self' ? styles.messageContainer : styles.receivedMessageContainer}>
              <Text style={styles.message}>{msg.text}</Text>
              <Text style={styles.timestamp}>{msg.timestamp}</Text>
            </View>
          </View>
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
  date: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#EDF6C7',
    width: 'min-content',
    alignSelf: 'center',
    padding: '5px',
    borderRadius: '5px',
    marginBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#8AC83F',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    maxWidth: '70%',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  receivedMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#EDFFD2',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  message: {
    fontSize: 16,
    marginRight: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    display: 'flex',
    flexDirection: 'row',
    minWidth: 'fit-content',
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
});