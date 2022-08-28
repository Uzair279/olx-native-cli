import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
    token: null
}
const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case "LOGIN":
            return {
                token: action.payload
            };
        case "LOGOUT":
            return {
                token: null

            };
        case "SIGNUP":
            return {
                token: action.payload
            }


        default: return {
            ...state,
            token: AsyncStorage.getItem('token') ?
                AsyncStorage.getItem('token') : null
        }
    }
}

export default authReducer;