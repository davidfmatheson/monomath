import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export type Video = {
 src: string;
 url?: SafeResourceUrl;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    CommonModule,
    ThemeDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterModule,
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {
  sanitizer: DomSanitizer;

  videos = signal<Video[]>([
    {
      src: "https://www.youtube.com/embed/FwAiXk_aBI8?si=H6mfJajTeI5xbBh7"
    }
  ]);

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
    this.videos.update(values => {
      values.forEach(value => value.url = this.sanitizer.bypassSecurityTrustResourceUrl(value.src))
      return values;
    })
  }
}
