import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Video } from 'expo-av';
import { videoPlaceholders } from '@/Data/mockData';

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  duration?: string;
  views?: number;
}

export default function VideosTab() {
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Simulate a refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleVideoPress = (video: VideoItem) => {
        setSelectedVideo(video);
    };

    const renderVideoItem = ({ item }: { item: VideoItem }) => (
        <TouchableOpacity 
            style={styles.videoContainer} 
            onPress={() => handleVideoPress(item)}
        >
            <Image 
                source={{ uri: item.thumbnail }} 
                style={styles.videoThumbnail}
                onError={() => setError('Failed to load video thumbnail')}
            />
            <View style={styles.playIconContainer}>
                <Text style={styles.playIcon}>▶️</Text>
            </View>
            <View style={styles.videoInfoContainer}>
                <Text style={styles.videoTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <View style={styles.videoMetaContainer}>
                    {item.views && (
                        <Text style={styles.videoMeta}>{item.views} views</Text>
                    )}
                    {item.duration && (
                        <Text style={styles.videoMeta}>{item.duration}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

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
            <Text style={styles.title}>Videos</Text>
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
                    numColumns={2}
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
        padding: 10,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    videoContainer: {
        flex: 1,
        margin: 5,
        maxWidth: '48%',
    },
    videoThumbnail: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    playIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        fontSize: 40,
        opacity: 0.8,
    },
    videoInfoContainer: {
        padding: 8,
    },
    videoTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    videoMetaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    videoMeta: {
        fontSize: 12,
        color: '#666',
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
        padding: 5,
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
