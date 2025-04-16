package com.hostel.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hostel.entity.ContactMessage;
import com.hostel.service.EmailService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api")
public class ContactController {
	
	 private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private EmailService emailService;

    @PostMapping("/contact")
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactMessage contactMessage) {
        try {
            // Email destination (your email address)
            String ownerEmail = "oraclecourse107@gmail.com";

            // Construct subject and body for the email
            String subject = "New Contact Message from " + contactMessage.getName();
            String body = "<h2>Contact Message Details</h2>"
                    + "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>"
                    + "<tr><th>Field</th><th>Details</th></tr>"
                    + "<tr><td>Name</td><td>" + contactMessage.getName() + "</td></tr>"
                    + "<tr><td>Email</td><td>" + contactMessage.getEmail() + "</td></tr>"
                    + "<tr><td>Phone</td><td>" + contactMessage.getPhone() + "</td></tr>"
                    + "<tr><td>Message</td><td>" + contactMessage.getMessage() + "</td></tr>"
                    + "</table>";

            // Send the email using your EmailService
            emailService.sendEmail(ownerEmail, subject, body);
            logger.info("Contact email successfully sent to {}", ownerEmail);

            return new ResponseEntity<>("Message sent successfully!", HttpStatus.OK);
        } catch (MessagingException e) {
        	
        	logger.error("Error sending contact email: {}", e.getMessage());
            return new ResponseEntity<>("Error sending email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
