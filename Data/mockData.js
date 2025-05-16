export interface ImageItem {
    id: string;
    uri: string;
    title?: string;
    timestamp?: string;
}

export interface VideoItem {
    id: string;
    thumbnail: string;
    title: string;
    duration?: string;
    views?: number;
    timestamp?: string;
}

export const imageUrls: ImageItem[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i.toString(),
    uri: `https://picsum.photos/id/${i + 10}/200/200`,
    title: `Image ${i + 1}`,
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

export const videoPlaceholders: VideoItem[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i.toString(),
    thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/${i % 3 + 1}.jpg`,
    title: `Video ${i + 1}`,
    duration: `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    views: Math.floor(Math.random() * 10000),
    timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));
