import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Platform } from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
} from 'react-native-purchases';
import { CustomerInfo } from 'react-native-purchases';

const APIKeys = {
  apple: process.env.EXPO_PUBLIC_APPLE_REVENUECAT_API_KEY,
  google: '',
};

interface RevenueCatProps {
  purchasePackage: (
    pack: PurchasesPackage,
  ) => Promise<void>;
  restorePermissions: () => Promise<CustomerInfo>;
  user: UserState;
  packages: PurchasesPackage[];
}

export interface UserState {
  subscription: string;
  //items: string[];
  pro: boolean;
}

const RevenueCatContext =
  createContext<RevenueCatProps | null>(null);

// Provide RevenueCat functions to our app

export const RevenueCatProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserState>({
    subscription: '',
    //items: [],
    pro: false,
  });
  const [packages, setPackages] = useState<
    PurchasesPackage[]
  >([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'android') {
        await Purchases.configure({
          apiKey: APIKeys.google,
        });
      } else {
        await Purchases.configure({
          // @ts-ignore
          apiKey: APIKeys.apple,
        });
      }
      setIsReady(true);

      // Use more logging during debug if want!
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      // Listen for customer updates
      Purchases.addCustomerInfoUpdateListener(
        async (info) => {
          updateCustomerInformation(info);
        },
      );

      // Load all offerings and the user object with entitlements
      await loadOfferings();
    };
    init();
  }, []);

  // Load all offerings a user can (currently) purchase
  const loadOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      setPackages(offerings.current.availablePackages);
    }
  };

  // Update user state based on previous purchases
  const updateCustomerInformation = async (
    customerInfo: CustomerInfo,
  ) => {
    const newUser: UserState = {
      subscription: user.subscription,
      //items: [],
      pro: false,
    };

    //console.log('customerInfo', customerInfo);

    // if (
    //   customerInfo?.entitlements.active['Epic Wand'] !==
    //   undefined
    // ) {
    //   newUser.items.push(
    //     customerInfo?.entitlements.active['Epic Wand']
    //       .identifier,
    //   );
    // }

    // if (
    //   customerInfo?.entitlements.active['Magic Boots'] !==
    //   undefined
    // ) {
    //   newUser.items.push(
    //     customerInfo?.entitlements.active['Magic Boots']
    //       .identifier,
    //   );
    // }

    if (
      customerInfo?.entitlements.active['monthly_pro'] !==
      undefined
    ) {
      newUser.pro = true;
      newUser.subscription =
        customerInfo?.entitlements.active[
          'monthly_pro'
        ].productIdentifier;
    }

    if (
      customerInfo?.entitlements.active['yearly_pro'] !==
      undefined
    ) {
      newUser.pro = true;
      newUser.subscription =
        customerInfo?.entitlements.active[
          'yearly_pro'
        ].productIdentifier;
    }

    setUser(newUser);
  };

  // Purchase a package
  const purchasePackage = async (
    pack: PurchasesPackage,
  ) => {
    try {
      const { customerInfo } =
        await Purchases.purchasePackage(pack);
      if (
        typeof customerInfo.entitlements.active[
          'monthly_pro'
        ] !== 'undefined'
      ) {
        setUser({
          ...user,
          subscription: pack.product.identifier,
          pro: true,
        });
      }

      //   }
    } catch (e: any) {
      console.log('Error', e);
      if (!e.userCancelled) {
        alert(e);
      }
    }
  };

  // // Restore previous purchases
  const restorePermissions = async () => {
    const customer = await Purchases.restorePurchases();
    return customer;
  };

  const value = {
    restorePermissions,
    user,
    packages,
    purchasePackage,
  };

  // Return empty fragment if provider is not ready (Purchase not yet initialised)
  if (!isReady) return <></>;

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};

export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};
