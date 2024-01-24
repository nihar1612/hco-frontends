import { Link } from 'components/Link';
import { Gradient } from 'components/Gradient';

interface HowDawnWorksListItemProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

function HowDawnWorksListItem({ title, text, icon }: HowDawnWorksListItemProps) {
  return (
    <div>
      <div className="md:flex">{icon}</div>
      <h3 className="mt-6 text-base font-semibold leading-6 md:text-xl md:leading-8">{title}</h3>
      <p className="mt-2 text-base leading-6 font-inter md:text-xl md:leading-8">{text}</p>
    </div>
  );
}

export function HowDawnWorks({ title, showCallToAction }: { title: string; showCallToAction: boolean }) {
  return (
    <div className="overflow-hidden bg-dawnDark-700">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={7} opacity={0.25} left="-50rem" top="-20rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-60rem" top="-1rem" />
        <Gradient color="purple" scale={7} opacity={0.15} right="-50rem" top="0" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-40rem" top="-2rem" />
      </div>
      <section className="relative flex justify-center overflow-hidden text-white" id="how-dawn-works">
        <div className="mx-8 max-w-7xl py-22 md:py-30">
          <h2 className="text-center text-2.5xl leading-8 md:text-5xl md:leading-14 font-semibold">{title}</h2>
          <div className="grid mt-10 space-y-10 md:space-y-0 md:grid-cols-4 md:gap-x-20">
            <HowDawnWorksListItem
              title="Complete Questionnaire"
              text="Complete our 5 minute questionnaire to see if you are a fit for our sleep program."
              icon={
                <svg className="w-10 md:w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_907_1356)" />
                  <path
                    d="M19.7625 30.684H28.6305V33H19.7625V30.684ZM25.8705 15.264V33H22.7265V18.324C22.6385 18.404 22.4265 18.512 22.0905 18.648C21.7545 18.776 21.3465 18.9 20.8665 19.02C20.3945 19.132 19.8985 19.212 19.3785 19.26V16.692C19.8985 16.628 20.3945 16.516 20.8665 16.356C21.3465 16.196 21.7585 16.02 22.1025 15.828C22.4465 15.628 22.6745 15.44 22.7865 15.264H25.8705Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_907_1356"
                      x1="48"
                      y1="1.99889e-06"
                      x2="9.96692"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
            />
            <HowDawnWorksListItem
              title="Meet your Sleep Coach"
              text="Download the Dawn app, get introduced to your sleep coach, and work 1:1 with them."
              icon={
                <svg className="w-10 md:w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_907_1353)" />
                  <path
                    d="M18.2025 33V30.372C18.2665 30.14 18.4665 29.832 18.8025 29.448C19.1465 29.056 19.5625 28.628 20.0505 28.164C20.5465 27.7 21.0625 27.232 21.5985 26.76C22.1345 26.288 22.6345 25.852 23.0985 25.452C23.6585 24.964 24.2065 24.456 24.7425 23.928C25.2785 23.4 25.7225 22.844 26.0745 22.26C26.4265 21.676 26.6025 21.056 26.6025 20.4C26.6025 19.528 26.3945 18.844 25.9785 18.348C25.5625 17.844 24.9265 17.592 24.0705 17.592C23.3745 17.592 22.8225 17.744 22.4145 18.048C22.0065 18.344 21.7145 18.76 21.5385 19.296C21.3625 19.832 21.2745 20.456 21.2745 21.168H18.0945C18.0945 19.928 18.3225 18.852 18.7785 17.94C19.2345 17.02 19.9105 16.308 20.8065 15.804C21.7025 15.3 22.8025 15.048 24.1065 15.048C25.3625 15.048 26.4105 15.284 27.2505 15.756C28.0905 16.22 28.7185 16.86 29.1345 17.676C29.5585 18.484 29.7705 19.4 29.7705 20.424C29.7705 21.12 29.6385 21.776 29.3745 22.392C29.1185 23 28.7825 23.568 28.3665 24.096C27.9505 24.624 27.5065 25.108 27.0345 25.548C26.5625 25.988 26.1105 26.388 25.6785 26.748C24.9745 27.324 24.3465 27.856 23.7945 28.344C23.2505 28.824 22.8065 29.244 22.4625 29.604C22.1265 29.964 21.9185 30.26 21.8385 30.492H29.7465V33H18.2025Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_907_1353"
                      x1="48"
                      y1="1.99889e-06"
                      x2="9.96692"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
            />
            <HowDawnWorksListItem
              title="Begin the Program"
              text="Identify harmful sleep efforts and get recommended behavioral changes from your coach."
              icon={
                <svg className="w-10 md:w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_907_1347)" />
                  <path
                    d="M26.6265 23.676C27.3305 23.7 27.9185 23.896 28.3905 24.264C28.8705 24.632 29.2345 25.124 29.4825 25.74C29.7305 26.348 29.8545 27.028 29.8545 27.78C29.8545 28.78 29.6505 29.696 29.2425 30.528C28.8425 31.36 28.2185 32.024 27.3705 32.52C26.5225 33.016 25.4385 33.264 24.1185 33.264C22.9985 33.264 22.0625 33.12 21.3105 32.832C20.5585 32.536 19.9585 32.124 19.5105 31.596C19.0625 31.06 18.7385 30.436 18.5385 29.724C18.3385 29.012 18.2385 28.244 18.2385 27.42C18.2385 27.412 18.2385 27.404 18.2385 27.396C18.2385 27.388 18.2385 27.38 18.2385 27.372H21.4065C21.4065 27.38 21.4065 27.388 21.4065 27.396C21.4065 27.404 21.4065 27.412 21.4065 27.42C21.4065 28.292 21.5185 28.968 21.7425 29.448C21.9665 29.928 22.2825 30.264 22.6905 30.456C23.0985 30.648 23.5865 30.744 24.1545 30.744C24.9145 30.744 25.5225 30.504 25.9785 30.024C26.4425 29.536 26.6745 28.76 26.6745 27.696C26.6745 27.288 26.6305 26.916 26.5425 26.58C26.4545 26.236 26.3025 25.944 26.0865 25.704C25.8785 25.456 25.5945 25.264 25.2345 25.128C24.8745 24.992 24.4185 24.924 23.8665 24.924H23.2425V22.62H23.8665C24.4105 22.62 24.8625 22.548 25.2225 22.404C25.5825 22.26 25.8665 22.068 26.0745 21.828C26.2905 21.58 26.4425 21.3 26.5305 20.988C26.6265 20.676 26.6745 20.352 26.6745 20.016C26.6745 19.168 26.4465 18.552 25.9905 18.168C25.5425 17.784 24.9465 17.592 24.2025 17.592C23.3785 17.592 22.7065 17.816 22.1865 18.264C21.6665 18.712 21.4065 19.52 21.4065 20.688H18.2385C18.2385 19.904 18.3505 19.172 18.5745 18.492C18.8065 17.812 19.1585 17.216 19.6305 16.704C20.1025 16.184 20.7105 15.78 21.4545 15.492C22.2065 15.196 23.1025 15.048 24.1425 15.048C25.4705 15.048 26.5505 15.272 27.3825 15.72C28.2225 16.168 28.8425 16.76 29.2425 17.496C29.6505 18.224 29.8545 19.008 29.8545 19.848C29.8545 20.52 29.7305 21.14 29.4825 21.708C29.2345 22.276 28.8705 22.74 28.3905 23.1C27.9185 23.452 27.3305 23.644 26.6265 23.676Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_907_1347"
                      x1="48"
                      y1="1.99889e-06"
                      x2="9.96692"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
            />
            <HowDawnWorksListItem
              title="Receive Ongoing Care"
              text="Our coaches are available at any time to answer any questions and change your program regimen."
              icon={
                <svg className="w-10 md:w-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_907_1350)" />
                  <path
                    d="M25.0185 33V29.4H17.6505V27.132L23.9625 15.264H28.1025V26.94H30.3225V29.4H28.1025V33H25.0185ZM20.1225 28.368L19.2225 26.94H25.0185V17.316L25.7025 17.496L20.1225 28.368Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_907_1350"
                      x1="48"
                      y1="1.99889e-06"
                      x2="9.96692"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
            />
          </div>
          {showCallToAction && (
            <div className="flex justify-center mt-12 md:mt-16">
              <Link href="/questionnaire">
                <a className="z-10 flex items-center justify-center flex-1 max-w-md px-8 py-4 text-sm font-medium tracking-widest text-white uppercase rounded-full md:flex-none bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 md:py-6 md:text-base">
                  Get started
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
