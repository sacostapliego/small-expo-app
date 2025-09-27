import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/one-banana-michael-h.jpg',
        }}
        style={styles.foodImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});