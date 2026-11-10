import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowRight,
  faCircleCheck,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { ImagePlaceholderComponent } from '../../../shared/image-placeholder.component';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, FaIconComponent, ImagePlaceholderComponent],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly icons = { faArrowRight, faCircleCheck, faUserTie };
  protected readonly highlights = [
    'Free, confidential initial consultation',
    'Rooted in Boston’s communities',
    'Plain-language advice, every step of the way',
  ];
}
