import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, RefreshControl, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; // 👈 NEW
import { videoPlaceholders } from '@/Data/mockData';

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  duration?: string;
  views?: number;
}

const { width } = Dimensions.get('window');
const VIDEO_ITEM_MARGIN = 5;
const NUM_COLUMNS = 3;
const VIDEO_ITEM_WIDTH = (width - (NUM_COLUMNS + 1) * VIDEO_ITEM_MARGIN) / NUM_COLUMNS;

export default function VideosTab() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleVideoPress = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  const renderVideoItem = ({ item }: { item: VideoItem }) => {
    const formatViews = (views: number) => {
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      }
      return views.toString();
    };

    return (
      <TouchableOpacity 
        style={styles.videoContainer} 
        onPress={() => handleVideoPress(item)}
      >
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.videoThumbnail}
          onError={() => setError('Failed to load video thumbnail')}
        />
        {item.views && (
          <View style={styles.overlayContainer}>
            <Ionicons name="eye" size={12} color="#fff" style={{ marginRight: 3 }} />
            <Text style={styles.overlayText}>{formatViews(item.views)}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => setError(null)}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {selectedVideo ? (
        <View style={styles.playerContainer}>
          <Video
            source={{ uri: selectedVideo.thumbnail }}
            useNativeControls
            resizeMode="contain"
            style={styles.videoPlayer}
            onError={() => setError('Failed to load video')}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedVideo(null)}
          >
            <Text style={styles.backButtonText}>Back to Videos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={videoPlaceholders}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#0066cc"
              colors={['#0066cc']}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: 130,
    height: 170,
    borderRadius: 0,
    margin: VIDEO_ITEM_MARGIN,
    marginTop: 1,
    marginHorizontal: 1,
    gap: 0,
  },
  videoThumbnail: {
    width: 131,
    height: 175,
    borderRadius: 0,
    padding: 0,
    gap: 0,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 1,
    left: 1,
    backgroundColor: 'transparent', // ✅ No background
    flexDirection: 'row', // ✅ Icon + text in a row
    alignItems: 'center', // ✅ Center vertically
    paddingHorizontal: 1,
    paddingVertical: 1,
    borderRadius: 0,
  },
  overlayText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '400', // ✅ Normal font, not bold
  },
  videoPlayer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  playerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  grid: {
    padding: VIDEO_ITEM_MARGIN,
    margin: 0,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '500',
  }
});
