import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <Image source={require('./assets/Images/starting-page.jpg')} 
        className="w-full h-[400px]"
      />
      <View className="p-8">
        <Text className="font-bold text-[30px]">Community Markteplace</Text>
        <Text className="text-slate-500 mt-6 text-[18px]">Sell your old item and make money</Text>
      </View>
    </View>
  );
}
