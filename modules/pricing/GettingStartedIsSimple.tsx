import { Gradient } from 'components/Gradient';
import Link from 'next/link';

export function GettingStartedIsSimple() {
  return (
    <section className="overflow-hidden bg-dawnDark-700 py-22 md:py-30">
      <div className="relative hidden md:block">
        <Gradient color="purple" scale={6} opacity={0.15} left="-40rem" top="-15rem" />
        <Gradient color="orange" scale={7} opacity={0.15} left="-60rem" top="-10rem" />
        <Gradient color="purple" scale={5} opacity={0.15} right="-30rem" top="-10rem" />
        <Gradient color="orange" scale={5} opacity={0.1} right="-40rem" top="-10rem" />
      </div>
      <div className="relative flex justify-center space-y-22 md:space-y-30">
        <div className="mx-8 text-white">
          <h2 className="md:text-5xl md:leading-14 text-center font-semibold text-2.5xl leading-8">
            Getting started is simple
          </h2>
          <ul className="flex flex-col mt-10 space-y-10 max-w-7xl md:mt-16 md:flex-row md:space-y-0 md:space-x-20">
            <ListItem
              icon={
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24.333" cy="24" r="23.5" stroke="url(#paint0_linear_2585_1124)" />
                  <path
                    d="M20.0955 30.684H28.9635V33H20.0955V30.684ZM26.2035 15.264V33H23.0595V18.324C22.9715 18.404 22.7595 18.512 22.4235 18.648C22.0875 18.776 21.6795 18.9 21.1995 19.02C20.7275 19.132 20.2315 19.212 19.7115 19.26V16.692C20.2315 16.628 20.7275 16.516 21.1995 16.356C21.6795 16.196 22.0915 16.02 22.4355 15.828C22.7795 15.628 23.0075 15.44 23.1195 15.264H26.2035Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2585_1124"
                      x1="48.333"
                      y1="1.99889e-06"
                      x2="10.2999"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              title="Send us your insurance details"
              body="Confirm your in-network status by submitting your insurance information and creating a Dawn account."
            />
            <ListItem
              icon={
                <svg viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="23.5" stroke="url(#paint0_linear_2585_1132)" />
                  <path
                    d="M18.2025 33V30.372C18.2665 30.14 18.4665 29.832 18.8025 29.448C19.1465 29.056 19.5625 28.628 20.0505 28.164C20.5465 27.7 21.0625 27.232 21.5985 26.76C22.1345 26.288 22.6345 25.852 23.0985 25.452C23.6585 24.964 24.2065 24.456 24.7425 23.928C25.2785 23.4 25.7225 22.844 26.0745 22.26C26.4265 21.676 26.6025 21.056 26.6025 20.4C26.6025 19.528 26.3945 18.844 25.9785 18.348C25.5625 17.844 24.9265 17.592 24.0705 17.592C23.3745 17.592 22.8225 17.744 22.4145 18.048C22.0065 18.344 21.7145 18.76 21.5385 19.296C21.3625 19.832 21.2745 20.456 21.2745 21.168H18.0945C18.0945 19.928 18.3225 18.852 18.7785 17.94C19.2345 17.02 19.9105 16.308 20.8065 15.804C21.7025 15.3 22.8025 15.048 24.1065 15.048C25.3625 15.048 26.4105 15.284 27.2505 15.756C28.0905 16.22 28.7185 16.86 29.1345 17.676C29.5585 18.484 29.7705 19.4 29.7705 20.424C29.7705 21.12 29.6385 21.776 29.3745 22.392C29.1185 23 28.7825 23.568 28.3665 24.096C27.9505 24.624 27.5065 25.108 27.0345 25.548C26.5625 25.988 26.1105 26.388 25.6785 26.748C24.9745 27.324 24.3465 27.856 23.7945 28.344C23.2505 28.824 22.8065 29.244 22.4625 29.604C22.1265 29.964 21.9185 30.26 21.8385 30.492H29.7465V33H18.2025Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2585_1132"
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
              title="Get verified in 24 hours"
              body="Our care coordinators will confirm your in-network status, and walk you through any costs you can expect."
            />
            <ListItem
              icon={
                <svg viewBox="0 0 49 48" fill="none">
                  <circle cx="24.666" cy="24" r="23.5" stroke="url(#paint0_linear_2585_1140)" />
                  <path
                    d="M27.2925 23.676C27.9965 23.7 28.5845 23.896 29.0565 24.264C29.5365 24.632 29.9005 25.124 30.1485 25.74C30.3965 26.348 30.5205 27.028 30.5205 27.78C30.5205 28.78 30.3165 29.696 29.9085 30.528C29.5085 31.36 28.8845 32.024 28.0365 32.52C27.1885 33.016 26.1045 33.264 24.7845 33.264C23.6645 33.264 22.7285 33.12 21.9765 32.832C21.2245 32.536 20.6245 32.124 20.1765 31.596C19.7285 31.06 19.4045 30.436 19.2045 29.724C19.0045 29.012 18.9045 28.244 18.9045 27.42C18.9045 27.412 18.9045 27.404 18.9045 27.396C18.9045 27.388 18.9045 27.38 18.9045 27.372H22.0725C22.0725 27.38 22.0725 27.388 22.0725 27.396C22.0725 27.404 22.0725 27.412 22.0725 27.42C22.0725 28.292 22.1845 28.968 22.4085 29.448C22.6325 29.928 22.9485 30.264 23.3565 30.456C23.7645 30.648 24.2525 30.744 24.8205 30.744C25.5805 30.744 26.1885 30.504 26.6445 30.024C27.1085 29.536 27.3405 28.76 27.3405 27.696C27.3405 27.288 27.2965 26.916 27.2085 26.58C27.1205 26.236 26.9685 25.944 26.7525 25.704C26.5445 25.456 26.2605 25.264 25.9005 25.128C25.5405 24.992 25.0845 24.924 24.5325 24.924H23.9085V22.62H24.5325C25.0765 22.62 25.5285 22.548 25.8885 22.404C26.2485 22.26 26.5325 22.068 26.7405 21.828C26.9565 21.58 27.1085 21.3 27.1965 20.988C27.2925 20.676 27.3405 20.352 27.3405 20.016C27.3405 19.168 27.1125 18.552 26.6565 18.168C26.2085 17.784 25.6125 17.592 24.8685 17.592C24.0445 17.592 23.3725 17.816 22.8525 18.264C22.3325 18.712 22.0725 19.52 22.0725 20.688H18.9045C18.9045 19.904 19.0165 19.172 19.2405 18.492C19.4725 17.812 19.8245 17.216 20.2965 16.704C20.7685 16.184 21.3765 15.78 22.1205 15.492C22.8725 15.196 23.7685 15.048 24.8085 15.048C26.1365 15.048 27.2165 15.272 28.0485 15.72C28.8885 16.168 29.5085 16.76 29.9085 17.496C30.3165 18.224 30.5205 19.008 30.5205 19.848C30.5205 20.52 30.3965 21.14 30.1485 21.708C29.9005 22.276 29.5365 22.74 29.0565 23.1C28.5845 23.452 27.9965 23.644 27.2925 23.676Z"
                    fill="white"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2585_1140"
                      x1="48.666"
                      y1="1.99889e-06"
                      x2="10.6329"
                      y2="54.9043"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
              title="Start sleeping better"
              body="Our Care Team will pair you with a sleep coach who you’ll have unlimited messaging and weekly calls with."
            />
          </ul>
          <div className="flex justify-center mt-12 md:mt-16">
            <Link href="/questionnaire">
              <a className="flex items-center justify-center w-full max-w-md px-8 py-4 text-sm font-medium tracking-widest text-white uppercase rounded-full leading-0 md:w-auto bg-gradient-to-tr from-dawnOrange-500 to-dawnPurple-500 xl:py-6 md:text-base">
                Submit My Details
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
interface ListItemProps {
  icon: React.ReactNode;
  title: string;
  body: string;
}
function ListItem({ icon, title, body }: ListItemProps) {
  return (
    <li>
      <div className="w-10 h-10 md:w-12 md:h-12 md:mx-auto">{icon}</div>
      <div className="mt-6 text-base font-semibold md:text-center md:text-xl md:leading-8">{title}</div>
      <div className="mt-2 font-inter md:text-xl md:leading-8 md:text-center">{body}</div>
    </li>
  );
}
