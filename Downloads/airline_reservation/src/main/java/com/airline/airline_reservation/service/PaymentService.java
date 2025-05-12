package com.airline.airline_reservation.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.airline.airline_reservation.model.Payment;
import com.airline.airline_reservation.repository.PaymentRepository;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class PaymentService {
    private static final Logger LOGGER = Logger.getLogger(PaymentService.class.getName());

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Payment payment) {
        LOGGER.info("Processing payment with method: " + payment.getPaymentMethod());
        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        if (payment.isEmpty()) {
            LOGGER.warning("Payment not found for ID: " + id);
            throw new RuntimeException("Payment not found.");
        }
        return payment.get();
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment updatePayment(Long id, Payment payment) {
        Payment existingPayment = getPaymentById(id);
        existingPayment.setPaymentMethod(payment.getPaymentMethod());
        existingPayment.setStatus(payment.isStatus());

        LOGGER.info("Updating payment with ID: " + id);
        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            LOGGER.warning("Attempted to delete non-existent payment ID: " + id);
            throw new RuntimeException("Payment not found for deletion.");
        }

        LOGGER.info("Deleting payment with ID: " + id);
        paymentRepository.deleteById(id);
    }
}
