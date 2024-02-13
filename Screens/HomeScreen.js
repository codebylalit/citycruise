import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {GOOGLE_MAP_KEY} from "@env"
import { UseDispatch, useDispatch } from 'react-redux'
import { setDestiny,setOrigin } from '../slices/navSlice'
import NavFavourite from '../components/NavFavourite'

const HomeScreen = () => {
    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-green-600 h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://www.bing.com/images/search?view=detailV2&ccid=thB0k8vK&id=CC45E37259D0EF1180E5860727C65D7771D0DF88&thid=OIP.thB0k8vKI3T4sLSUg9ea5gHaEH&mediaurl=https%3a%2f%2fseekvectorlogo.com%2fwp-content%2fuploads%2f2018%2f07%2fcity-cruises-vector-logo.png&exph=500&expw=900&q=citycruise+logo&simid=607988239603419371&FORM=IRPRST&ck=552100AE11319367C776A2BCB87493D3&selectedIndex=0&itb=0",
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="where from?"
          styles={{
            container: {
              flex: 0,
            },
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
            dispatch(setDestiny(null));
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
        <NavOptions />
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
    text:{
        color:"blue"
    }
})