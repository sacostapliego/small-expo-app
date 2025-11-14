import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/search')}>
        <Image
          source={{
            uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/one-banana-michael-h.jpg',
          }}
          style={styles.foodImage}
        />
      </Pressable>
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
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});