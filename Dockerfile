# Use a base image suitable for the project
FROM ubuntu:20.04

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    cmake \
    g++ \
    make

# Set up the working directory
WORKDIR /workspace

# Copy the current directory contents into the container at /workspace
COPY . /workspace

# Define the command to run the application
CMD ["bash"]
