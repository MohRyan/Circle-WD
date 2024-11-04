
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../redux'
import { EDIT_OUT_PROFILE, EDIT_PROFILE, NAVIGATE_NAVBAR__PROFILE, NAVIGATE_NAVBAR_OUT_PROFILE, NAVIGATE_OUT_PROFILE, NAVIGATE_PROFILE } from '../redux/slice/showProfile'


const UseShowProfile = () => {
    let editProfile = useSelector((show: RootState) => show.showEdit)
    let navProfile = useSelector((show: RootState) => show.showNavigate)

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const handleNavigateProfile = () => {
        dispatch(NAVIGATE_PROFILE(navProfile))
        navigate("/myProfile")
    }
    const handleNavigateProfileWithID = async () => {
        dispatch(NAVIGATE_PROFILE(navProfile))
    }
    const handleNavigateOutProfile = () => {
        dispatch(NAVIGATE_OUT_PROFILE(navProfile))
        navigate("/dashboard")
    }
    const handleNavigateNavbarProfile = () => {
        dispatch(NAVIGATE_NAVBAR__PROFILE(navProfile))
    }
    const handleNavigateNavbarOutProfile = () => {
        dispatch(NAVIGATE_NAVBAR_OUT_PROFILE(navProfile))
    }
    //===== Navigate Profile


    const handleShowEditProfile = () => {
        dispatch(EDIT_PROFILE(editProfile))
    }
    const handleOutEditProfile = () => {
        dispatch(EDIT_OUT_PROFILE(editProfile))
    }

    return {
        handleNavigateProfile,
        handleNavigateProfileWithID,
        handleNavigateOutProfile,
        handleNavigateNavbarOutProfile,
        handleNavigateNavbarProfile,
        handleShowEditProfile,
        handleOutEditProfile,
        editProfile,
        navProfile
    }
}

export default UseShowProfile