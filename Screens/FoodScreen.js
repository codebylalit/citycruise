import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const FoodScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex justify-center items-center flex-1`}>
      <TouchableOpacity
        style={tw`z-50 rounded-full`}
        onPress={() => navigation.goBack()} // Navigate back when arrow icon is pressed
      >
        <Icon
          style={tw`p-2 bg-black rounded-full w-10`}
          name="arrowleft"
          color="white"
          type="antdesign"
        />
      </TouchableOpacity>
      <View style={tw`mt-2`}>
        <Text style={tw`text-center text-lg font-semibold`}>Coming Soon!</Text>
      </View>
    </SafeAreaView>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({});
