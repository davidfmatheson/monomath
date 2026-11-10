import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import {
  contactMethodRequired,
  IntakeFormComponent,
  US_PHONE_PATTERN,
} from './intake-form.component';
import { IntakeService } from './intake.service';

describe('IntakeFormComponent', () => {
  let submitSpy: jest.Mock;

  async function setup() {
    submitSpy = jest.fn().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [IntakeFormComponent],
      providers: [{ provide: IntakeService, useValue: { submit: submitSpy } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(IntakeFormComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const input = (id: string) => {
      const field = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`);
      if (!field) throw new Error(`missing #${id}`);
      return field;
    };
    const type = (id: string, value: string) => {
      const field = input(id);
      field.value = value;
      field.dispatchEvent(new Event('input'));
      field.dispatchEvent(new Event('blur'));
    };
    const submit = async () => {
      el.querySelector<HTMLButtonElement>('button[type="submit"]')?.click();
      await fixture.whenStable();
    };
    const fillValid = () => {
      type('intake-name', 'Pat Example');
      type('intake-phone', '(617) 555-0100');
      type('intake-issue', 'My landlord has not fixed the heat for three weeks.');
      input('intake-acknowledged').click();
    };
    return { fixture, el, input, type, submit, fillValid };
  }

  afterEach(() => jest.restoreAllMocks());

  it('labels every field', async () => {
    const { el } = await setup();
    for (const id of ['intake-name', 'intake-phone', 'intake-email', 'intake-issue', 'intake-acknowledged']) {
      expect(el.querySelector(`label[for="${id}"]`)).not.toBeNull();
    }
  });

  it('does not submit an empty form, and shows a focused error summary', async () => {
    const { el, submit } = await setup();
    await submit();

    expect(submitSpy).not.toHaveBeenCalled();
    const summary = el.querySelector<HTMLElement>('[role="alert"]');
    expect(summary?.textContent).toContain('Please enter your name.');
    expect(summary?.textContent).toContain('Enter a phone number or an email address.');
    expect(summary?.textContent).toContain('Please briefly describe your legal issue.');
    expect(summary?.textContent).toContain('confidentiality notice');
    expect(document.activeElement).toBe(summary);
  });

  it('marks invalid fields with aria-invalid and links their error message', async () => {
    const { el, type, fixture } = await setup();
    type('intake-email', 'not-an-email');
    await fixture.whenStable();

    const email = el.querySelector('#intake-email');
    expect(email?.getAttribute('aria-invalid')).toBe('true');
    expect(email?.getAttribute('aria-describedby')).toBe('intake-email-error');
    expect(el.querySelector('#intake-email-error')?.textContent).toContain('valid email');
  });

  it('accepts email instead of phone as the contact method', async () => {
    const { type, input, submit } = await setup();
    type('intake-name', 'Pat Example');
    type('intake-email', 'pat@example.com');
    type('intake-issue', 'I received a notice to quit from my landlord yesterday.');
    input('intake-acknowledged').click();
    await submit();

    expect(submitSpy).toHaveBeenCalledWith({
      name: 'Pat Example',
      phone: '',
      email: 'pat@example.com',
      issue: 'I received a notice to quit from my landlord yesterday.',
    });
  });

  it('submits a valid form and shows a focused confirmation', async () => {
    const { el, fillValid, submit } = await setup();
    fillValid();
    await submit();

    expect(submitSpy).toHaveBeenCalledTimes(1);
    const confirmation = el.querySelector<HTMLElement>('[role="status"]');
    expect(confirmation?.textContent).toContain('Your request has been received');
    expect(document.activeElement).toBe(confirmation);
    expect(el.querySelector('form')).toBeNull();
  });

  it('shows an error and keeps the form when sending fails', async () => {
    const { el, fillValid, submit } = await setup();
    submitSpy.mockRejectedValueOnce(new Error('network'));
    fillValid();
    await submit();

    expect(el.querySelector('form')).not.toBeNull();
    expect(el.textContent).toContain('your request was not sent');
    expect((el.querySelector('#intake-name') as HTMLInputElement).value).toBe('Pat Example');
  });
});

describe('intake validators', () => {
  it.each(['617-555-0100', '(617) 555-0100', '+1 617.555.0100', '6175550100'])(
    'accepts phone %s',
    (phone) => expect(US_PHONE_PATTERN.test(phone)).toBe(true),
  );

  it.each(['555-0100', 'call me', '617-555-01000'])('rejects phone %s', (phone) =>
    expect(US_PHONE_PATTERN.test(phone)).toBe(false),
  );

  it('requires a phone or an email', () => {
    const group = new FormGroup({
      phone: new FormControl('  '),
      email: new FormControl(''),
    });
    expect(contactMethodRequired(group)).toEqual({ contactMethodRequired: true });
    group.controls.email.setValue('a@b.co');
    expect(contactMethodRequired(group)).toBeNull();
  });
});
