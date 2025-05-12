


package com.airline.airline_reservation.model;

import jakarta.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    public String getSeatType() {
		return seatType;
	}
	public void setSeatType(String seatType) {
		this.seatType = seatType;
	}
	public String getClassType() {
		return classType;
	}
	public void setClassType(String classType) {
		this.classType = classType;
	}
	private String seatType;
    private String classType;
    private String paymentMethod;
    private boolean status;
    private double price;

    // Getters & Setters


    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public boolean isStatus() { return status; }
    public void setStatus(boolean status) { this.status = status; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
