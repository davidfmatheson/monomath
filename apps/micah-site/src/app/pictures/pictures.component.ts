import { Component, signal } from '@angular/core';

import { RouterModule } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective,
} from '@coreui/angular';

export type Picture = {
  src: string;
  title?: string;
}

@Component({
  selector: 'app-pictures',
  standalone: true,
  imports: [
    ThemeDirective,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    RouterModule
],
  templateUrl: './pictures.component.html',
  styleUrl: './pictures.component.scss',
})
export class PicturesComponent {
  pictures = signal<Picture[]>([
    {
      src: "./assets/micah-baby.jpg",
      title: "Baby Micah"
    },
    {
      src: "./assets/micah-violin-2019-04-27.jpg",
      title: "Micah violin quartet"
    },
    {
      src: "./assets/micah-violin-2020-12-01.jpg",
      title: "Micah violin solo"
    },
    {
      src: "./assets/micah-frog-2021-06-01.jpg",
      title: "Micah catching frogs"
    },
    {
      src: "./assets/micah-alicia-2024-05-01.jpg",
      title: "Micah and Alicia"
    }
  ]);
}
