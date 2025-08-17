import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgendUni",
      version: "1.0.0",
      description: "",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        UserPostRequest: {
          type: "object",
          properties: {
            nome: {type: "string", example: "Sara"},
            email: {type: "string", example: "sara@gmail.com"},
            senha: {type: "string", example: "12345678Sara!"},
          },
          required: ["nome", "email", "senha"],
        },
        UserPutRequest: {
          type: "object",
          properties: {
            nome: {type: "string", example: "Sara"},
            email: {type: "string", example: "sara@gmail.com"},
            senha: {type: "string", example: "12345678Sara!"},
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            nome: {type: "string", example: "Sara"},
            email: {type: "string", example: "sara@gmail.com"},
            senha: {type: "string", example: "12345678Sara!"},
          },
        },
      },
    }
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const theme = new SwaggerTheme();
const swaggerOptions = {
  explorer: true,
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
}
