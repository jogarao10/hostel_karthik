# Step 1: Build the project using Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Step 2: Use JDK 17 Slim for running the application
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Hostel-0.0.1-SNAPSHOT.jar hostel.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "hostel.jar"]
