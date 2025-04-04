package com.hostel;

import org.slf4j.Logger;


import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication  
public class HostelApplication {
    private static final Logger logger = LoggerFactory.getLogger(HostelApplication.class);

    public static void main(String[] args) {
        logger.info("Starting Hostel Application...");
        
        try {
            SpringApplication.run(HostelApplication.class, args);
            logger.info("Hostel Application started successfully!");
        } catch (Exception e) {
            logger.error("Error starting the application: {}", e.getMessage(), e);
        }
    }
}
