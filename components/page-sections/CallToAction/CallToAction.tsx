import { Gradient } from 'components/Gradient';
import Footer from 'components/Footer/Footer';
import QuestionnaireCTA from 'components/QuestionnaireCTA/QuestionnaireCTA';

interface CallToActionProps {
  title: string;
  text: string;
  buttonText?: string;
}

export function CallToAction({ title, text }: CallToActionProps) {
  return (
    <div className="overflow-hidden text-white bg-dawnDark-700">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={7} opacity={0.15} left="-50rem" />
        <Gradient color="orange" scale={8} opacity={0.15} left="-60rem" top="10rem" />
        <Gradient color="purple" scale={7} opacity={0.1} right="-55rem" top="0" />
        <Gradient color="orange" scale={7} opacity={0.12} right="-47rem" top="3rem" />
      </div>
      <div className="relative">
        <section className="flex justify-center py-22 md:py-24">
          <div className="w-full max-w-4xl mx-6">
            <h2 className="text-5xl leading-14 font-semibold md:text-5.5xl md:leading-18 text-center">{title}</h2>
            <p className="mt-4 mx-auto max-w-1.5xl text-base leading-6 text-center md:text-xl md:leading-8">{text}</p>
            <div className="flex justify-center mt-7">
              <QuestionnaireCTA />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
