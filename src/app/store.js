// Mengimpor fungsi `configureStore` dari pustaka "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit";

// Mengimpor `userReducer` dari file "userSlice.js" di direktori yang sama
import userReducer from "./userSlice";

// Membuat store Redux dengan menggunakan fungsi `configureStore`
// `configureStore` membutuhkan objek sebagai argumen, yang memiliki properti `reducer`
// `reducer` adalah objek yang memetakan nama state ke reducer yang sesuai
// Dalam hal ini, kita hanya memiliki satu reducer, yaitu `userReducer`, yang kita map ke state `user`
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Eksport default store sehingga dapat digunakan di bagian lain dari aplikasi
export default store;
