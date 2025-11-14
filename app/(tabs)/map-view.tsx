import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapViewScreen() {
  // Georgia State coordinates - much more zoomed in
  const GREEN_SPACE = {
    latitude: 33.753454598766574,
    longitude: -84.38658334028004,
    latitudeDelta: 0.015, // Smaller values = more zoom
    longitudeDelta: 0.015, // Smaller values = more zoom
  };

  return (
    <View style={styles.container}>
      {/* Map section */}
      <MapView
        style={styles.map}
        initialRegion={GREEN_SPACE}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{ latitude: 33.754002, longitude: -84.387189 }}
          title="Chuy's Taco"
          description="Food truck"
          pinColor="red"
        />

        <Marker
          coordinate={{ latitude: 33.75442309828812, longitude: -84.38957242993197 }}
          title="Azalea Fresh Market"
          description="Shopping"
          pinColor="green"
        />
      </MapView>

      {/* Overview section overlaying at the top */}
      <View style={styles.overviewSection}>
        <Text style={styles.title}>Azalea Fresh Market</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.overviewScrollContent}
        >
          <View style={styles.imageCard}>
            <Image
              source={{ uri: 'https://scontent-atl3-3.xx.fbcdn.net/v/t51.82787-15/539434152_18526632556011418_7684585295959076111_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FdKf-vaFx-oQ7kNvwHLmJGr&_nc_oc=Adl5I2ZHybYe4324N6-HM10mLWQAdiRibs3S0gONDiTMBGjit9cEV5nssJyEtGF7N8w&_nc_zt=23&_nc_ht=scontent-atl3-3.xx&_nc_gid=cLx673mAWs3DZ36UR43Meg&oh=00_AfgFQcQCGTcAZ2yqDa93ctJs34Z3zlDJMccRodbDncmWFw&oe=691D2E65' }}
              style={styles.image}
            />
          </View>
          
          <View style={styles.imageCard}>
            <Image
              source={{ uri: 'https://azaleamarket.com/cdn/shop/files/P1260695.jpg?v=1759112346&width=1200' }}
              style={styles.image}
            />
          </View>

          {/* Freshness Score Card */}
          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>Freshness Score</Text>
            <Text style={styles.scoreValue}>87%</Text>
            <Text style={styles.disclaimer}>
              (NOT ACTUAL SCORE)
            </Text>
            <View style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>read more</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  overviewSection: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    width: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  overviewScrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  imageCard: {
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  imageLabel: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  scoreCard: {
    width: 120,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  disclaimer: {
    fontSize: 7,
    color: '#999',
    textAlign: 'center',
    marginBottom: 6,
  },
  readMoreButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 5,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});