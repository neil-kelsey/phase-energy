import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DocumentationScreen from './DocumentationScreen';
import SupabaseTest from './components/SupabaseTest';

function HomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-xl font-semibold text-gray-800">Home Page - Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { paddingBottom: 4 },
          tabBarLabelStyle: { fontSize: 12, paddingBottom: 4 },
          headerShown: true,
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Tab.Screen 
          name="Documentation" 
          component={DocumentationScreen}
        />
        <Tab.Screen 
          name="Supabase Test" 
          component={SupabaseTest}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
