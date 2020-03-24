import { BACKEND_BASE_URL } from 'react-native-dotenv';

const Globals = () => {
    console.log(BACKEND_BASE_URL + "-0ADFAE");
    global.JSON_SUCCESS = "success";
    //for use within session
    global.mcgill_id = "";
    global.pickup_lat = "";
    global.pickup_lng = "";
    global.dest_lat = "";
    global.dest_lng = "";
}

export default Globals;