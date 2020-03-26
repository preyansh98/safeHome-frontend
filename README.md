# SafeHome - frontend
Front end in React Native for SafeHome. 
Please refer to [backend repository](https://www.github.com/preyansh98/safehome) for more information about the project. 


![](https://i.imgur.com/4iuZu0q.png)

## Technologies Used

This project is made in React Native, with live testing done using Expo as the project is not ejected or published. 

#### APIs Used

Special thanks to the GMP API for Geocoding, Geolocation, Place Autocomplete, and Directions API. 

The SafeHome API is used as the backend for this project. Refer to [documentation](http://safe-home.herokuapp.com/swagger-ui.html). 

## How to run 

1. Clone the project
2. Set up environment by downloading Node & Expo on your computer, and Expo client on your phone. 
3. Create an `.env` file in root directory and specify a `GMAPS_API_KEY` (Google Maps API Key) and a `BACKEND_BASE_URL` (endpoint to local SafeHome server). 
4. Run `expo start` in the root directory of the project
5. Scan the QR code from the camera app on your phone. 
6. Enjoy!
