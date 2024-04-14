import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-view";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import MapScreen from "./Screens/MapScreen";
import { KeyboardAvoidingView } from "react-native";
import NavigatorCard from "./components/NavigatorCard";
import FS from "./Screens/FoodScreen";
import FoodScreen from "./Screens/FoodScreen";
import RiderRegistration from "./components/DriverRegistration";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import { AuthProvider } from "./components/authContext";
import AuthenticationModal from "./components/DriverRegistration";

// const firebaseConfig = {
//   // Your Firebase configuration object
//   apiKey: "AIzaSyBylnKTmot4_l_MS84wOFCpBoTt6kuzAlE",
//   authDomain: "Ycitycruise.firebaseapp.com",
//   projectId: "citycruise",
//   storageBucket: "citycruise.appspot.com",
//   messagingSenderId: "813854511309",
//   appId: "1:813854511309:android:d2d75df43608920e439984",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <AuthProvider
        value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
      >
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator
                screenOptions={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="NavigatorCard"
                  component={NavigatorCard}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="FoodScreen"
                  component={FoodScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Authentication"
                  component={AuthenticationModal}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
