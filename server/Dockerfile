# Use a JDK image
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the built jar from local machine into container
COPY target/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port SPring Boot runs on
EXPOSE 8080

# Run the jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]