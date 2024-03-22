import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import * as WebBrowser from "expo-web-browser"
import { useOAuth } from "@clerk/clerk-expo"
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"

WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require('../../assets/Images/starting-page.jpg')} 
        className="w-full h-[400px] object-cover"
      />
      <View className="p-8">
        <Text className="font-bold text-[30px]">Community Markteplace</Text>
        <Text className="text-slate-500 mt-6 text-[18px]">Sell your old item and make money</Text>
        <TouchableOpacity onPress={onPress} className="p-3 bg-blue-500 rounded-full mt-20">
          <Text className="text-white text-center text-[16px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}