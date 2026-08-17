import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Ticket Booking System API",
      version: "1.0.0",
      description: "API for movie ticket booking system",
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
      schemas: {
        Booking: {
          type: "object",
          required: [
            "userId",
            "showtimeId",
            "seats",
            "numberOfSeats",
            "totalPrice",
          ],
          properties: {
            userId: {
              type: "string",
              example: "65f123456789abcdef123456",
            },
            showtimeId: {
              type: "string",
              example: "65f987654321abcdef654321",
            },
            seats: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["A1", "A2"],
            },
            numberOfSeats: {
              type: "integer",
              example: 2,
            },
            totalPrice: {
              type: "number",
              example: 20,
            },
            status: {
              type: "string",
              enum: ["pending", "confirmed", "cancelled"],
              example: "confirmed",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;