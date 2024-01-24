import Image from 'next/image';
import { Gradient } from 'components/Gradient';
import teamMemberRahulShivkumar from 'public/images/our_team/rahul_shivkumar.jpg';
import teamMemberAndreasMeistad from 'public/images/our_team/andreas_meistad.jpg';
import teamMemberVarunKrishnamurthy from 'public/images/our_team/varun_krishnamurthy.jpg';
import teamMemberAmandaXaypraseuth from 'public/images/our_team/amanda_xaypraseuth.jpg';
import teamMemberFaizanMinhas from 'public/images/our_team/faizan_minhas.jpg';
import teamMemberColleenEhrnstrom from 'public/images/our_team/colleen_ehrnstrom.jpg';
import teamMemberKristenCasey from 'public/images/our_team/kristen_casey.jpg';

interface TeamMemberProps {
  image: StaticImageData;
  name: string;
  title: string;
}
function TeamMember({ image, name, title }: TeamMemberProps) {
  return (
    <div className="md:w-56">
      <div className="mx-auto overflow-hidden rounded-full w-28 h-28">
        <Image src={image} alt={`${name} profile picture`} />
      </div>
      <div className="mt-5 text-base text-center md:text-xl md:leading-8">
        <div>{name}</div>
        <div className="font-inter text-dawnDark-200">{title}</div>
      </div>
    </div>
  );
}

export function OurTeam() {
  return (
    <section className="overflow-hidden bg-dawnDark-700 py-22 md:py-30">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={6} opacity={0.15} left="-40rem" top="-15rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-60rem" top="-10rem" />
        <Gradient color="purple" scale={5} opacity={0.15} right="-30rem" top="-10rem" />
        <Gradient color="orange" scale={5} opacity={0.1} right="-40rem" top="-10rem" />
      </div>
      <div className="relative flex justify-center">
        <div className="max-w-6xl mx-8 text-white">
          <h2 className="md:text-5xl md:leading-14 font-semibold text-2.5xl leading-8 text-center">Our Team</h2>
          <div className="mt-12 space-y-10 md:mt-14 md:space-y-14">
            <div className="flex justify-center">
              <div className="flex flex-col space-y-10 md:flex-row md:space-x-14 md:space-y-0">
                <TeamMember image={teamMemberRahulShivkumar} name="Rahul Shivkumar" title="Co-Founder" />
                <TeamMember image={teamMemberAndreasMeistad} name="Andreas Meistad" title="Co-Founder" />
                <TeamMember image={teamMemberVarunKrishnamurthy} name="Varun Krishnamurthy" title="Co-Founder" />
              </div>
            </div>
            <div className="flex flex-col space-y-10 md:flex-row md:space-x-14 md:space-y-0">
              <TeamMember image={teamMemberAmandaXaypraseuth} name="Amanda Xaypraseuth" title="Founding Designer" />
              <TeamMember image={teamMemberFaizanMinhas} name="Faizan Minhas" title="Founding Engineer" />
              <TeamMember image={teamMemberColleenEhrnstrom} name="Dr. Colleen Ehrnstrom" title="Clinical Advisor" />
              <TeamMember image={teamMemberKristenCasey} name="Dr. Kristen Casey" title="Clinical Advisor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
