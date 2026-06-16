import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WallpaperScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const { url, id, altText } = params;

  const handleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem("wallify_favorites_objs");
      let favs = stored ? JSON.parse(stored) : [];
      if (!favs.some((f) => f.id === id)) {
        favs.push({
          id,
          urls: { small: url, regular: url },
          alt_description: altText,
          width: 1080,
          height: 1920,
        });
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: url }}
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Top Controls */}
      <SafeAreaView style={styles.topOverlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <FontAwesome name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Controls */}
      <SafeAreaView style={styles.bottomOverlay}>
        <View style={styles.controlsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {altText && altText !== "undefined" ? altText : "Beautiful Wallpaper"}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.favButton} onPress={handleFavorite}>
            <FontAwesome name="heart" size={24} color="#ff4b5c" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlsContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  favButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
