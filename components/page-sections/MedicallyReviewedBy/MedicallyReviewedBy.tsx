import SanityImage from 'modules/sanity/SanityImage';
import { TeamMember } from 'types/sanity-schema-types';
import { PortableText } from 'components/PortableText';

export function MedicallyReviewedBy({ teamMember }: { teamMember: TeamMember }) {
  return (
    <section className="flex justify-center mx-8 py-22 md:py-30">
      <div className="max-w-xl">
        <h2 className="text-sm font-medium leading-4 tracking-widest text-center uppercase md:text-base text-dawnPurple-500">
          Medically reviewed by
        </h2>
        <div className="relative w-24 h-24 mx-auto mt-10 overflow-hidden rounded-full md:w-22 md:h-22">
          {teamMember.image ? (
            <SanityImage image={teamMember.image} />
          ) : (
            <svg className="stroke-current" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="mt-6 text-base font-bold leading-6 text-center md:text-xl md:leading-8">
          {teamMember.nameWithCredentials || teamMember.name}
        </div>
        <div className="mt-2 text-base leading-6 text-center font-inter md:text-xl md:leading-8">
          <PortableText blocks={teamMember.bio} />
        </div>
      </div>
    </section>
  );
}
