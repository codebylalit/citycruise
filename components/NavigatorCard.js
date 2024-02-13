import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAP_KEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestiny } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourite from "./NavFavourite";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/base";

const NavigatorCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex`}>
      <Text style={tw`text-center font-semibold text-xl`}>
        Good Morning, Lalit
      </Text>
      <View style={tw`border-gray-200 py-1 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where To?"
            styles={toInputBoxStyles}
            fetchDetails={false}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestiny({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionCard");
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAP_KEY,
              language: "en",
            }}
            // predefinedPlaces={[{ description: 'Home' }, { description: 'Work' }]} // Predefined places
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavourite />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly p-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate("RideOptionCard")
        }}
          style={tw`flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon 
          name="car" 
          type="font-awesome" 
          color="white" 
          size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-white text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigatorCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 10,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 2,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
