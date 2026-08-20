import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Movie Ticket Booking System API",
      version: "1.0.0",
      description: "Booking API",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    tags: [
      {
        name: "Bookings",
        description: "Movie ticket booking operations",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/bookingRoutes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;