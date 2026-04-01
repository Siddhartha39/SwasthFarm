// Function to request and store user location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Get additional location details using IP Geolocation API
                fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=881e372e64f2416086f6374d3bb23c83&lat=${latitude}&long=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        const locationData = {
                            latitude: latitude,
                            longitude: longitude,
                            country: data.country_name,
                            state: data.state_prov,
                            city: data.city,
                            district: data.district,
                            zipcode: data.zipcode,
                            ip: data.ip,
                            timestamp: new Date().toISOString()
                        };
                        
                        // Store location data in localStorage
                        localStorage.setItem('userLocation', JSON.stringify(locationData));
                        
                        // Send to server for storage in MongoDB
                        storeLocationInDB(locationData);
                    })
                    .catch(error => {
                        console.error('Error getting location details:', error);
                    });
            },
            // Error callback
            function(error) {
                console.error('Error getting location:', error);
                // Fallback to IP-based location only
                getLocationByIP();
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback to IP-based location
        getLocationByIP();
    }
}

// Fallback function to get location by IP only
function getLocationByIP() {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=881e372e64f2416086f6374d3bb23c83`)
        .then(response => response.json())
        .then(data => {
            const locationData = {
                latitude: data.latitude,
                longitude: data.longitude,
                country: data.country_name,
                state: data.state_prov,
                city: data.city,
                district: data.district,
                zipcode: data.zipcode,
                ip: data.ip,
                timestamp: new Date().toISOString(),
                source: 'ip-only'
            };
            
            // Store location data in localStorage
            localStorage.setItem('userLocation', JSON.stringify(locationData));
            
            // Send to server for storage in MongoDB
            storeLocationInDB(locationData);
        })
        .catch(error => {
            console.error('Error getting IP-based location:', error);
        });
}

// Function to send location data to server
function storeLocationInDB(locationData) {
    // Send data to your server endpoint
    fetch('http://localhost:5000/api/location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Location stored successfully:', data);
    })
    .catch(error => {
        console.error('Error storing location:', error);
    });
}

// Request location when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we've already asked for location in this session
    if (!sessionStorage.getItem('locationRequested')) {
        getUserLocation();
        sessionStorage.setItem('locationRequested', 'true');
    }
});