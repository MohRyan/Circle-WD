import { createSlice } from "@reduxjs/toolkit"


const showEditProfile = createSlice({
    name: "showProf",
    initialState: false,
    reducers: {
        EDIT_PROFILE: (_, action) => {
            return Boolean(action)
        },
        EDIT_OUT_PROFILE: (_, action) => {
            return Boolean(!action)
        }
    }

})

const navigateProfile = createSlice({
    name: "navProf",
    initialState: true,
    reducers: {
        NAVIGATE_PROFILE: (_, action) => {
            return Boolean(!action)
        },
        NAVIGATE_OUT_PROFILE: (_, action) => {
            return Boolean(action)
        },
        NAVIGATE_NAVBAR__PROFILE: (_, action) => {
            return Boolean(!action)
        },
        NAVIGATE_NAVBAR_OUT_PROFILE: (_, action) => {
            return Boolean(action)
        }
    }

})

export const { EDIT_OUT_PROFILE, EDIT_PROFILE } = showEditProfile.actions
export const { NAVIGATE_PROFILE, NAVIGATE_NAVBAR_OUT_PROFILE, NAVIGATE_NAVBAR__PROFILE, NAVIGATE_OUT_PROFILE } = navigateProfile.actions
export const showEdit = showEditProfile.reducer
export const showNavigate = navigateProfile.reducer 