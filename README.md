# EpiRoom

EpiRoom is a simple web application built with Next.js that provides a user-friendly interface for Epitech students to find available rooms. This project aims to streamline the process of locating study spaces within the Epitech campus.

## Features

- **Room Display:** Easily view and search for available rooms.
- **User-Friendly Interface:** Intuitive design for a seamless user experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Noa-Trachez/TempEpiRoom.git epiroom
    cd epiroom
    ```

### Usage

## For all this steps, you need create a .env file in the epiroomnext folder with the following variables:
- EPITECH_COOKIE=your_epitech_cookie

#### Using Docker Compose

1. Build and run the Docker containers:

    ```bash
    docker-compose up -d
    ```

2. Open your browser and go to [http://localhost:8080](http://localhost:8080) to access EpiRoom.

#### Manual Setup

1. Navigate to the `epiroomnext` directory:

    ```bash
    cd epiroomnext
    ```

2. Start the development server:

    ```bash
    yarn install
    yarn build
    yarn start
    ```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access EpiRoom.

## Screenshots
![img.png](img.png)
![img_1.png](img_1.png)
