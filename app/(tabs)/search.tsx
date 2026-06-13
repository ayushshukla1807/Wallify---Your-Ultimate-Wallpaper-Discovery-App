import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, SafeAreaView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MasonryList from '@react-native-seoul/masonry-list';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UNSPLASH_ACCESS_KEY = "kf0lJ0R9jos4ZBCHPX_9T_46Vpf54L9WkMEyWew4Fkg";

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchWallpapers = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${UNSPLASH_ACCESS_KEY}`);
      const data = await res.json();
      setWallpapers(data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (wallpaper) => {
    try {
      const stored = await AsyncStorage.getItem('wallify_favorites_objs');
      let favs = stored ? JSON.parse(stored) : [];
      if (!favs.some(f => f.id === wallpaper.id)) {
        favs.push(wallpaper);
        await AsyncStorage.setItem('wallify_favorites_objs', JSON.stringify(favs));
        alert('Added to Favorites! ❤️');
      } else {
        alert('Already in Favorites!');
      }
    } catch (e) {
      console.error('Failed to save favorite', e);
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
        <TouchableOpacity style={styles.favButton} onPress={() => handleFavorite(item)}>
          <FontAwesome name="heart" size={20} color="#ff4b5c" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search wallpapers..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={searchWallpapers}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <FontAwesome name="times-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4b5c" style={styles.loader} />
      ) : (
        <MasonryList
          data={wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          contentContainerStyle={styles.masonryContainer}
          ListEmptyComponent={
            wallpapers.length === 0 && query !== '' ? (
              <Text style={styles.emptyText}>No wallpapers found for "{query}"</Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
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
  favButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});
