import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from './services/auth.service';

export const graphqlProvider: ApplicationConfig['providers'] = [
  provideHttpClient(),
  provideApollo(() => {
    const httpLink = inject(HttpLink);
    const authService = inject(AuthService);

    const authLink = setContext(async () => {
      const token = await authService.getAccessToken();
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    return {
      link: authLink.concat(httpLink.create({
        uri: 'https://api-manaledger.vercel.app/graphql',
        // uri: 'http://localhost:3000/graphql',
      })),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'all',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    };
  }),
];
