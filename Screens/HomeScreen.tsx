import { View, StyleSheet} from 'react-native';
import MapScreen from '../components/MapScreen';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <MapScreen />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});