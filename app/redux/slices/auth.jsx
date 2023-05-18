import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "data", 
    initialState: {
        auth: false,
        // cart: []
    },
    
    reducers: {
      addUsertoLocal: (state) => {
            if (state.auth == false) {
              state.auth = true
              // console.log("ifauth==true")
            } else {
              // console.log("elseauth==true")
            }
          },
    }
    
})

export const selectIsAuth = (state) => Boolean(state.data.auth);

export const authReducer = authSlice.reducer

export const {addUsertoLocal} = authSlice.actions