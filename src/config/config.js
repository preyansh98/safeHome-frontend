import {BACKEND_BASE_URL} from 'react-native-dotenv';

export default {
    backendUrls : {
        "loginAPI" : BACKEND_BASE_URL + "/api/login",
        "registerAPI": BACKEND_BASE_URL + "/api/register"
    }
}