package com.airline.airline_reservation.repository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.airline.airline_reservation.model.Passenger;
@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> { }

