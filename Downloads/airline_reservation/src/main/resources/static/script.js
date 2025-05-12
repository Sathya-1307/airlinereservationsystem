const API_URL = 'http://localhost:8080/flights';
let editingFlightId = null;

// Load flights on page load
document.addEventListener("DOMContentLoaded", fetchFlights);

// Fetch all flights and display them
async function fetchFlights() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch flights");

        const flights = await response.json();
        const tbody = document.querySelector("#flightTable tbody");
        tbody.innerHTML = "";  

        flights.forEach(flight => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${flight.id}</td>
                <td>${flight.airline}</td>
                <td>${flight.source}</td>
                <td>${flight.destination}</td>
                <td>${flight.departureTime}</td>
                <td>${flight.arrivalTime}</td>
                <td>${flight.price}</td>
                <td>
                    <button class="edit" onclick="editFlight(${flight.id})">✏️ Edit</button>
                    <button class="delete" onclick="deleteFlight(${flight.id})">🗑️ Delete</button>
                    <button class="book" onclick="bookFlight(${flight.id})">🛒 Book Flight</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        console.log("✅ Flights loaded successfully! Check table.");
    } catch (error) {
        console.error("🚨 Error fetching flights:", error);
    }
}


// ✅ Redirect to `index1.html` for flight booking
function bookFlight(flightId) {
    window.location.href = `index1.html?flightId=${flightId}`;
}

// Handle Add/Update Flight
document.getElementById('flightForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const flight = getFormData();
    let method = 'POST';
    let url = API_URL;

    if (editingFlightId) {
        flight.id = editingFlightId;
        method = 'PUT';
        url = `${API_URL}/${editingFlightId}`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight)
        });

        if (!response.ok) throw new Error(`${method} request failed`);

        alert(editingFlightId ? 'Flight updated successfully!' : 'Flight added successfully!');
        resetForm();
        fetchFlights();
    } catch (error) {
        console.error("Error saving flight:", error);
        alert("Error saving flight");
    }
});

// Populate form for editing
async function editFlight(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch flight");

        const flight = await response.json();
        editingFlightId = id;

        document.getElementById('airline').value = flight.airline;
        document.getElementById('source').value = flight.source;
        document.getElementById('destination').value = flight.destination;
        document.getElementById('departureTime').value = flight.departureTime;
        document.getElementById('arrivalTime').value = flight.arrivalTime;
        document.getElementById('price').value = flight.price;

        document.querySelector('button[type="submit"]').textContent = 'Update Flight';
    } catch (error) {
        console.error("Error loading flight for edit:", error);
        alert("Error loading flight details");
    }
}

// Handle deleting a flight
async function deleteFlight(id) {
    if (!confirm("Are you sure you want to delete this flight?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (!response.ok) throw new Error("Failed to delete flight");

        alert("Flight deleted successfully!");
        fetchFlights();
    } catch (error) {
        console.error("Error deleting flight:", error);
        alert("Error deleting flight");
    }
}

// Reset form and mode
function resetForm() {
    document.getElementById('flightForm').reset();
    editingFlightId = null;
    document.querySelector('button[type="submit"]').textContent = "Add Flight";
}

// Collect form data
function getFormData() {
    return {
        airline: document.getElementById('airline').value,
        source: document.getElementById('source').value,
        destination: document.getElementById('destination').value,
        departureTime: document.getElementById('departureTime').value,
        arrivalTime: document.getElementById('arrivalTime').value,
        price: parseFloat(document.getElementById('price').value)
    };
}
