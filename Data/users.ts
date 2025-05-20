export interface UserProfile {
  email: string;
  password: string;
  name: string;
  username: string;
  bio: string;
  website?: string;
  phone?: string;
  profileImage: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  images: Array<{
    id: string;
    uri: string;
  }>;
}

export const users: { [key: string]: UserProfile } = {
  'anwar@gmail.com': {
    email: 'anwar@gmail.com',
    password: '1234', // In a real app, this would be hashed
    name: 'Anwar',
    username: 'anwar_dev',
    bio: 'Software Developer 💻\nCoding enthusiast',
    website: 'github.com/anwar',
    phone: '+1 234 567 8900',
    profileImage: 'https://picsum.photos/id/1/200',
    stats: {
      posts: 42,
      followers: 1200,
      following: 900
    },
    images: Array.from({ length: 15 }).map((_, i) => ({
      id: `anwar_${i}`,
      uri: `https://picsum.photos/id/${i + 20}/200/200`
    }))
  },
  'hashir@gmail.com': {
    email: 'hashir@gmail.com',
    password: '1234', // In a real app, this would be hashed
    name: 'Hashir',
    username: 'hashir_photo',
    bio: 'Photography Enthusiast 📸\nCapturing moments',
    website: 'instagram.com/hashir',
    phone: '+1 987 654 3210',
    profileImage: 'https://picsum.photos/id/2/200',
    stats: {
      posts: 65,
      followers: 2500,
      following: 1500
    },
    images: Array.from({ length: 20 }).map((_, i) => ({
      id: `hashir_${i}`,
      uri: `https://picsum.photos/id/${i + 40}/200/200`
    }))
  }
};
