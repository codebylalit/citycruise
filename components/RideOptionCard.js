import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/base";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";
import NavigatorCard from "./NavigatorCard";
import MapScreen from "../Screens/MapScreen";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE =  1.5;

const RideOptionCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation= useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigatorCard)}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-center py-5 text-xl font-semibold`}>
        Select a Ride - {travelTimeInformation?.distance?.text}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[
              tw`flex-row justify-between items-center px-10`,
              item.id === selected?.id && tw`bg-gray-200`,
            ]}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.distance?.text}Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
            {new Intl.NumberFormat('en-gb',{
              style: 'currency',
              currency: 'INR'
            }).format(
              (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * item.multiplier)/100
            )}
            
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"} `}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({});
