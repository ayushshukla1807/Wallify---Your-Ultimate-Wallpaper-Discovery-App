import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('wallify_favorites_objs');
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        // Fallback for old IDs (won't fetch from network to save API calls, just clear them)
        setFavorites([]);
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const newFavs = favorites.filter(fav => fav.id !== id);
      setFavorites(newFavs);
      await AsyncStorage.setItem('wallify_favorites_objs', JSON.stringify(newFavs));
    } catch (e) {
      console.error('Failed to remove favorite', e);
    }
  };

  const renderItem = ({ item, i }) => {
    const ratio = item.height / item.width;
    const itemHeight = (Dimensions.get('window').width / 2) * ratio;
    const height = Math.min(Math.max(itemHeight, 150), 300);

    return (
      <View style={[styles.itemContainer, { marginTop: i % 2 !== 0 ? 20 : 0 }]}>
        <Image
          source={{ uri: item.urls.small }}
          style={[styles.image, { height }]}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
          <FontAwesome name="trash" size={20} color="#ff4b5c" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
      </View>

      <MasonryList
        data={favorites}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.masonryContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💔</Text>
            <Text style={styles.emptyText}>No favorites yet.</Text>
            <Text style={styles.emptySubtext}>Click the heart on any wallpaper to save it here!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  masonryContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignSelf: 'stretch',
  },
  itemContainer: {
    margin: 5,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  removeButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
