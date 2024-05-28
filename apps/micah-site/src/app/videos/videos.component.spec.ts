import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideosComponent } from './videos.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;
  let intersectionObserverMock: jest.Func;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosComponent, NoopAnimationsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    intersectionObserverMock = () => ({
      observe: () => null,
      unobserve: () => null
    });
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
