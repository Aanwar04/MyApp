import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';

import ImagesTab from '@/components/ImagesTab';
import VideosTab from '@/components/VideosTab';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'images' },
    { key: 'videos' },
  ]);

  const buttonScale = useSharedValue(1);

  const renderScene = SceneMap({
    images: ImagesTab,
    videos: VideosTab,
  });

  const onPressIn = useCallback(() => {
    buttonScale.value = withSpring(0.95);
  }, [buttonScale]);

  const onPressOut = useCallback(() => {
    buttonScale.value = withSpring(1);
  }, [buttonScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const CustomTabBar = ({ navigationState, setIndex }) => (
    <View style={styles.tabBarContainer}>
      {navigationState.routes.map((route, i) => {
        const isFocused = navigationState.index === i;
        const color = isFocused ? '#0066cc' : '#666666';

        return (
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
          >
            <Ionicons name={i === 0 ? 'grid' : 'videocam'} size={24} color={color} />
            {isFocused && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
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
        <Text style={styles.username}>Anwar</Text>
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
        <Text style={styles.headerTitle}>Anwar</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Entypo name="dots-three-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ProfileHeader />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => (
          <CustomTabBar navigationState={{ index, routes }} setIndex={setIndex} />
        )}
        swipeEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '70%',
    backgroundColor: '#0066cc',
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
    borderColor: 'rgba(86, 86, 86, 0.8)',
    paddingVertical: 7,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#262626',
    fontWeight: '600',
    fontSize: 14,
  },
});
