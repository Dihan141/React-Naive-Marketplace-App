import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_bmF0aXZlLWZsYW1pbmdvLTE1LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <View className="flex-1 bg-white">
        <StatusBar style="auto"/>
        <SignedIn>
          <Text className="mt-10">You are Signed in</Text>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}
