import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ACTIVISM_INITIATIVES, findInitiative } from '../content/activism';
import { SITE_INFO } from '../content/site-info';

@Component({
  selector: 'app-activism-detail-page',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './activism-detail.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivismDetailPageComponent {
  /** Bound from the `:slug` route parameter. */
  readonly slug = input.required<string>();

  protected readonly initiative = computed(() => findInitiative(this.slug()));
  protected readonly others = computed(() =>
    ACTIVISM_INITIATIVES.filter((i) => i.slug !== this.slug()),
  );
  protected readonly icons = {
    faArrowLeft,
    faArrowUpRightFromSquare,
    faCircleCheck,
  };

  constructor() {
    const title = inject(Title);
    effect(() => {
      const initiative = this.initiative();
      title.setTitle(
        `${initiative?.title ?? 'Initiative not found'} | ${SITE_INFO.attorneyName}`,
      );
    });
  }
}
