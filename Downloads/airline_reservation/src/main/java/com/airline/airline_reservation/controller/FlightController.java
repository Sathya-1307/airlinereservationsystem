package com.airline.airline_reservation.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.airline.airline_reservation.service.FlightService;
import com.airline.airline_reservation.model.Flight;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    // Create Flight
    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightService.addFlight(flight);
    }

    // Read Single Flight
    @GetMapping("/{id}")
    public Flight getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id);
    }

    // Read All Flights
    @GetMapping
    public List<Flight> getFlights() {
        return flightService.getAllFlights();
    }

    @PutMapping("/{id}")
    public Flight updateFlight(@PathVariable Long id, @RequestBody Flight flight) {
        flight.setId(id);  // ✅ Ensure correct flight ID is retained before updating
        return flightService.updateFlight(id, flight);
    }


    // Delete Flight
    @DeleteMapping("/{id}")
    public void deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
    }
}
