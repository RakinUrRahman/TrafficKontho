document.getElementById('reportForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const violationType = this.violationType.value;
  const dateTime = this.dateTime.value;
  const description = this.description.value;
  const locationText = document.getElementById('locationDisplay').textContent;

  const photosInput = this.photos.files;
  const videosInput = this.videos.files;

  // Helper: convert files to data URLs
  function filesToDataURLs(files) {
    const readers = [];
    for (let i = 0; i < files.length; i++) {
      readers.push(new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(files[i]);
      }));
    }
    return Promise.all(readers);
  }

  Promise.all([
    filesToDataURLs(photosInput),
    filesToDataURLs(videosInput)
  ]).then(([photosDataURLs, videosDataURLs]) => {
    const newReport = {
      title: violationType,
      description: description + (locationText !== "Location not set" ? ` (Location: ${locationText})` : ''),
      status: "Pending",
      dateTime: dateTime,
      photos: photosDataURLs,
      videos: videosDataURLs
    };

    let reports = JSON.parse(localStorage.getItem('reports')) || [];
    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));

    window.location.href = "my_reports.html";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Location button logic (you have this already)
  const locationDisplay = document.getElementById('locationDisplay');
  const getLocationBtn = document.getElementById('getLocationBtn');
  let currentLocation = null;

  getLocationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      locationDisplay.textContent = 'Geolocation not supported.';
      return;
    }
    locationDisplay.textContent = 'Locating...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        currentLocation = { latitude, longitude };
        locationDisplay.textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
      },
      (error) => {
        locationDisplay.textContent = 'Unable to retrieve location.';
        console.error(error);
      }
    );
  });

  // Form submit handler
  const form = document.getElementById('reportForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Gather form data
    const violationType = form.violationType.value;
    const dateTime = form.dateTime.value;
    const description = form.description.value;

    // Read files and convert to base64 strings for storage
    async function filesToBase64(fileList) {
      const arr = [];
      for (const file of fileList) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject("File reading error");
          reader.readAsDataURL(file);
        });
        arr.push(base64);
      }
      return arr;
    }

    const photosFiles = form.photos.files;
    const videosFiles = form.videos.files;

    const photos = await filesToBase64(photosFiles);
    const videos = await filesToBase64(videosFiles);

    // Create report object
    const newReport = {
      title: violationType,
      dateTime,
      description,
      photos,
      videos,
      location: currentLocation,
      status: "Pending"
    };

    // Get existing reports from localStorage or empty array
    const storedReports = JSON.parse(localStorage.getItem('myReports')) || [];

    // Add new report
    storedReports.push(newReport);

    // Save back
    localStorage.setItem('myReports', JSON.stringify(storedReports));

    alert("Report submitted successfully!");

    // Reset form & location display
    form.reset();
    currentLocation = null;
    locationDisplay.textContent = 'Location not set';
  });
});
