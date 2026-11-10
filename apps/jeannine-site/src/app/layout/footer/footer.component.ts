import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { NAV_ITEMS, SITE_INFO } from '../../content/site-info';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FaIconComponent],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly site = SITE_INFO;
  protected readonly navItems = NAV_ITEMS;
  protected readonly icons = { faEnvelope, faLocationDot, faPhone };
  protected readonly year = new Date().getFullYear();
}
