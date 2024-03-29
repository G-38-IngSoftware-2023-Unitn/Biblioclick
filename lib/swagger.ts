import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BiblioClick API Documentation',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          UserTokenAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'token'
          },
          LoggedInAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'isLoggedIn'
          },
          LibrarianTokenAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'librarianToken'
          },
        },
      },
      security: [],
    },
  });
  return spec;
};