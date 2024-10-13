# Start with the official MySQL image
FROM mysql:latest

# Set the environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=my-secret-pw
ENV MYSQL_DATABASE=my_database

COPY mysql_database.sql /docker-entrypoint-initdb.d/

# Optionally, copy any initialization scripts into the container
# These scripts will automatically be run by MySQL when the container starts.
# Example of copying SQL files to set up tables or populate data:
# COPY ./init.sql /docker-entrypoint-initdb.d/
EXPOSE 3307