/**
 * Practice-wide facts shown in the header, footer, and contact section.
 *
 * TODO(content): replace every placeholder below with real details before
 * launch. The 555-01xx number is a reserved fictional range.
 */
export const SITE_INFO = {
  attorneyName: 'Jeannine Casselman',
  title: 'Public Interest Attorney',
  phone: {
    display: '(617) 555-0100',
    href: 'tel:+16175550100',
  },
  email: 'contact@example.com',
  address: {
    street: '100 Placeholder Street, Suite 000',
    city: 'Boston',
    state: 'MA',
    zip: '02108',
  },
  officeHours: 'Monday–Friday, 9:00 a.m.–5:00 p.m.',
} as const;

export interface NavItem {
  label: string;
  /** In-page section id on the home page. */
  fragment: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', fragment: 'home' },
  { label: 'About', fragment: 'about' },
  { label: 'Activism', fragment: 'activism' },
  { label: 'Medical-Legal Partnership', fragment: 'medical-legal-partnership' },
  { label: 'Leveraging AI', fragment: 'leveraging-ai' },
  { label: 'Contact', fragment: 'contact' },
];
