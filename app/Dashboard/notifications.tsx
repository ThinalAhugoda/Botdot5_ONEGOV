import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  isUrgent?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
}

const NotificationsScreen: React.FC = () => {
  const notifications: NotificationItem[] = [
    {
      id: '1',
      title: 'Vehicle Revenue License',
      subtitle: 'Expires in 3 days!',
      description: 'Your vehicle (ABC-1234) has been...',
      isUrgent: true,
      icon: 'car-outline',
    },
    {
      id: '2',
      title: 'Business Registration',
      subtitle: 'Completed',
      description: 'Please download your Business Certi...',
      isUrgent: false,
      icon: 'business-outline',
    },
  ];

  const renderNotification = (notification: NotificationItem) => (
    <TouchableOpacity
      key={notification.id}
      style={styles.notificationItem}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.leftSection}>
          {notification.isUrgent && <View style={styles.urgentDot} />}
          <View style={styles.iconContainer}>
            <Ionicons
              name={notification.icon}
              size={24}
              color="#007AFF"
            />
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationSubtitle}>{notification.subtitle}</Text>
          <Text style={styles.notificationDescription}>
            {notification.description}
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          <Ionicons
            name="chevron-forward-outline"
            size={16}
            color="#C7C7CC"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.notificationBadge}>
          <Text style={styles.badgeText}>1</Text>
        </View>
      </View>

      {/* Notifications List */}
      <View style={styles.notificationsList}>
        {notifications.map(renderNotification)}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="#8E8E93" />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="grid-outline" size={24} color="#007AFF" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Services</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="mail-outline" size={24} color="#8E8E93" />
          <Text style={styles.navLabel}>OneGOV AI</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  notificationBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
    paddingTop: 8,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  urgentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  rightSection: {
    justifyContent: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#C6C6C8',
    paddingVertical: 8,
    paddingBottom: 20, // Account for home indicator on newer iPhones
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  activeNavItem: {
    // Active state styling handled by icon and text color
  },
  navLabel: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#007AFF',
  },
});

export default NotificationsScreen;