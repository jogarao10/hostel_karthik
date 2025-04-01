package com.hostel.controller;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.*;

import com.hostel.entity.Customer;
import com.hostel.service.EmailService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/confirm")
    public String confirmCustomer(@RequestBody Customer customer) {
        try {
            // Hostel owner's email (change this)
            String ownerEmail = "elitekarthikpg@gmail.com"; 

            // Email subject
            String subject = "New Customer Confirmation";

            // Build a more meaningful email template using a simple HTML table
            String body = "<h2>New Booking Details</h2>"
                        + "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>"
                        + "<tr><th>Field</th><th>Details</th></tr>"
                        + "<tr><td>Name</td><td>" + customer.getName() + "</td></tr>"
                        + "<tr><td>Phone</td><td>" + customer.getPhone() + "</td></tr>"
                        + "<tr><td>Room Details</td><td>" + customer.getRoomType() + "</td></tr>"
                        + "<tr><td>Check-in Date</td><td>" + customer.getCheckInDate() + "</td></tr>"
                        + "</table>";
            // Send email
            emailService.sendEmail(ownerEmail, subject, body);

            return "Customer details sent to the hostel owner!";
        } catch (MessagingException e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}
