import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import MasonryGrid from "../../components/MasonryGrid";

const UNSPLASH_ACCESS_KEY = "kf0lJ0R9jos4ZBCHPX_9T_46Vpf54L9WkMEyWew4Fkg";

export default function HomeScreen() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRandomWallpapers();
  }, []);

  const fetchRandomWallpapers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/photos/random?count=20&client_id=${UNSPLASH_ACCESS_KEY}`,
      );
      if (!res.ok) throw new Error("Failed to fetch wallpapers");
      const data = await res.json();
      setWallpapers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (wallpaper) => {
    try {
      const stored = await AsyncStorage.getItem("wallify_favorites_objs");
      let favs = stored ? JSON.parse(stored) : [];
      if (!favs.some((f) => f.id === wallpaper.id)) {
        favs.push(wallpaper);
        await AsyncStorage.setItem(
          "wallify_favorites_objs",
          JSON.stringify(favs),
        );
        alert("Added to Favorites! ❤️");
      } else {
        alert("Already in Favorites!");
      }
    } catch (e) {
      console.error("Failed to save favorite", e);
    }
  };

  const renderItem = ({ item, i }) => {
    // Generate a random height for masonry effect, or use aspect ratio
    const ratio = item.height / item.width;
    const itemHeight = (Dimensions.get("window").width / 2) * ratio;
    // Cap height to prevent too tall images
    const height = Math.min(Math.max(itemHeight, 150), 300);

    return (
      <View style={[styles.itemContainer, { marginTop: i % 2 !== 0 ? 20 : 0 }]}>
        <Image
          source={{ uri: item.urls.small }}
          style={[styles.image, { height }]}
          resizeMode="cover"
        />

        <TouchableOpacity
          style={styles.favButton}
          onPress={() => handleFavorite(item)}
        >
          <FontAwesome name="heart" size={20} color="#ff4b5c" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wallify</Text>
        <Text style={styles.subtitle}>Find your perfect aesthetic</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff4b5c" style={styles.loader} />
      ) : (
        <MasonryGrid
          data={wallpapers}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={fetchRandomWallpapers}
          contentContainerStyle={styles.masonryContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  masonryContainer: {
    paddingHorizontal: 10,
    alignSelf: "stretch",
  },
  itemContainer: {
    margin: 5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
  },
  favButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
