import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const GEMINI_API_KEY  = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! Ask me anything!' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const model = 'gemini-2.5-flash'
    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;


    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          contents: [{ role: 'user', parts: [{ text: input }] }],
        },
        {
          params: {
            key: GEMINI_API_KEY,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      const botMessage = responseText || 'Sorry, I could not process that.';
      setMessages([...newMessages, { sender: 'bot', text: botMessage }]);

    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: 'Something went wrong. Please try again. Check your API key and network.' }]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {item.text}
          </Text>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(21, 21, 21, 1)',
    paddingTop: 100,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00008B',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
    color: 'white',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    color: 'white',
  },
  sendButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});