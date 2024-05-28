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

export type Picture = {
  src: string;
  title?: string;
}

@Component({
  selector: 'app-pictures',
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
      src: "./assets/micah-frog.jpg",
      title: "Micah catching frogs"
    },
    {
      src: "./assets/micah-alicia.jpg",
      title: "Micah and Alicia"
    }
  ]);
}
