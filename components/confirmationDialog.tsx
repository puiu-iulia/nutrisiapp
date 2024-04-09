import { useState } from 'react';
import {
  AlertDialog,
  Button,
  XStack,
  YStack,
} from 'tamagui';

interface ConfirmationDialogProps {
  onReject: () => void;
  onAccept: () => void;
  confirmationText: string;
  acceptTextDescription: string;
  acceptText: string;
  rejectText: string;
  open: boolean;
}

export default function ConfirmationDialog({
  onReject,
  onAccept,
  acceptText,
  acceptTextDescription,
  rejectText,
  confirmationText,
  open,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{
            x: 0,
            y: -20,
            opacity: 0,
            scale: 0.9,
          }}
          exitStyle={{
            x: 0,
            y: 10,
            opacity: 0,
            scale: 0.95,
          }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>
              {confirmationText}
            </AlertDialog.Title>

            <AlertDialog.Description>
              {acceptTextDescription}
            </AlertDialog.Description>
            <XStack space="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button onPress={onReject}>
                  {rejectText}
                </Button>
              </AlertDialog.Cancel>

              <AlertDialog.Action>
                <Button
                  onPress={() => {
                    console.log('accept');
                    onAccept();
                  }}
                  theme="active"
                >
                  {acceptText}
                </Button>
              </AlertDialog.Action>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
