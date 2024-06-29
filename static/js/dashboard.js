// Connect to the server
const socket = io('http://localhost:3000');

// Get reference to the hotspots div and the template
const hotspotsDiv = document.getElementById('hotspots');
const hotspotTemplate = document.getElementById('hotspotTemplate');

// Dummy hotspots data
const hotspots = [
    { id: 1, title: 'Hotspot 1', description: 'This is hotspot 1', status: 'visited' },
    { id: 2, title: 'Hotspot 2', description: 'This is hotspot 2', status: 'scheduled' },
    { id: 3, title: 'Hotspot 3', description: 'This is hotspot 3', status: 'cleaning' },
    // Add more hotspots as needed
];

// Function to add a hotspot to the page
function addHotspot(hotspot) {
    // Clone the template
    const hotspotDiv = hotspotTemplate.content.cloneNode(true);

    // Set the hotspot details
    hotspotDiv.querySelector('.hotspot-title').textContent = hotspot.title;
    hotspotDiv.querySelector('.hotspot-description').textContent = hotspot.description;
    hotspotDiv.querySelector('.hotspot-status').textContent = hotspot.status;

    // Add event listener to the update status button
    const updateStatusButton = hotspotDiv.querySelector('.update-status-button');
    const statusSelect = hotspotDiv.querySelector('.status-select');
    updateStatusButton.addEventListener('click', () => {
        const newStatus = statusSelect.value;
        socket.emit('status update', hotspot.id, newStatus);
    });

    // Add the hotspot div to the hotspots div
    hotspotsDiv.appendChild(hotspotDiv);
}

// When the server sends a 'status updated' event
socket.on('status updated', (hotspotId, newStatus) => {
    // Find the hotspot div with the given ID and update its status
    const hotspotDiv = hotspotsDiv.querySelector(`[data-id="${hotspotId}"]`);
    if (hotspotDiv) {
        hotspotDiv.querySelector('.hotspot-status').textContent = newStatus;
    }
});

// Add the dummy hotspots to the page
hotspots.forEach(addHotspot);
