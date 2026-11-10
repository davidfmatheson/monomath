import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" aria-labelledby="not-found-heading">
      <div class="container-page max-w-2xl text-center">
        <p class="eyebrow">404</p>
        <h1 id="not-found-heading" class="mt-3 text-4xl font-bold">Page not found</h1>
        <p class="mt-4 text-lg">Sorry, we couldn’t find the page you were looking for.</p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a routerLink="/" class="btn btn-primary">Go to the home page</a>
          <a routerLink="/" fragment="contact" class="btn btn-outline">Contact Jeannine</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundPageComponent {}
