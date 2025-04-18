import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';
import { videoPlaceholders } from '@/Data/mockData';

interface VideoItem {
    id: string;
    thumbnail: string;
    title: string;
}

export default function VideosTab() {
    const [selectedVideo, setSelectedVideo] = useState < VideoItem | null > (null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState < string | null > (null);

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
            <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
            </Text>
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
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playIcon: {
        fontSize: 40,
        opacity: 0.8,
    },
    videoTitle: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
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
