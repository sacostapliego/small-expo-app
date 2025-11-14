import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const GEMINI_API_KEY  = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

export default function ChatbotScreen() {
  // Demo messages - fixed for screenshots, but you can still add more
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything!' },
    { sender: 'user', text: 'Show me nearby places to get Roma Tomatoes' },
    { sender: 'bot', text: 'locations' } // Special identifier for custom render
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Gemini API endpoint and model
    const model = 'gemini-2.5-flash'
    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    // Call the Gemini API
    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          // Gemini API request payload
          contents: [{ role: 'user', parts: [{ text: input }] }],
        },
        {
          params: {
            key: GEMINI_API_KEY,
          },
          // Gemini API request headers
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

  const renderMessage = ({ item }: { item: { sender: string; text: string } }) => {
    if (item.sender === 'bot' && item.text === 'locations') {
      return (
        <View style={styles.botMessage}>
          <Text style={styles.botText}>
            I found 2 local vendors that sell Roma Tomatoes based on your location of Downtown Atlanta:
          </Text>
          
          <TouchableOpacity style={styles.vendorLink}>
            <Text style={styles.vendorName}>AZN (Simple. Seasonal. Healthy) Bubble Tea. Fresh Juice & Bowls</Text>
            <Text style={styles.vendorDistance}>2 mins away</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.vendorLink}>
            <Text style={styles.vendorName}>Azalea Fresh Market</Text>
            <Text style={styles.vendorDistance}>4 mins away</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <Text style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
        {item.text}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsButton}>
        <FontAwesome name="gear" size={24} color="white" />
      </TouchableOpacity>
    
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
      />
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <FontAwesome name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>See map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Change preferences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the chatbot screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(21, 21, 21, 1)',
    paddingTop: 100,
  },
  settingsButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    zIndex: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#225832',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: '80%',
    color: 'white',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    maxWidth: '80%',
  },
  botText: {
    color: '#000',
    marginBottom: 8,
  },
  vendorLink: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#225832',
  },
  vendorName: {
    color: '#225832',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  vendorDistance: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#225832',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});