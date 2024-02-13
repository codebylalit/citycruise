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

const data = [
  {
    id: "123",
    title: "Get A Ride",
    image: "https://cdn0.iconfinder.com/data/icons/transport-30/100/_-7-512.png",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://i.pinimg.com/originals/d5/01/bb/d501bbab3b5f71d42e3fe37401bd6b92.jpg",
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
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
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
