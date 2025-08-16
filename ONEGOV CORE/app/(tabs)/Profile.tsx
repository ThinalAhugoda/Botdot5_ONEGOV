import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  onPress?: () => void;
  showDivider?: boolean;
}

const ProfileScreen: React.FC = () => {
  const MenuItem: React.FC<MenuItemProps> = ({ 
    icon, 
    iconColor, 
    title, 
    onPress,
    showDivider = false 
  }) => (
    <>
      <TouchableOpacity 
        style={styles.menuItem} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
            <Ionicons name={icon} size={20} color={iconColor} />
          </View>
          <Text style={styles.menuItemText}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </TouchableOpacity>
      {showDivider && <View style={styles.divider} />}
    </>
  );

  const handleEditProfile = () => {
    console.log('Edit Profile pressed');
  };

  const handleMenuPress = (item: string) => {
    console.log(`${item} pressed`);
  };

  return (
    <ScrollView style={styles.container}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Lucas scott</Text>
          <Text style={styles.profileEmail}>SabrinaAry208@gmail.com</Text>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="receipt-outline"
          iconColor="#007AFF"
          title="Past Payments"
          onPress={() => handleMenuPress('Past Payments')}
        />
        
        <MenuItem
          icon="card-outline"
          iconColor="#007AFF"
          title="Payment Methods"
          onPress={() => handleMenuPress('Payment Methods')}
        />
        
        <MenuItem
          icon="checkmark-outline"
          iconColor="#007AFF"
          title="Submissions"
          onPress={() => handleMenuPress('Submissions')}
        />
        
        <MenuItem
          icon="language-outline"
          iconColor="#007AFF"
          title="Languages"
          onPress={() => handleMenuPress('Languages')}
          showDivider={true}
        />
        
        <MenuItem
          icon="key-outline"
          iconColor="#007AFF"
          title="Security"
          onPress={() => handleMenuPress('Security')}
        />
        
        <MenuItem
          icon="log-out-outline"
          iconColor="#007AFF"
          title="Log Out"
          onPress={() => handleMenuPress('Log Out')}
        />
      </View>
      <Spacer size={20} />
    </SafeAreaView>
    </ScrollView>
  );
};

const Spacer = ({ size = 20 }) => <View style={{ height: size }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C6C6C8',
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 60,
    marginRight: 16,
  },
});

export default ProfileScreen;