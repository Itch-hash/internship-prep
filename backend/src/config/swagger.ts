import swaggerjsdoc from "swagger-jsdoc";

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is undefined in the env var");
}

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Todo API built with Express and TypeScript",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerSpec = swaggerjsdoc(options);

export default swaggerSpec;
