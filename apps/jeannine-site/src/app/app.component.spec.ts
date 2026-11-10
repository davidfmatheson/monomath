import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the skip link, header landmark, main region, and footer', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('a[href="#main"]')?.textContent).toContain(
      'Skip to main content',
    );
    expect(el.querySelector('header')).not.toBeNull();
    expect(el.querySelector('main#main')).not.toBeNull();
    expect(el.querySelector('footer')?.textContent).toContain(
      'Attorney Advertising',
    );
  });

  it('moves focus to main content when the skip link is activated', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const main = el.querySelector<HTMLElement>('main#main');
    if (main) main.scrollIntoView = jest.fn();

    el.querySelector<HTMLAnchorElement>('a[href="#main"]')?.click();

    expect(document.activeElement).toBe(main);
  });
});
