import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';

export type Video = {
 id: string;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    YouTubePlayer,
    RouterModule
],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {
  videos = signal<Video[]>([
    {
      id: "qvhaLPXpHHU"
    },
    {
      id: "MYKdYDCofaw"
    },
    {
      id: "NWQp4YGj9R4"
    },
    {
      id: "heBtkPJi5ig"
    },
    {
      id: "KCWwhZN-qE0"
    },
    {
      id: "FwAiXk_aBI8"
    },
    {
      id: "buUSSYugOkw"
    },
    {
      id: "hOKP003yxBs"
    }
  ]);
}
