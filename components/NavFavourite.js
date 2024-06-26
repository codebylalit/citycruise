import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Icon } from '@rneui/base'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: "123",
        icon: "home",
        location: "Home",
        destination: "Jolpur",
    },
    {
        id: "456",
        icon: "briefcase",
        location: "Work",
        destination: "Reodar",
    }
]

const NavFavourite = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={()=>{
        <View
            style={[tw`bg-gray-200`, {height:0.5}]}
        />
      }}
      renderItem={({ item:{location,destination,icon} }) => ( // Destructure item here
        <TouchableOpacity style={tw`flex-row items-center p-4`}>
          <Icon
            style={tw`mr-4 rounded-full bg-white p-4`}
            name={icon}
            type='ionicon'
            color='gray'
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-white`} >{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourite;

const styles = StyleSheet.create({})
