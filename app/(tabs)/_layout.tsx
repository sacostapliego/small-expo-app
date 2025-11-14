import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f7';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000000', // Changed to black
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { 
          paddingTop: 5,
          backgroundColor: backgroundColor,
        },
        tabBarBackground: () => (
          <View style={{ 
            flex: 1, 
            backgroundColor: backgroundColor 
          }} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="map-view"
        options={{
          title: 'Map View',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-chatbot"
        options={{
          title: 'AI Chatbot',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot-excited-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}