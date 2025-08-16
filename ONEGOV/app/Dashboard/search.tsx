import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface SearchResult {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  backgroundColor: string;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('Health');
  
  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Health',
      icon: 'medical',
      iconColor: '#FFFFFF',
      backgroundColor: '#007AFF',
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleResultPress = (result: SearchResult) => {
    console.log('Selected:', result.title);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      {/* Header with Profile Icon */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleProfilePress}
        >
          <Ionicons name="person-circle-outline" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons 
            name="search" 
            size={20} 
            color="#8E8E93" 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search services..."
            placeholderTextColor="#8E8E93"
            autoCapitalize="none"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {searchQuery.length > 0 && (
        <View style={styles.resultsSection}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultHeaderText}>Top Search Result:</Text>
            <View style={styles.resultBadge}>
              <Text style={styles.resultBadgeText}>1</Text>
            </View>
          </View>

          {/* Results Grid */}
          <View style={styles.resultsGrid}>
            {searchResults.map((result) => (
              <TouchableOpacity
                key={result.id}
                style={styles.resultCard}
                onPress={() => handleResultPress(result)}
                activeOpacity={0.8}
              >
                <View style={styles.resultCardContent}>
                  <View style={[styles.resultIcon, { backgroundColor: result.backgroundColor }]}>
                    <Ionicons 
                      name={result.icon} 
                      size={32} 
                      color={result.iconColor} 
                    />
                  </View>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {searchQuery.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Start typing to search for services</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerSpacer: {
    width: 28, // Same width as profile button for centering
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '400',
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  resultsSection: {
    paddingHorizontal: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultHeaderText: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '400',
    marginRight: 8,
  },
  resultBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  resultCardContent: {
    padding: 24,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  resultIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SearchScreen;