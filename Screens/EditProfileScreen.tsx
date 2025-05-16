import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ProfileData {
  name: string;
  username: string;
  website: string;
  bio: string;
  email: string;
  phone: string;
  gender: string;
}

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    username: 'johndoe123',
    website: 'www.johndoe.com',
    bio: 'Photography enthusiast 📸\nExploring the world one click at a time',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    gender: 'Prefer not to say'
  });

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.doneButton}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.photoSection}>
        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.profileImage}
        />
        <TouchableOpacity>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={profileData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            placeholder="Username"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={profileData.website}
            onChangeText={(value) => handleInputChange('website', value)}
            placeholder="Website"
            keyboardType="url"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={profileData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            placeholder="Bio"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.sectionDivider}>
          <Text style={styles.sectionTitle}>Private Information</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={profileData.gender}
            onChangeText={(value) => handleInputChange('gender', value)}
            placeholder="Gender"
          />
        </View>
      </View>
    </ScrollView>
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
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dadada',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    color: '#262626',
    fontSize: 16,
  },
  doneButton: {
    color: '#0095f6',
    fontSize: 16,
    fontWeight: '600',
  },
  photoSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#0095f6',
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#8e8e8e',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sectionDivider: {
    borderTopWidth: 0.5,
    borderTopColor: '#dadada',
    paddingVertical: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
});
