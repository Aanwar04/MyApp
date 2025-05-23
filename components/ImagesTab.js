import React, { useState } from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { imageUrls } from '@/Data/mockData';

interface ImageItem {
    id: string;
    uri: string;
}

export default function ImagesTab() {
    const [selectedImage, setSelectedImage] = useState < ImageItem | null > (null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState < string | null > (null);

    const renderImageItem = ({ item }: { item: ImageItem }) => (
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => setSelectedImage(item)}
        >
            <Image
                source={{ uri: item.uri }}
                style={styles.image}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onError={() => setError('Failed to load image')}
            />
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Images</Text>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#0066cc" />
                </View>
            )}
            <FlatList
                data={imageUrls}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={styles.grid}
                showsVerticalScrollIndicator={false}
            />
            <Modal
                visible={!!selectedImage}
                transparent={true}
                onRequestClose={() => setSelectedImage(null)}
            >
                <View style={styles.modalContainer}>
                    {selectedImage && (
                        <View style={styles.modalContent}>
                            <Image
                                source={{ uri: selectedImage.uri }}
                                style={styles.fullImage}
                                resizeMode="contain"
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setSelectedImage(null)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
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
    imageContainer: {
        margin: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    grid: {
        padding: 5,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '90%',
        height: '90%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#0066cc',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '500',
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
});
