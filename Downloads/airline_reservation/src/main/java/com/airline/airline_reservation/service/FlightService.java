package com.airline.airline_reservation.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.airline.airline_reservation.model.Flight;
import com.airline.airline_reservation.repository.FlightRepository;

import java.util.List;

@Service
public class FlightService {
    @Autowired
    private FlightRepository flightRepository;

    // Create Flight
    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    // Read Single Flight
    public Flight getFlightById(Long id) {
        return flightRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    // Read All Flights
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight updateFlight(Long id, Flight flight) {
        return flightRepository.findById(id).map(existingFlight -> {
            // ✅ Modify only existing flight details instead of replacing the object
            existingFlight.setAirline(flight.getAirline());
            existingFlight.setSource(flight.getSource());
            existingFlight.setDestination(flight.getDestination());
            existingFlight.setDepartureTime(flight.getDepartureTime());
            existingFlight.setArrivalTime(flight.getArrivalTime());
            existingFlight.setPrice(flight.getPrice());

            return flightRepository.save(existingFlight);  // ✅ Save the updated flight with the existing ID
        }).orElseThrow(() -> new RuntimeException("Flight not found"));
    }

    // Delete Flight
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
}
