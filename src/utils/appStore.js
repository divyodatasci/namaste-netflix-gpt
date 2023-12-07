import {configureStore} from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import movieReducer from './movieSlice';
import gptReducer from './gptSlice';
import configReducer from './configSlice';

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movie: movieReducer,
        gpt: gptReducer,
        config: configReducer,
    },
});

export default appStore;