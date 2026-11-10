import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { SITE_INFO } from '../../../content/site-info';
import { IntakeFormComponent } from '../../../intake/intake-form.component';

@Component({
  selector: 'app-contact',
  imports: [FaIconComponent, IntakeFormComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly site = SITE_INFO;
  protected readonly icons = { faClock, faEnvelope, faLocationDot, faPhone };
}
