package com.airline.airline_reservation.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.airline.airline_reservation.repository.TicketRepository;
import com.airline.airline_reservation.model.Ticket;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    // Method to book a ticket, including price calculation
    public Ticket bookTicket(Ticket ticket) {
        // Calculate the price based on seat type and class
        double price = calculatePrice(ticket.getSeatType(), ticket.getClassType());
        ticket.setPrice(price);

        // Set booking time to current time
        ticket.setBookingTime(java.time.LocalDateTime.now());
        
        // Save the ticket
        return ticketRepository.save(ticket);
    }

    // Calculate the price based on seat type and class type
    private double calculatePrice(String seatType, String classType) {
        double price = 0;
        
        // Add price based on seat type
        if (seatType.equals("window")) {
            price += 50;
        } else if (seatType.equals("aisle")) {
            price += 40;
        }

        // Add price based on class type
        if (classType.equals("business")) {
            price += 150;
        } else {
            price += 100; // Default economy class price
        }

        return price;
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    // Update ticket
    public Ticket updateTicket(Long id, Ticket ticket) {
        Ticket existingTicket = getTicketById(id);

        // Update fields
        existingTicket.setBookingTime(ticket.getBookingTime());
        existingTicket.setPrice(ticket.getPrice());
        existingTicket.setSeatType(ticket.getSeatType());
        existingTicket.setClassType(ticket.getClassType());

        return ticketRepository.save(existingTicket);
    }

    // Delete ticket
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
