// Mengimpor fungsi `createSlice` dari pustaka "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit";

// Mendefinisikan state awal sebagai objek kosong
const initialState = {};

// Membuat "slice" Redux dengan fungsi `createSlice`
// `createSlice` membutuhkan objek sebagai argumen, yang memiliki properti `name`, `initialState`, dan `reducers`
// `name` adalah nama dari slice ini, yang akan digunakan dalam aksi dan selector
// `initialState` adalah state awal dari slice ini
// `reducers` adalah objek yang memetakan nama aksi ke fungsi reducer yang sesuai
// Dalam hal ini, kita hanya memiliki satu reducer, yaitu `setUser`, yang mengatur `state.user` ke `action.payload`
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// Eksport aksi yang dibuat oleh `createSlice`
// Dalam hal ini, kita hanya memiliki satu aksi, yaitu `setUser`
export const { setUser } = userSlice.actions;

// Eksport reducer yang dibuat oleh `createSlice`
// Reducer ini akan digunakan dalam `configureStore`
export default userSlice.reducer;
