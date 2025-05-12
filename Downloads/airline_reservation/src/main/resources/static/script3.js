const API_URL = 'http://localhost:8080/payments';

// Ensure price updates when seat type or class changes
document.getElementById("seatType").addEventListener("change", updatePrice);
document.getElementById("classType").addEventListener("change", updatePrice);
document.getElementById("paymentForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    await processPayment();
});

function updatePrice() {
    const seatType = document.getElementById("seatType").value;
    const classType = document.getElementById("classType").value;
    let price = 0;

    if (classType === "Economy") {
        if (seatType === "Window") price = 100;
        else if (seatType === "Middle") price = 80;
        else if (seatType === "Aisle") price = 90;
    } else if (classType === "Business") {
        if (seatType === "Window") price = 300;
        else if (seatType === "Middle") price = 250;
        else if (seatType === "Aisle") price = 280;
    } else if (classType === "First Class") {
        if (seatType === "Window") price = 600;
        else if (seatType === "Middle") price = 550;
        else if (seatType === "Aisle") price = 580;
    }

    console.log("Updated Price:", price);  // 🔍 Debugging in Console
    document.getElementById("priceDisplay").innerText = `$${price}`;
}

async function processPayment() {
    const priceText = document.getElementById("priceDisplay").innerText.replace("$", "");
    const price = parseFloat(priceText); // ✅ Convert price correctly

    if (isNaN(price) || price <= 0) {
        alert("Error: Please select Seat Type and Class before payment.");
        return;
    }

    const payment = {
        ticket: { id: parseInt(document.getElementById('ticketId').value) },
        seatType: document.getElementById('seatType').value,
        classType: document.getElementById('classType').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        status: document.getElementById('status').value === "true",
        price: price
    };

    console.log("Processing payment:", payment); // 🔍 Debugging

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });

        console.log("Response status:", response.status); // 🔍 Debugging

        if (!response.ok) throw new Error("Failed to process payment");

        if (payment.status) {
            // ✅ Show confirmation message for successful payment
            document.body.innerHTML = `<div style="text-align:center; font-size:20px; padding:50px;">
                <h2 style="color:green;">✅ Ticket Booked!</h2>
                <p>Thank you for visiting! Your payment was successful.</p>
            </div>`;
        } else {
            // ❌ Show pending payment message
            document.body.innerHTML = `<div style="text-align:center; font-size:20px; padding:50px;">
                <h2 style="color:red;">⚠ Payment Pending</h2>
                <p>Your payment is still pending. Please try again or check with your provider.</p>
            </div>`;
        }
        
    } catch (error) {
        console.error("Payment Error:", error);
        alert("Error processing payment");
    }
}
