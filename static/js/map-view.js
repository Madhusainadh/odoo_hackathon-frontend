
// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer (you can choose other providers like Mapbox or OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample data (replace with your actual hotspot data)
const hotspots = [
    { lat: 51.505, lon: -0.09, description: 'Litter hotspot 1' },
    { lat: 51.51, lon: -0.1, description: 'Litter hotspot 2' },
    // Add more hotspots here...
];

// Create markers for each hotspot
hotspots.forEach(hotspot => {
    const marker = L.marker([hotspot.lat, hotspot.lon]).addTo(map);
    marker.bindPopup(hotspot.description); // Show hotspot description on click
    // Customize marker appearance (e.g., icon, color) as needed
});
   