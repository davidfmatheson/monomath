import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowUpRightFromSquare,
  faHandshake,
  faHeartPulse,
  faHospitalUser,
  faHouseMedical,
  faStethoscope,
} from '@fortawesome/free-solid-svg-icons';
import { ImagePlaceholderComponent } from '../../../shared/image-placeholder.component';

@Component({
  selector: 'app-medical-legal-partnership',
  imports: [RouterLink, FaIconComponent, ImagePlaceholderComponent],
  templateUrl: './medical-legal-partnership.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalLegalPartnershipComponent {
  protected readonly icons = { faArrowUpRightFromSquare, faHandshake };

  protected readonly benefits = [
    {
      icon: faHospitalUser,
      title: 'For patients & families',
      text: 'Legal help for the problems that make people sick (unsafe housing, denied benefits, utility shutoffs) delivered where they already receive care.',
    },
    {
      icon: faStethoscope,
      title: 'For clinicians',
      text: 'A trusted referral path when a patient’s health is being undermined by a legal problem a prescription can’t fix.',
    },
    {
      icon: faHouseMedical,
      title: 'For health systems',
      text: 'Fewer avoidable readmissions and emergency visits by addressing social drivers of health at their source.',
    },
    {
      icon: faHeartPulse,
      title: 'For communities',
      text: 'Patterns spotted in the clinic inform advocacy that improves conditions for everyone, not just one patient at a time.',
    },
  ];
}
