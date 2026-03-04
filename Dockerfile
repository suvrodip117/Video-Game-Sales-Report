#------BUILD Stage---------------------------------------------
#using base docker image for build
FROM maven:3.9.11-eclipse-temurin-17 AS build

#Setting working dir
WORKDIR /app

#Copying pom.xml to /app and installing pom.xml dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

#Copying src folder into docker image and running build
COPY src ./src
RUN mvn clean package -DskipTests

#--------------------RUNTIME stage----------------------------
#Using open jdk during runtime and setting /app as working dir
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

#Coping jar file from target to a new location
COPY --from=build /app/target/crudapp-0.0.1-SNAPSHOT.jar .

#Exposing port
EXPOSE 8080

#Running application
ENTRYPOINT ["java", "-jar", "/app/crudapp-0.0.1-SNAPSHOT.jar"]
