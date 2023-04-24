FROM openjdk:19

ENV ENVIRONMENT=prod

LABEL maintainer="name"

# /app entspricht pom.xml Tag <finalName> und jar <packaging>
ADD backend/target/socialinterventiontool.jar socialinterventiontool.jar

CMD [ "sh", "-c", "java -jar /socialinterventiontool.jar" ]