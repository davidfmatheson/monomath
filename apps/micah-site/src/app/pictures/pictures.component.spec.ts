import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicturesComponent } from './pictures.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PicturesComponent', () => {
  let component: PicturesComponent;
  let fixture: ComponentFixture<PicturesComponent>;
  let intersectionObserverMock: jest.Func;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesComponent, NoopAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    intersectionObserverMock = () => ({
      observe: () => null,
      unobserve: () => null
    });
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

    fixture = TestBed.createComponent(PicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
