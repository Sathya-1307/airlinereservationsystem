package com.airline.airline_reservation.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.airline.airline_reservation.repository.PassengerRepository;
import com.airline.airline_reservation.model.Passenger;
import java.util.List;
@Service
public class PassengerService {
    @Autowired
    private PassengerRepository passengerRepository;

    public Passenger registerPassenger(Passenger passenger) {
        return passengerRepository.save(passenger);
    }

    public Passenger getPassengerById(Long id) {
        return passengerRepository.findById(id).orElseThrow(() -> new RuntimeException("Passenger not found"));
    }

    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }

    public Passenger updatePassenger(Long id, Passenger passenger) {
        Passenger existingPassenger = getPassengerById(id);
        existingPassenger.setName(passenger.getName());
        existingPassenger.setEmail(passenger.getEmail());
        existingPassenger.setPhoneNumber(passenger.getPhoneNumber());
        return passengerRepository.save(existingPassenger);
    }

    public void deletePassenger(Long id) {
        passengerRepository.deleteById(id);
    }
}

