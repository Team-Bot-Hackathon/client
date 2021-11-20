import { createSlice, configureStore } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: localStorage.getItem('token') === "null"  ? null : localStorage.getItem('token'),
        type:localStorage.getItem('type'),
        modalData:{},
        modalOpen:false,
        isBanner:false,
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
        },
        setModalOpen: (state,action)=>{
            state.modalOpen=action.payload;
        },
        setmodalData:(state,action)=>{
            state.modalData=action.payload;
        },
        setBanner:(state,action)=>{
            state.isBanner=action.payload;
        },
        setDistance:(state,action)=>{
            state.modalData.shop[action.payload.index]={...state.modalData.shop[action.payload.index],distance:action.payload.distance}
        }   
    }
})


export const { setUser, setType, signOut, setModalOpen, setmodalData, setBanner, setDistance } = userSlice.actions

export default configureStore({
    reducer: {
        user: userSlice.reducer
    }
})