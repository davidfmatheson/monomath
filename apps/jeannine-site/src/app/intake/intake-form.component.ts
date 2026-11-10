import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faLock,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { SITE_INFO } from '../content/site-info';
import { IntakeService } from './intake.service';

/** Accepts common US formats: 617-555-0100, (617) 555-0100, +1 617.555.0100 */
export const US_PHONE_PATTERN =
  /^(\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const ISSUE_MIN_LENGTH = 20;
export const ISSUE_MAX_LENGTH = 2000;

/** Many clients have a phone but no email (or the reverse); require either. */
export function contactMethodRequired(
  group: AbstractControl,
): ValidationErrors | null {
  const phone = String(group.get('phone')?.value ?? '').trim();
  const email = String(group.get('email')?.value ?? '').trim();
  return phone || email ? null : { contactMethodRequired: true };
}

type FieldName = 'name' | 'phone' | 'email' | 'issue' | 'acknowledged';

interface FieldError {
  field: FieldName | 'contact';
  message: string;
}

@Component({
  selector: 'app-intake-form',
  imports: [ReactiveFormsModule, FaIconComponent],
  templateUrl: './intake-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakeFormComponent {
  private readonly intakeService = inject(IntakeService);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly site = SITE_INFO;
  protected readonly icons = {
    faCircleCheck,
    faCircleExclamation,
    faLock,
    faPaperPlane,
  };
  protected readonly issueMaxLength = ISSUE_MAX_LENGTH;

  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(US_PHONE_PATTERN)]],
      email: ['', [Validators.email, Validators.maxLength(254)]],
      issue: [
        '',
        [
          Validators.required,
          Validators.minLength(ISSUE_MIN_LENGTH),
          Validators.maxLength(ISSUE_MAX_LENGTH),
        ],
      ],
      acknowledged: [false, Validators.requiredTrue],
    },
    { validators: contactMethodRequired },
  );

  protected readonly status = signal<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  /** Errors captured at the last failed submit, shown in the summary. */
  protected readonly errorSummary = signal<FieldError[]>([]);
  private readonly submitAttempted = signal(false);

  private readonly summaryRef =
    viewChild<ElementRef<HTMLElement>>('errorSummaryBox');
  private readonly successRef = viewChild<ElementRef<HTMLElement>>('success');

  /** Error to show beneath a field, once the user has interacted with it. */
  protected errorFor(field: FieldName): string | null {
    const control = this.form.controls[field];
    if (!control.invalid || !(control.touched || this.submitAttempted())) {
      return null;
    }
    return this.messageFor(field, control.errors ?? {});
  }

  /** Group-level "phone or email" error, shown under the contact fieldset. */
  protected contactError(): string | null {
    const { phone, email } = this.form.controls;
    const interacted =
      (phone.touched && email.touched) || this.submitAttempted();
    return interacted && this.form.hasError('contactMethodRequired')
      ? 'Please enter a phone number or an email address so we can reach you.'
      : null;
  }

  protected async submit(): Promise<void> {
    if (this.status() === 'submitting') return;
    this.submitAttempted.set(true);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.errorSummary.set(this.collectErrors());
      this.focusAfterRender(() => this.summaryRef()?.nativeElement);
      return;
    }

    this.errorSummary.set([]);
    this.status.set('submitting');
    try {
      const { name, phone, email, issue } = this.form.getRawValue();
      await this.intakeService.submit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        issue: issue.trim(),
      });
      this.status.set('success');
      this.form.reset();
      this.submitAttempted.set(false);
      this.focusAfterRender(() => this.successRef()?.nativeElement);
    } catch {
      this.status.set('error');
    }
  }

  protected focusField(event: Event, field: FieldError['field']): void {
    event.preventDefault();
    const id = field === 'contact' ? 'intake-phone' : `intake-${field}`;
    this.host.nativeElement.querySelector<HTMLElement>(`#${id}`)?.focus();
  }

  protected startOver(): void {
    this.status.set('idle');
  }

  private collectErrors(): FieldError[] {
    const errors: FieldError[] = [];
    const fields: FieldName[] = ['name', 'phone', 'email', 'issue', 'acknowledged'];
    for (const field of fields) {
      const control = this.form.controls[field];
      if (control.invalid) {
        errors.push({ field, message: this.messageFor(field, control.errors ?? {}) });
      }
      if (field === 'email' && this.form.hasError('contactMethodRequired')) {
        errors.push({ field: 'contact', message: 'Enter a phone number or an email address.' });
      }
    }
    return errors;
  }

  private messageFor(field: FieldName, errors: ValidationErrors): string {
    switch (field) {
      case 'name':
        return errors['required']
          ? 'Please enter your name.'
          : 'Please shorten your name to 100 characters or fewer.';
      case 'phone':
        return 'Please enter a valid U.S. phone number, such as (617) 555-0100.';
      case 'email':
        return errors['maxlength']
          ? 'Please enter a shorter email address.'
          : 'Please enter a valid email address, such as name@example.com.';
      case 'issue':
        if (errors['required']) return 'Please briefly describe your legal issue.';
        if (errors['minlength'])
          return `Please add a little more detail (at least ${ISSUE_MIN_LENGTH} characters).`;
        return `Please shorten your description to ${ISSUE_MAX_LENGTH} characters or fewer.`;
      case 'acknowledged':
        return 'Please confirm that you have read the confidentiality notice.';
    }
  }

  private focusAfterRender(target: () => HTMLElement | undefined): void {
    afterNextRender(() => target()?.focus(), { injector: this.injector });
  }
}
