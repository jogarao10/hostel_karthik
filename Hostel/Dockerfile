# Step 1: Build the project using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy only the necessary files
COPY Hostel/pom.xml .
COPY Hostel/src ./src

# Run Maven build
RUN mvn clean install -DskipTests

# Step 2: Use JDK 17 Slim for running the application
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/Hostel-0.0.1-SNAPSHOT.jar hostel.jar

# Expose port 8081
EXPOSE 8081

# Set entry point to run the application
ENTRYPOINT ["java", "-jar", "hostel.jar"]
