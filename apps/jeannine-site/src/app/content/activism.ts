import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBuildingColumns,
  faChalkboardUser,
  faChildReaching,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';

export interface ActivismInitiative {
  slug: string;
  title: string;
  icon: IconDefinition;
  /** One or two sentences for the card on the home page. */
  summary: string;
  /** Paragraphs for the detail page. */
  body: readonly string[];
  /** "How you can help" bullets on the detail page. */
  getInvolved: readonly string[];
  externalLink?: { label: string; href: string };
}

/**
 * TODO(content): this is placeholder copy written to show the layout.
 * Confirm the details of each initiative with Jeannine before launch.
 */
export const ACTIVISM_INITIATIVES: readonly ActivismInitiative[] = [
  {
    slug: 'aclu',
    title: 'Civil Liberties & the ACLU',
    icon: faBuildingColumns,
    summary:
      'Defending free speech, due process, and equal protection alongside the ACLU of Massachusetts.',
    body: [
      'Civil liberties are only as strong as our willingness to defend them. Jeannine supports the work of the ACLU of Massachusetts on issues including free expression, fair policing, and equal treatment under the law.',
      'That work ranges from helping community members understand their rights to supporting advocacy that holds institutions accountable when those rights are ignored.',
    ],
    getInvolved: [
      'Attend a know-your-rights workshop in your neighborhood.',
      'Report a potential civil liberties violation through the contact form.',
      'Volunteer or donate to support civil liberties advocacy in Massachusetts.',
    ],
    externalLink: {
      label: 'Visit the ACLU of Massachusetts',
      href: 'https://www.aclum.org',
    },
  },
  {
    slug: 'childhood-lead-action-project',
    title: 'Childhood Lead Action Project',
    icon: faChildReaching,
    summary:
      'Fighting childhood lead poisoning through tenant advocacy, enforcement of lead laws, and family education.',
    body: [
      'Lead poisoning is entirely preventable, yet it still harms children across older New England housing stock. Even low levels of exposure can cause lasting learning and behavioral challenges.',
      'Through the Childhood Lead Action Project, Jeannine works to enforce lead-safe housing laws, help families whose children have been exposed, and push for stronger protections so that no child is poisoned by the home they live in.',
    ],
    getInvolved: [
      'Ask your pediatrician about lead screening for children under six.',
      'Learn your rights as a tenant in a home built before 1978.',
      'Contact us if a landlord has not addressed a known lead hazard.',
    ],
  },
  {
    slug: 'affordable-housing',
    title: 'Affordable Housing & Tenant Rights',
    icon: faHouseChimney,
    summary:
      'Keeping families housed through eviction defense, habitability claims, and advocacy for affordable housing.',
    body: [
      'A stable home is the foundation for health, education, and opportunity. Greater Boston’s housing crisis puts that foundation out of reach for too many families.',
      'Jeannine advocates for tenants facing eviction or unsafe conditions and supports policy efforts that expand and preserve affordable housing in our communities.',
    ],
    getInvolved: [
      'Reach out early if you receive a notice to quit or court papers.',
      'Keep written records of repair requests and landlord communications.',
      'Support local efforts to preserve and build affordable housing.',
    ],
  },
  {
    slug: 'community-legal-education',
    title: 'Community Legal Education',
    icon: faChalkboardUser,
    summary:
      'Plain-language workshops that help neighbors understand their rights before a crisis begins.',
    body: [
      'Many legal problems become emergencies only because people did not know their rights in time. Community education changes that.',
      'Jeannine leads plain-language workshops with community organizations, libraries, and health centers on topics such as housing rights, public benefits, and planning for a family’s future.',
    ],
    getInvolved: [
      'Invite Jeannine to speak with your community group or organization.',
      'Share workshop announcements with neighbors who could benefit.',
      'Suggest a topic your community wants to learn about.',
    ],
  },
];

export function findInitiative(slug: string): ActivismInitiative | undefined {
  return ACTIVISM_INITIATIVES.find((initiative) => initiative.slug === slug);
}
