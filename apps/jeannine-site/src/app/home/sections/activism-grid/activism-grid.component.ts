import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ACTIVISM_INITIATIVES } from '../../../content/activism';

@Component({
  selector: 'app-activism-grid',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './activism-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivismGridComponent {
  protected readonly initiatives = ACTIVISM_INITIATIVES;
  protected readonly faArrowRight = faArrowRight;
}
