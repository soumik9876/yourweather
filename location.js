const success = (position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat, long);
    const xhr = new XMLHttpRequest();
    
    return;
};

const error = (error) => {
    console.log(error);
}

options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

navigator.geolocation.watchPosition(success, error, options)