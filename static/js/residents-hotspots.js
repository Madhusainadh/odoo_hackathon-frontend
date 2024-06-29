$(document).ready(function() {
    // Dummy data
    const data = [
        {
            residentName: 'John Doe',
            location: '123 Main St',
            description: 'Large pile of litter',
            date: '2024-06-29',
            status: 'Scheduled'
        },
        {
            residentName: 'Jane Smith',
            location: '456 Park Ave',
            description: 'Overflowing public trash can',
            date: '2024-06-28',
            status: 'Completed'
        }
        // Add more dummy data as needed
    ];

    populateTable(data);


    // Event listener for search button
    $('#searchButton').click(function() {
        const searchValue = $('#search').val().toLowerCase();
        const filteredData = data.filter(hotspot =>
            hotspot.residentName.toLowerCase().includes(searchValue) ||
            hotspot.location.toLowerCase().includes(searchValue) ||
            hotspot.description.toLowerCase().includes(searchValue) ||
            hotspot.date.includes(searchValue) ||
            hotspot.status.toLowerCase().includes(searchValue)
        );
        populateTable(filteredData);
    });

    // Event listener for entries select
    $('#entries').change(function() {
        const entriesValue = parseInt($('#entries').val());
        const limitedData = data.slice(0, entriesValue);
        populateTable(limitedData);
    });

    // Event listeners for sortable headers
$('#hotspotsTable th[data-sort]').click(function() {
    const sortProperty = $(this).attr('data-sort');
    const isAsc = $(this).hasClass('asc');
    const isDesc = $(this).hasClass('desc');

    // Clear all classes
    $('#hotspotsTable th[data-sort]').removeClass('asc desc');

    if (!isAsc && !isDesc) {
        // If the column was not sorted, sort it in ascending order
        $(this).addClass('asc');
        data.sort((a, b) => a[sortProperty].toString().localeCompare(b[sortProperty].toString()));
    } else if (isAsc) {
        // If the column was sorted in ascending order, sort it in descending order
        $(this).addClass('desc');
        data.sort((a, b) => b[sortProperty].toString().localeCompare(a[sortProperty].toString()));
    } else {
        // If the column was sorted in descending order, sort it in ascending order
        $(this).addClass('asc');
        data.sort((a, b) => a[sortProperty].toString().localeCompare(b[sortProperty].toString()));
    }

    populateTable(data);
});

// Event listener for page links
$('.page-link').click(function(e) {
    e.preventDefault();

    // Get the page number from the link
    const pageNumber = $(this).text();

    // Fetch the data for the page from the server
    fetch('/hotspots?page=' + pageNumber)
        .then(response => response.json())
        .then(data => {
            // Clear the table and add the new data
            $('#hotspotsTable tbody').empty();
            data.forEach(addHotspot);
        });
});

// Event listener for export button
$('#exportButton').click(function() {
    // Convert the data array to a CSV string
    const csv = Papa.unparse(data);

    // Create a Blob with the CSV string
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create a download link with the Blob as the href
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hotspots.csv';

    // Append the link to the body and click it to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});



});

function populateTable(data) {
    const tableBody = $('#hotspotsTable tbody');
    tableBody.empty(); // Clear existing rows
    data.forEach((hotspot, index) => {
        const row = `<tr>
            <th scope="row">${index + 1}</th>
            <td>${hotspot.residentName}</td>
            <td>${hotspot.location}</td>
            <td>${hotspot.description}</td>
            <td>${hotspot.date}</td>
            <td>${hotspot.status}</td>
        </tr>`;
        tableBody.append(row);
    });
}
