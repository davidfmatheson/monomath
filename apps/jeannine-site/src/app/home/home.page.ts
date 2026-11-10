import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from './sections/about/about.component';
import { ActivismGridComponent } from './sections/activism-grid/activism-grid.component';
import { ContactComponent } from './sections/contact/contact.component';
import { HeroComponent } from './sections/hero/hero.component';
import { LeveragingAiComponent } from './sections/leveraging-ai/leveraging-ai.component';
import { MedicalLegalPartnershipComponent } from './sections/medical-legal-partnership/medical-legal-partnership.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    AboutComponent,
    ActivismGridComponent,
    MedicalLegalPartnershipComponent,
    LeveragingAiComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-activism-grid />
    <app-medical-legal-partnership />
    <app-leveraging-ai />
    <app-contact />
  `,
})
export class HomePageComponent {}
