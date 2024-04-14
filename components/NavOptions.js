import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { UseSelector, useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { Icon } from "@rneui/base";
import FoodImg from '../Images/FoodOrder.png';
import GetRide from '../Images/GetRide.png'
const data = [
  {
    id: "123",
    title: "Get A Ride",
    image: GetRide,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: FoodImg,
    screen: "FoodScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`rounded-lg p-3 pl-6 bg-blue-200 bg-opacity-70 m-2 w-40`}
        >
          <View>
            <Image
              style={{ width: 450, height: 100, right:170}}
              source={ item.image }
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

const styles = StyleSheet.create({});
