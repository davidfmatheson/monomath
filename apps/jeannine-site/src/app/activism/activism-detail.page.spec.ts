import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ACTIVISM_INITIATIVES } from '../content/activism';
import { ActivismDetailPageComponent } from './activism-detail.page';

describe('ActivismDetailPageComponent', () => {
  async function render(slug: string) {
    await TestBed.configureTestingModule({
      imports: [ActivismDetailPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(ActivismDetailPageComponent);
    fixture.componentRef.setInput('slug', slug);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders the initiative and links to the others', async () => {
    const [first, ...rest] = ACTIVISM_INITIATIVES;
    const el = await render(first.slug);

    expect(el.querySelector('h1')?.textContent).toContain(first.title);
    expect(el.textContent).toContain('How you can help');
    const otherLinks = el.querySelectorAll('nav[aria-labelledby="other-initiatives-heading"] a');
    expect(otherLinks).toHaveLength(rest.length);
    expect(TestBed.inject(Title).getTitle()).toContain(first.title);
  });

  it('shows a helpful message for an unknown initiative', async () => {
    const el = await render('does-not-exist');
    expect(el.querySelector('h1')?.textContent).toContain('couldn’t find that initiative');
  });
});
