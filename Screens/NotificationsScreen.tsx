import { View, Text, StyleSheet } from 'react-native';

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Notifications Screen</Text>
    </View>
  );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});