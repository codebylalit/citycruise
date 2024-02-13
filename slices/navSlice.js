import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    origin:null,
    destination:null,
    traveltimeinformation:null,
}
export const navSlice = createSlice({
   name:'nav',
   initialState,
   reducer:{
    setOrigin:(state,action) => {
        state.origin=action.payload;
    },
    setDestination:(state,action) => {
        state.setDestiny=action.payload;
    },
    setTravelTimeInformation:(state,action) => {
        state.setTravelTimeInfo=action.payload;
    },
   }
})
export const {setOrigin,setDestiny,setTravelTimeInfo}=navSlice.actions;

//selectors

export const selectOrigin = (state)=>state.nav.origin;
export const selectDestination = (state)=>state.nav.selectDestination;
export const selectTravelTimeInformation = (state)=>state.nav.setTravelTimeInformation;

export default navSlice.reducer;