import { configureStore } from "@reduxjs/toolkit";
import auth from "./slice/auth";
import { useDispatch, useSelector } from "react-redux";
import cart from "./slice/cart";
import threads from "./slice/threads";
import followStat from "./slice/followStatus";
import { showEdit, showNavigate } from "./slice/showProfile";

const store = configureStore({
    reducer: {
        auth,
        cart,
        threads,
        showEdit,
        showNavigate,
        followStat
    },
});

// static type for selector and dispatch
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks that have been given a static type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;