import { AuthProvider } from '@/lib/auth-context';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack initialRouteName="auth">
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="signUp" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="info_approve" options={{ title: "Info Approve" }} />
          <Stack.Screen name="GN_Form" options={{ headerShown: false }} />
          <Stack.Screen name="citizen_requests" options={{ title: "Citizen Requests" }} />
          <Stack.Screen name="requests" options={{ title: "Requests" }} />
          <Stack.Screen name="DS_NIC_Screen"  options={{ title: "NIC Requests" }} />
          <Stack.Screen name="Oneday_requests" options={{ title: "One Day Service" }} />
          <Stack.Screen name="Normal_requests" options={{ title: "Normal Service" }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
