import { createSlice, configureStore } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('token') === "null"  ? null : localStorage.getItem('token'),
        type:localStorage.getItem('type'),
    },
    reducers: {
        setUser: (state,action) => {
            localStorage.setItem('token',action.payload);
            state.user=action.payload;
        },
        setType: (state,action) =>{
            localStorage.setItem('type',action.payload)
            state.type=action.payload;
        },
        signOut: (state)=>{
            localStorage.setItem('token',null);
            state.user=null;
            state.type=null;
        }
    }
})


export const { setUser, setType, signOut } = userSlice.actions

export default configureStore({
    reducer: {
        user: userSlice.reducer
    }
})