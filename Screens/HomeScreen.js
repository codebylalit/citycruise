import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourite from "../components/NavFavourite";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import AuthenticationModal from "../components/DriverRegistration";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal

  const handleDetectLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      dispatch(
        setOrigin({
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          description: address[0].name,
        })
      );
      dispatch(setDestination(null));
    } catch (error) {
      console.log("Error getting location:", error);
    }
  };

  return (
    <SafeAreaView style={tw`absolute`}>
      <ImageBackground // Use ImageBackground for the background image
        source={require("../Images/BG4.png")} // Path to your background image
        style={styles.backgroundImage}
      >
        <View style={tw`p-4`}>
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: "cover",
            }}
          />
          <Text style={styles.logoText}>CityCruise</Text>
          <GooglePlacesAutocomplete
            placeholder="where from?"
            styles={{
              container: {},
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAP_KEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
          <TouchableOpacity onPress={handleDetectLocation}>
            <View style={styles.liveLocationContainer}>
              <FontAwesome name="location-arrow" size={24} color="gray" />
            </View>
          </TouchableOpacity>
          <NavOptions />
          <NavFavourite />
          <TouchableOpacity>
            <Text
              style={styles.registrationButton}
              onPress={() =>
                navigation.navigate(isLoggedIn ? "Profile" : "Authentication")
              }
            >
              {isLoggedIn ? "My Profile" : "Become CityCruise Driver"}
            </Text>
          </TouchableOpacity>
        </View>
        {showLoginModal && ( // Render the login modal only if showLoginModal is true
          <AuthenticationModal isLoggedIn={isLoggedIn} />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    position: "absolute",
    fontFamily: "sans-serif",
    left: -30,
    margin: 40,
  },
  liveLocationContainer: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "whitesmoke",
    borderRadius: 50,
    padding: 10,
  },
  registrationButton: {
    top: 190,
    textAlign: "center",
    backgroundColor: "green", // CityCruise primary color
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    color: "#FFFFFF", // White text color
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%", // Cover the entire width
    height: "100%", // Cover the entire height
  },
});
