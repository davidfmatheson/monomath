import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faGavel,
  faHandHoldingHeart,
  faPeopleGroup,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import { ImagePlaceholderComponent } from '../../../shared/image-placeholder.component';

@Component({
  selector: 'app-about',
  imports: [FaIconComponent, ImagePlaceholderComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly icons = { faPeopleGroup };

  // TODO(content): placeholder copy; confirm details with Jeannine.
  protected readonly pillars = [
    {
      icon: faGavel,
      title: 'Local court experience',
      text: 'Years of advocacy in Massachusetts courts, including housing, probate and family, and district court matters across Greater Boston.',
    },
    {
      icon: faHandHoldingHeart,
      title: 'Mission-driven',
      text: 'A practice built around access to justice, prioritizing people and communities too often left without a lawyer.',
    },
    {
      icon: faPeopleRoof,
      title: 'Community-rooted',
      text: 'A Boston neighbor who partners with clinics, schools, and community organizations to solve problems before they escalate.',
    },
  ];
}
