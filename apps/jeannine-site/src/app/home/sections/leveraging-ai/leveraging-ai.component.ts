import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCalendarCheck,
  faFileContract,
  faLanguage,
  faListCheck,
  faMagnifyingGlassChart,
  faShieldHalved,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-leveraging-ai',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './leveraging-ai.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeveragingAiComponent {
  protected readonly icons = { faCalendarCheck, faShieldHalved, faUserCheck };

  protected readonly examples = [
    {
      icon: faFileContract,
      title: 'Faster document review',
      text: 'AI tools help organize leases, medical records, and agency notices so key facts and deadlines surface in hours, not weeks.',
    },
    {
      icon: faMagnifyingGlassChart,
      title: 'Deeper legal research',
      text: 'Research assistants help find relevant statutes and case law quickly, leaving more time for strategy and for you.',
    },
    {
      icon: faLanguage,
      title: 'Plain-language communication',
      text: 'Complex legal documents can be summarized clearly, and translated drafts help clients follow their case in their own language.',
    },
    {
      icon: faListCheck,
      title: 'Smarter intake & follow-up',
      text: 'Streamlined intake means faster responses, fewer missed deadlines, and more of your matter’s budget spent on advocacy.',
    },
  ];

  // TODO(content): confirm these commitments reflect Jeannine's actual practices.
  protected readonly safeguards = [
    {
      icon: faUserCheck,
      text: 'Every AI-assisted work product is reviewed and approved by Jeannine personally.',
    },
    {
      icon: faShieldHalved,
      text: 'Confidential client information is never entered into public AI tools.',
    },
  ];
}
