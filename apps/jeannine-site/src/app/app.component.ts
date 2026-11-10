import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet, Scroll } from '@angular/router';
import { filter, skip } from 'rxjs';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    // Move keyboard/screen-reader focus to match what the router scrolled to,
    // so in-page navigation and route changes are announced and the next Tab
    // continues from the new location. Skip the initial page load.
    afterNextRender(() => {
      router.events
        .pipe(
          filter((event): event is Scroll => event instanceof Scroll),
          skip(1),
          takeUntilDestroyed(destroyRef),
        )
        .subscribe((event) => {
          // Wait a frame so lazy-loaded route content has rendered.
          requestAnimationFrame(() => {
            const target = event.anchor
              ? document.getElementById(event.anchor)
              : this.main().nativeElement;
            this.focusWithoutScroll(target);
          });
        });
    });
  }

  protected skipToMain(event: Event): void {
    event.preventDefault();
    const main = this.main().nativeElement;
    this.focusWithoutScroll(main);
    main.scrollIntoView();
  }

  private focusWithoutScroll(target: HTMLElement | null): void {
    if (!target) return;
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  }
}
