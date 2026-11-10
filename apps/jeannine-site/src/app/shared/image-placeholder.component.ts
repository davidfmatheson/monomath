import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

/**
 * Stand-in for a photo or graphic that hasn't been supplied yet. It exposes
 * `label` as the image's accessible name, so swapping it for an
 * `<img [alt]="label">` later keeps the same meaning for screen readers.
 */
@Component({
  selector: 'app-image-placeholder',
  imports: [FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': 'label()',
    class:
      'flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-brand/25 bg-gradient-to-br from-brand-light to-gold-light p-6 text-center text-brand',
  },
  template: `
    <fa-icon [icon]="icon()" size="3x" class="opacity-60" />
    <span class="max-w-xs text-sm font-medium text-brand-dark/80" aria-hidden="true">
      {{ label() }}
    </span>
  `,
})
export class ImagePlaceholderComponent {
  readonly label = input.required<string>();
  readonly icon = input<IconDefinition>(faImage);
}
