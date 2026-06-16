import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform, useWindowDimensions, StyleSheet, View, Text } from 'react-native';
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  
  const isWeb = Platform.OS === 'web';
  const showMobileFrame = isWeb && width > 768;

  const content = (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );

  if (showMobileFrame) {
    return (
      <View style={styles.webContainer}>
        {/* Recruiter Sidebar Info */}
        <View style={styles.sidebar}>
          <Text style={styles.appName}>Wallify</Text>
          <Text style={styles.techTag}>React Native & Expo App</Text>
          <Text style={styles.description}>
            A fully native mobile experience converted from a legacy React web app. This project showcases fluid tab navigation, API integration, and offline data persistence.
          </Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badge}><Text style={styles.badgeText}>React Native</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Expo Router</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Unsplash REST API</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>AsyncStorage</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>Masonry Layout</Text></View>
          </View>
        </View>

        {/* Mockup Smartphone Container */}
        <View style={styles.phoneFrameContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.dynamicIsland} />
            <View style={styles.phoneScreen}>
              {content}
            </View>
          </View>
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  webContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#0f172a',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    width: 380,
    backgroundColor: '#1e293b',
    padding: 40,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: -1,
  },
  techTag: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366f1',
    marginTop: 5,
    marginBottom: 25,
  },
  description: {
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 24,
    marginBottom: 35,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  badgeText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '600',
  },
  phoneFrameContainer: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneFrame: {
    width: 393,
    height: 852,
    borderRadius: 55,
    borderWidth: 14,
    borderColor: '#334155',
    backgroundColor: '#000000',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 24,
    position: 'relative',
  },
  dynamicIsland: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -62,
    width: 124,
    height: 37,
    backgroundColor: '#000000',
    borderRadius: 20,
    zIndex: 9999,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
