# NestJS-Prisma-PostgreSQL

This project serves as a simple CRUD application to help learn how to integrate NestJS with Prisma and PostgreSQL, utilizing Docker for the database service. It's a great starting point for understanding the basics of building backend applications with these technologies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Docker installed on your system to use the PostgreSQL service defined in the `docker-compose.yml` file.

### Configuration

1. **Environment Variables**: This project relies on environment variables for its configuration, particularly for database connection details. Create a `.env` file at the root of the project and add the following lines:

   ```dotenv
   POSTGRES_USER=<your_postgres_user>
   POSTGRES_PASSWORD=<your_postgres_password>
   POSTGRES_DB=<your_database_name>
   ```

   Replace `<your_postgres_user>`, `<your_postgres_password>`, and `<your_database_name>` with the actual values that are relevant to your PostgreSQL setup.

   Next, define the connection URL for Prisma in the same `.env` file:

   ```dotenv
   DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}?schema=public"
   ```

   Ensure that the values of `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` are consistent with what you set previously. This URL facilitates the connection between Prisma and your PostgreSQL database.

### Running with Docker

Execute the following command to start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

This command initializes a Docker container for PostgreSQL in detached mode.

### Installing Dependencies

With the database operational, proceed to install the project dependencies:

```bash
npm i
```

### Running the Application

To launch the NestJS application in development mode, which enables hot-reloading, run:

```bash
npm run start:dev
```

This command fires up the server and watches for any changes to your source files, reloading the application as needed.

## Additional Information

- For database management and visualization through Prisma Studio, execute `npx prisma studio`.
- Consult the official documentation for [NestJS](https://docs.nestjs.com/), [Prisma](https://www.prisma.io/docs/), and [PostgreSQL](https://www.postgresql.org/docs/) for more detailed information and further customization options.
