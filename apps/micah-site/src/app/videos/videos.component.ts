import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { YouTubePlayer } from '@angular/youtube-player';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselIndicatorsComponent,
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
    CommonModule,
    ThemeDirective,
    CarouselComponent,
    CarouselIndicatorsComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    YouTubePlayer,
    RouterModule,
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
