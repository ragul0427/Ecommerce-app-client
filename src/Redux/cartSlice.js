import {createSlice} from "@reduxjs/toolkit"

const cartSlice=createSlice({
    name:"cartSlice",
    initialState:{},
    reducers:{
        addCartProducts:(state,action)=>{
            state.cart=action.payload;
        }
    }
})


export  const {addCartProducts}=cartSlice.actions
export default cartSlice.reducer