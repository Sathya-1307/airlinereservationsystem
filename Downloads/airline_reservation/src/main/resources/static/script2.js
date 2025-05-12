const apiUrl = 'http://localhost:8080/tickets';

// Update price dynamically
function updatePrice() {
    const seatType = document.getElementById('seatType').value;
    const classType = document.getElementById('classType').value;
    let price = 0;

    if (seatType === 'window') price += 50;
    if (seatType === 'aisle') price += 40;
    if (classType === 'business') price += 150;
    else price += 100;

    document.getElementById('ticketPrice').innerText = price;
}

// Book a new ticket
function bookTicket() {
    const flightId = document.getElementById('flightId').value.trim();
    const passengerId = document.getElementById('passengerId').value.trim();
    const seatType = document.getElementById('seatType').value;
    const classType = document.getElementById('classType').value;
    const price = parseInt(document.getElementById('ticketPrice').innerText);

    if (!flightId || !passengerId) {
        alert('❌ Please fill in all fields.');
        return;
    }

    const ticketData = {
        flightId,
        passengerId,
        seatType,
        classType,
        price,
        bookingTime: new Date().toISOString()
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Ticket booked successfully!');
        getAllTickets();
        displayPaymentButton(data.id);
    })
    .catch(error => {
        console.error('🚨 Error:', error);
        alert('❌ Failed to book ticket');
    });
}

function displayPaymentButton(ticketId) {
    const container = document.getElementById('paymentButtonContainer');
    container.innerHTML = `
        <button onclick="makePayment(${ticketId})">💳 Make Payment</button>
    `;
}

function makePayment(ticketId) {
    window.location.href = `index3.html?ticketId=${ticketId}`;
}


// ✅ Fixed: Go to ticket details page

function getTicketById() {
    console.log("✅ getTicketById() function is being executed!");

    const ticketInput = document.getElementById("ticketId");
    if (!ticketInput) {
        console.error("❌ ticketId input not found in DOM.");
        return;
    }

    const ticketId = ticketInput.value.trim();
    console.log("🎟️ Entered Ticket ID:", ticketId);

    if (!ticketId) {
        alert("❌ Please enter a valid Ticket ID.");
        return;
    }

    // ✅ Fetch ticket details from backend
    fetch(`${apiUrl}/${ticketId}`)
        .then(response => {
            if (!response.ok) throw new Error("Ticket not found!");
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("ticketDetailsContainer");
            if (!container) {
                console.error("❌ ticketDetailsContainer not found in DOM.");
                return;
            }

            container.innerHTML = `
                <p><strong>Ticket ID:</strong> ${data.id}</p>
                <p><strong>Flight ID:</strong> ${data.flightId}</p>
                <p><strong>Passenger ID:</strong> ${data.passengerId}</p>
                <p><strong>Seat Type:</strong> ${data.seatType}</p>
                <p><strong>Class:</strong> ${data.classType}</p>
                <p><strong>Price:</strong> $${data.price}</p>
                <p><strong>Booking Time:</strong> ${data.bookingTime}</p>
            `;
        })
        .catch(error => {
            const container = document.getElementById("ticketDetailsContainer");
            if (container) container.innerHTML = "❌ Ticket not found.";
            console.error("🚨 Error fetching ticket:", error);
        });
}


// Load all tickets
function getAllTickets() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('ticketList');
        list.innerHTML = '';

        data.forEach(ticket => {
            const li = document.createElement('li');
            li.innerHTML = `
                Ticket ID: ${ticket.id}, Flight ID: ${ticket.flightId}, Passenger ID: ${ticket.passengerId},
                Seat Type: ${ticket.seatType}, Class: ${ticket.classType}, Price: $${ticket.price}
                <button onclick="makePayment(${ticket.id})">💳 Pay</button>
            `;
            list.appendChild(li);
        });
    })
    .catch(error => {
        console.error('🚨 Error:', error);
        alert('❌ Failed to load tickets');
    });
}

// Update a ticket
function updateTicket() {
    const ticketId = document.getElementById('updateTicketId').value.trim();
    const newPrice = document.getElementById('updatePrice').value.trim();

    if (!ticketId || !newPrice) {
        alert('❌ Please enter both Ticket ID and new price.');
        return;
    }

    const updatedData = {
        price: parseFloat(newPrice),
        bookingTime: new Date().toISOString()
    };

    fetch(`${apiUrl}/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) throw new Error("Update failed");
        return response.json();
    })
    .then(() => {
        alert('✅ Ticket updated successfully!');
        getAllTickets();
    })
    .catch(error => {
        console.error('🚨 Error:', error);
        alert('❌ Failed to update ticket');
    });
}


// Cancel a ticket
function cancelTicket() {
    const ticketId = document.getElementById('cancelTicketId').value.trim();
    if (!ticketId) {
        alert('❌ Please enter a valid Ticket ID.');
        return;
    }

    fetch(`${apiUrl}/${ticketId}`, { method: 'DELETE' })
    .then(response => {
        if (response.ok) {
            alert('✅ Ticket cancelled successfully!');
            getAllTickets();
        } else {
            alert('❌ Ticket not found or failed to cancel.');
        }
    })
    .catch(error => {
        console.error('🚨 Error:', error);
        alert('❌ Failed to cancel ticket');
    });
}

