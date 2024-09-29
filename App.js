// import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZyWAMqL-M_UKXo5-r_l_16eWT4oUeI6o",
  authDomain: "godkend-1.firebaseapp.com",
  databaseURL:
    "https://godkend-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "godkend-1",
  storageBucket: "godkend-1.appspot.com",
  messagingSenderId: "542868087481",
  appId: "1:542868087481:web:aae765f7c63d708aae3168",
  measurementId: "G-NMFR91LL23",
};

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: () => <Ionicons name="home" size={20} /> }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: () => <Ionicons name="person" size={20} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
