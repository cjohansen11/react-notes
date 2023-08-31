# React Notes

A simple React notes application. This application provides users the ability to signin with their email and create, update, delete, and search notes.

## Installation and Running Locally

- Clone the repo

```bash
    git@github.com:cjohansen11/react-notes.git
```

#### Install and Start Backend

- `cd` into the `/backend` directory
- Create `.env` file from the `env.example`
- Install Dependencies:

```bash
    yarn install
```

- Verify Docker Application is running locally
- Start Server:

```bash
    docker-compose up
```

#### Install and Start Frontend

- Open a new terminal
- `cd` into `/frontend` directory
- Create `.env.local` file from the `env.local.example`
- Install Dependencies:

```bash
    yarn install
```

- Start Application:

```bash
    yarn dev
```

## Running Tests

To run tests, run the following command

- Verify Docker container is up and running as outlined in the Installation section
- `cd` into `/backend` directory
- Run:

```bash
  yarn test
```

## Tech Stack

**Client:** React, NextJs

**Server:** Node, Express, Postgres, Prisma, Docker

## Authors

- [@cjohansen11](https://www.github.com/cjohansen11)
