import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

import RevenueCatUI, {
  PAYWALL_RESULT,
} from 'react-native-purchases-ui';

export default function SubscriptionScreen() {
  const router = useRouter();
  //   async function presentPaywall(): Promise<boolean> {
  //     // Present paywall for current offering:
  //     const paywallResult: PAYWALL_RESULT =
  //       await RevenueCatUI.presentPaywall();
  //     // or if you need to present a specific offering:

  //     switch (paywallResult) {
  //       case PAYWALL_RESULT.NOT_PRESENTED:
  //       case PAYWALL_RESULT.ERROR:
  //       case PAYWALL_RESULT.CANCELLED:
  //         return false;
  //       case PAYWALL_RESULT.PURCHASED:
  //       case PAYWALL_RESULT.RESTORED:
  //         return true;
  //       default:
  //         return false;
  //     }
  //   }

  //   useEffect(() => {
  //     presentPaywall();
  //   }, []);
  return (
    <View style={{ flex: 1 }}>
      <RevenueCatUI.Paywall
        options={{
          displayCloseButton: true,
        }}
        onDismiss={() => {
          router.push('/(tabs)/account');
        }}
        onPurchaseCompleted={({ customerInfo }) => {
          router.push('/(tabs)/home');
        }}
      />
    </View>
  );
}
