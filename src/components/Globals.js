import React, {Component} from 'react'; 

const Globals = () => {
    //constants
    global.API_ENDPOINT = "http://192.168.0.126:8080/api/"; 
    global.MAPS_API_KEY = "AIzaSyBBgb9w4vEBeX9zSoLOBC2hB7omCHBi5SU"; 
    global.JSON_SUCCESS = "success";

    //for use within session
    global.mcgill_id = "";
    global.pickup_lat = "";
    global.pickup_lng = "";
    global.dest_lat="";
    global.dest_lng="";
    
}

export default Globals;