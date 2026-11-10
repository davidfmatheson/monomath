import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Jeannine Casselman | Public Interest Attorney in Boston, MA',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePageComponent),
  },
  {
    path: 'activism/:slug',
    loadComponent: () =>
      import('./activism/activism-detail.page').then(
        (m) => m.ActivismDetailPageComponent,
      ),
  },
  {
    path: '**',
    title: 'Page not found | Jeannine Casselman',
    loadComponent: () =>
      import('./not-found/not-found.page').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
