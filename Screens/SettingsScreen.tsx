import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SettingItem {
  icon: string;
  title: string;
  subtitle?: string;
}

const settingsSections = [
  {
    title: 'Account',
    items: [
      { icon: 'key-outline', title: 'Security' },
      { icon: 'lock-closed-outline', title: 'Privacy' },
      { icon: 'notifications-outline', title: 'Notifications' },
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', title: 'Help Center' },
      { icon: 'information-circle-outline', title: 'About' },
      { icon: 'shield-checkmark-outline', title: 'Terms of Service' },
    ]
  },
  {
    title: 'Cache & Cellular',
    items: [
      { icon: 'save-outline', title: 'Saved', subtitle: '250 MB used' },
      { icon: 'cellular-outline', title: 'Data Usage' },
    ]
  }
];

export default function SettingsScreen() {
  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity key={item.title} style={styles.settingItem}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={item.icon as any} size={22} color="#262626" />
        <Text style={styles.settingItemTitle}>{item.title}</Text>
      </View>
      {item.subtitle ? (
        <Text style={styles.settingItemSubtitle}>{item.subtitle}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#8e8e8e" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {settingsSections.map((section, index) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8e8e8e',
    marginLeft: 15,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dadada',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#efefef',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemTitle: {
    fontSize: 16,
    marginLeft: 15,
    color: '#262626',
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: '#8e8e8e',
  },
  logoutSection: {
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 15,
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#dadada',
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ed4956',
    fontSize: 16,
    fontWeight: '600',
  },
});
