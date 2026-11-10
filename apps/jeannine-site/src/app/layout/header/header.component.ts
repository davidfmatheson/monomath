import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faScaleBalanced, faXmark } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { NAV_ITEMS, SITE_INFO } from '../../content/site-info';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class HeaderComponent {
  protected readonly site = SITE_INFO;
  protected readonly navItems = NAV_ITEMS;
  protected readonly icons = { faBars, faXmark, faScaleBalanced };
  protected readonly menuOpen = signal(false);

  private readonly menuButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (returnFocus) {
      this.menuButton().nativeElement.focus();
    }
  }
}
