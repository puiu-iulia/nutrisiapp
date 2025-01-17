import { useState, useEffect } from 'react';
import { View, Text, Separator } from 'tamagui';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouter } from 'expo-router';

import ThemedScreen from '@/components/screen';
import Header from '@/components/header';
import { SubscriptionModal } from '@/components/subscription';
import ConfirmationDialog from '@/components/confirmationDialog';
import {
  logoutUser,
  deleteUser,
  getUser,
} from '@/store/auth/actions';

export default function account() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
  ] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: any) => state.auth.user);

  function handleLogout() {
    // @ts-ignore
    dispatch(logoutUser());
    router.push('/login');
  }

  function openDialog() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  function handleDeleteAccount() {
    // @ts-ignore
    dispatch(deleteUser());
    closeDialog();
    router.push('/register');
  }

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, []);

  return (
    <ThemedScreen>
      <Header title="Account" />
      <AccountAction
        title="Sign Out"
        onPress={handleLogout}
      />
      <Separator borderColor={'$nutrisi'} />
      <AccountAction
        title="Delete Account"
        onPress={openDialog}
      />
      <Separator borderColor={'$nutrisi'} />
      <AccountAction
        title={'Subscription'}
        onPress={() => router.push('/account/subscription')}
      />
      <Separator borderColor={'$nutrisi'} />
      <ConfirmationDialog
        open={isDialogOpen}
        confirmationText="Delete Account"
        acceptTextDescription="Are you sure you want to delete your account?"
        acceptText="Delete"
        rejectText="Cancel"
        onReject={closeDialog}
        onAccept={handleDeleteAccount}
      />
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onPress={() => setIsSubscriptionModalOpen(false)}
        data={[]}
        setIsOpen={() => setIsSubscriptionModalOpen(false)}
      />
    </ThemedScreen>
  );
}

function AccountAction({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 16,
      }}
    >
      <Text fontSize={20} color={'$nutrisi'}>
        {title}
      </Text>
    </Pressable>
  );
}
