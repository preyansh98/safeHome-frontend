import {BACKEND_BASE_URL} from 'react-native-dotenv';

export default {
    backendUrls : {
        loginAPI : BACKEND_BASE_URL + "/api/login",
        registerAPI: BACKEND_BASE_URL + "/api/register",
        selectWalkerAPI: BACKEND_BASE_URL + "/api/selectWalkerReq",
        createRequestAPI: BACKEND_BASE_URL + "/api/createRequest",
        viewWalkerAPI: BACKEND_BASE_URL + "/api/view_walkers"
    }
}