import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NAV_ITEMS } from '../../content/site-info';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(HeaderComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector<HTMLButtonElement>(
      'button[aria-controls="mobile-nav"]',
    );
    const mobileNav = el.querySelector<HTMLElement>('#mobile-nav');
    if (!toggle || !mobileNav) throw new Error('mobile nav not rendered');
    return { fixture, el, toggle, mobileNav };
  }

  it('renders every navigation item and the consultation CTA', async () => {
    const { el } = await setup();
    const desktopLinks = el.querySelectorAll('nav[aria-label="Main"]:not(#mobile-nav) a');
    expect(Array.from(desktopLinks).map((a) => a.textContent?.trim())).toEqual(
      NAV_ITEMS.map((item) => item.label),
    );
    expect(el.textContent).toContain('Book a Free Consultation');
  });

  it('toggles the mobile menu and keeps aria-expanded in sync', async () => {
    const { fixture, toggle, mobileNav } = await setup();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(mobileNav.hidden).toBe(true);

    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(mobileNav.hidden).toBe(false);
  });

  it('closes the mobile menu on Escape and returns focus to the toggle', async () => {
    const { fixture, toggle, mobileNav } = await setup();
    toggle.click();
    await fixture.whenStable();
    mobileNav.querySelector<HTMLAnchorElement>('a')?.focus();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });
});
