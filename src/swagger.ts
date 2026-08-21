import swaggerJsdoc from "swagger-jsdoc";

const options= {

  definition:{

    openapi: "3.0.0",

    info : {
      title:"Movie Ticket Booking System API",
      version: "1.0.0",

      description: "Movie Ticket Booking API",
    },

    servers:[

      {

        url:"http://localhost:3000",
      },
    ],
    tags: [

      {
        name: "Users",
        description: "User management and authentication operations",
      },
      {
        name: "Bookings",
        description: "Movie ticket booking operations",
      },
      {
       name: "Movies",
       description: "Movie management operations",
      },

    ],
    components : {

      securitySchemes: {
        bearerAuth: {
          type: "http",
          
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;