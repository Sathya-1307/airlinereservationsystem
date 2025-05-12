package com.airline.airline_reservation.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.airline_reservation.model.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
