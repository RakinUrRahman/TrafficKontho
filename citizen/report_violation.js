document.getElementById('getLocationBtn').addEventListener('click', () => {
    const locationDisplay = document.getElementById('locationDisplay');
  
    if (!navigator.geolocation) {
      locationDisplay.textContent = 'Geolocation not supported.';
      return;
    }
  
    locationDisplay.textContent = 'Locating...';
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationDisplay.textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
        // Optionally, you can store these coords in hidden inputs if needed for form submission
      },
      (error) => {
        locationDisplay.textContent = 'Unable to retrieve location.';
        console.error(error);
      }
    );
  });
  