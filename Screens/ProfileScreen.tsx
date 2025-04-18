import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue
} from 'react-native-reanimated';
import ImagesTab from '@/components/ImagesTab';
import VideosTab from '@/components/VideosTab';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const initialLayout = { width: Dimensions.get('window').width };

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'images', title: 'Images' },
    { key: 'videos', title: 'Videos' },
  ]);

  const buttonScale = useSharedValue(1);

  const renderScene = SceneMap({
    images: ImagesTab,
    videos: VideosTab,
  });

  const onPressIn = useCallback(() => {
    buttonScale.value = withSpring(0.95);
  }, []);

  const onPressOut = useCallback(() => {
    buttonScale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      activeColor="#0066cc"
      inactiveColor="#666666"
      pressColor="transparent"
      pressOpacity={1}
    />
  );

  const ProfileHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.profileInfoContainer}>
        <Image 
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.profileImage}
        />
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioContainer}>
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.bio}>Photography enthusiast 📸</Text>
      </View>

      <View style={styles.buttonContainer}>
        <AnimatedTouchableOpacity 
          style={[styles.editButton, animatedStyle]}
          onPress={() => navigation.navigate('EditProfile')}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ProfileHeader />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        swipeEnabled={true}
        style={styles.tabView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 5,
  },
  headerContainer: {
    padding: 15,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#262626',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    paddingVertical: 7,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#262626',
    fontWeight: '600',
    fontSize: 14,
  },
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  indicator: {
    backgroundColor: '#0066cc',
    height: 1,
  },
  label: {
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  tabView: {
    backgroundColor: '#fff',
  },
});
