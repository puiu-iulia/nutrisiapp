import tamaguiConfig from '@/tamagui.config';
import { Slot, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { TamaguiProvider, Theme } from 'tamagui';

import { RevenueCatProvider } from '@/store/revenuecat/provider';
import { store } from '@/store/store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    RobotoSlabSemiBold: require('./../assets/fonts/RobotoSlab-SemiBold.ttf'),
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

function InitialLayout() {
  const token = useSelector(
    (state: any) => state.auth.token,
  );
  console.log('token', token);
  const initialized = useSelector(
    (state: any) => state.auth.success,
  );
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (token && !inAuthGroup) {
      router.replace('/(tabs)/home');
    } else if (!token && inAuthGroup) {
      router.replace('/(public)/login');
    }
  }, [token, initialized]);

  return <Slot />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <RevenueCatProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <Theme
          name={colorScheme == 'dark' ? 'dark' : 'light'}
        >
          <Provider store={store}>
            <StatusBar style="dark" />
            <InitialLayout />
          </Provider>
        </Theme>
      </TamaguiProvider>
    </RevenueCatProvider>
  );
}
