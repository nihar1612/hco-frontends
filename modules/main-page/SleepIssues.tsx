import { useState } from 'react';
import Image from 'next/image';
import imageWomanStretching from 'public/images/index_page/woman_stretching.png';
import QuestionnaireCTA from 'components/QuestionnaireCTA/QuestionnaireCTA';

interface SleepIssueOptionProps {
  onClick: () => void;
  isActive: boolean;
  text: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
}

function SleepIssueOption({ onClick, isActive, text, icon, iconActive }: SleepIssueOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-18 md:h-auto items-center justify-between rounded-full px-8 py-4 cursor-pointer ${
        isActive
          ? 'border md:border-1.5 border-gradient-bl-orange-purple-white border-transparent font-medium'
          : 'border border-dawnDark-200'
      }`}
    >
      <div className="text-base md:text-xl">{text}</div>
      <div className="ml-3">{isActive ? iconActive : icon}</div>
    </button>
  );
}

export default function SleepIssues() {
  const [activeIssues, setActiveIssues] = useState([]);
  function toggleIssue(issueId: string) {
    if (activeIssues.includes(issueId)) {
      setActiveIssues(activeIssues.filter((id) => id !== issueId));
    } else {
      setActiveIssues([...activeIssues, issueId]);
    }
  }
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center flex-1 xl:items-start xl:flex-row xl:space-x-32 max-w-7xl">
        <div className="relative hidden w-full h-108 xl:h-full xl:-ml-72 md:block">
          <Image src={imageWomanStretching} alt="Woman stretching in bed" layout="fill" objectFit="scale-down" />
        </div>
        <div className="relative w-full h-108 md:hidden">
          <Image src={imageWomanStretching} alt="Woman stretching in bed" layout="fill" objectFit="cover" />
        </div>

        <div className="mx-8 mt-10 xl:mb-32 xl:mx-0 xl:pr-0">
          <h3 className="text-3xl font-semibold leading-8 text-center md:text-5xl md:leading-tight xl:text-left whitespace-nowrap">
            What can we help with?
          </h3>
          <div className="flex flex-col mt-8 space-y-6">
            <SleepIssueOption
              isActive={activeIssues.includes('fall-asleep')}
              onClick={() => toggleIssue('fall-asleep')}
              text="Fall asleep more easily"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.0001 12.6666C29.1023 12.4844 28.1994 12.3226 27.2929 12.18L26.6667 4.66659C26.6667 4.66659 22.6667 3.33325 16.0001 3.33325C9.33342 3.33325 5.33341 4.66659 5.33341 4.66659L4.70729 12.18C3.8008 12.3226 2.8979 12.4844 2.00008 12.6666L0.666748 28.6666H1.67021L2.9339 13.5023C7.22787 12.687 11.6385 12.3333 16.0001 12.3333C20.3616 12.3333 24.7723 12.687 29.0663 13.5023L30.3299 28.6666H31.3334L30.0001 12.6666ZM6.27268 5.43696L5.72338 12.0285C7.43166 11.7875 9.15066 11.6135 10.8705 11.4998C10.9729 10.7925 11.2809 10.0695 11.7156 9.48492C12.2497 8.76665 13.0477 8.16661 14.0001 8.16661H18.0001C18.9526 8.16661 19.7506 8.76665 20.2847 9.48492C20.7194 10.0695 21.0274 10.7925 21.1297 11.4998C22.8496 11.6135 24.5685 11.7875 26.2768 12.0285L25.7275 5.43696L25.6852 5.42587C25.2288 5.30681 24.545 5.14569 23.6545 4.98379C21.8734 4.65995 19.2669 4.33325 16.0001 4.33325C12.7333 4.33325 10.1267 4.65995 8.34563 4.98379C7.45516 5.14569 6.77138 5.30681 6.315 5.42587L6.27268 5.43696ZM20.103 11.439C20.002 10.9739 19.7853 10.4892 19.4822 10.0816C19.0497 9.4999 18.5143 9.16661 18.0001 9.16661H14.0001C13.4859 9.16661 12.9506 9.4999 12.518 10.0816C12.215 10.4892 11.9982 10.9739 11.8972 11.439C13.2672 11.3674 14.6365 11.3333 16.0001 11.3333C17.3637 11.3333 18.733 11.3674 20.103 11.439ZM29.6668 22.8333H2.33346V23.8333H29.6668V22.8333Z"
                    fill="#19212C"
                  />
                </svg>
              }
              iconActive={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.0001 12.6666C29.1023 12.4844 28.1994 12.3226 27.2929 12.18L26.6667 4.66659C26.6667 4.66659 22.6667 3.33325 16.0001 3.33325C9.33342 3.33325 5.33341 4.66659 5.33341 4.66659L4.70729 12.18C3.8008 12.3226 2.8979 12.4844 2.00008 12.6666L0.666748 28.6666H2.17195L2.55389 24.0833H29.4463L29.8282 28.6666H31.3334L30.0001 12.6666ZM6.74135 5.83378L6.23092 11.9589C7.68749 11.7649 9.15114 11.619 10.6158 11.5171C10.7167 10.747 11.0477 9.96405 11.5149 9.33575C12.0744 8.58334 12.9381 7.91661 14.0001 7.91661H18.0001C19.0621 7.91661 19.9258 8.58334 20.4853 9.33575C20.9525 9.96405 21.2835 10.747 21.3845 11.5171C22.8491 11.619 24.3127 11.7649 25.7692 11.9589L25.2588 5.83378C24.8317 5.729 24.2636 5.60273 23.5651 5.47572C21.8101 5.15663 19.2336 4.83325 16.0001 4.83325C12.7665 4.83325 10.1901 5.15663 8.43508 5.47572C7.73652 5.60273 7.16847 5.729 6.74135 5.83378ZM19.8435 11.4259C19.7451 11.0188 19.5511 10.5932 19.2816 10.2308C18.8744 9.68321 18.4048 9.41661 18.0001 9.41661H14.0001C13.5955 9.41661 13.1258 9.68321 12.7186 10.2308C12.4492 10.5932 12.2551 11.0188 12.1567 11.4259C13.4401 11.3632 14.7226 11.3333 16.0001 11.3333C17.2776 11.3333 18.5601 11.3632 19.8435 11.4259ZM2.67889 22.5833L3.40051 13.9239C7.54161 13.1647 11.7915 12.8333 16.0001 12.8333C20.2086 12.8333 24.4586 13.1647 28.5997 13.9239L29.3213 22.5833H2.67889Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="31.3334"
                      y1="3.33325"
                      x2="12.8477"
                      y2="35.6371"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                  </defs>
                </svg>
              }
            />
            <SleepIssueOption
              isActive={activeIssues.includes('staying-asleep')}
              onClick={() => toggleIssue('staying-asleep')}
              text="Sleep through the night"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.6665 1.16675H29.4665L25.0665 7.03341L24.4665 7.83341H25.4665H31.3332V6.83341H26.4665L30.8665 0.966748L31.4665 0.166748H30.4665H24.6665V1.16675ZM21 6.5001H15V5.5001H22H23L22.4 6.3001L17 13.5001H23V14.5001H16H15L15.6 13.7001L21 6.5001ZM23.3333 23.7334C22.9222 23.887 22.508 24.0158 22.0924 24.1206C16.3749 25.5623 10.3842 22.4602 8.33325 16.8668C7.4892 14.6722 7.35757 12.2402 7.93837 9.97161C8.04568 9.55246 8.17731 9.1389 8.33325 8.73344C7.90598 8.88838 7.49359 9.06582 7.09689 9.26392C1.86107 11.8786 -0.640442 18.094 1.46659 23.7334C3.73325 29.8001 10.4666 32.8668 16.5333 30.6001C18.0666 30.0001 19.4666 29.0668 20.6666 27.9334C21.5482 27.0518 22.2499 26.0623 22.7981 24.9647C22.9961 24.5684 23.1741 24.1579 23.3333 23.7334ZM21.4879 25.2737C21.063 25.9776 20.56 26.6242 19.9695 27.2163C18.8551 28.2666 17.5682 29.1201 16.176 29.6661C10.6281 31.7345 4.47562 28.9298 2.40334 23.3834C0.580426 18.5045 2.52754 13.1651 6.7828 10.579C6.38111 12.7928 6.58587 15.1051 7.39707 17.2184C9.52686 23.0158 15.548 26.3439 21.4879 25.2737Z"
                    fill="#19212C"
                  />
                </svg>
              }
              iconActive={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <g clipPath="url(#clip0)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24.6665 1.41675H28.9665L24.8665 6.88341L23.9665 8.08341H25.4665H31.3332V6.58341H26.9665L31.0665 1.11675L31.9665 -0.083252H30.4665H24.6665V1.41675ZM20.5 6.7501H15V5.2501H22H23.5L22.6 6.4501L17.5 13.2501H23V14.7501H16H14.5L15.4 13.5501L20.5 6.7501ZM23.3333 23.7334C22.7185 23.9631 22.097 24.1373 21.474 24.2588C15.9486 25.3357 10.3103 22.2588 8.33325 16.8668C7.5655 14.8706 7.38719 12.678 7.79832 10.5906C7.92269 9.95912 8.101 9.33729 8.33325 8.73344C7.68245 8.96944 7.06617 9.25762 6.4873 9.59154C1.67001 12.3704 -0.556925 18.3176 1.46659 23.7334C3.73325 29.8001 10.4666 32.8668 16.5333 30.6001C18.0666 30.0001 19.4666 29.0668 20.6666 27.9334C21.3826 27.2174 21.9799 26.4302 22.4727 25.5718C22.8059 24.9916 23.0913 24.3788 23.3333 23.7334ZM19.621 26.8577C19.9176 26.5598 20.1912 26.2472 20.4431 25.9193C14.6522 26.4456 9.00929 23.0521 6.929 17.3942C6.22401 15.5561 5.95976 13.5742 6.13626 11.6283C2.72306 14.2593 1.2687 18.918 2.87171 23.2084C4.8468 28.4947 10.7088 31.1683 15.9974 29.199C17.319 28.6801 18.5493 27.8664 19.621 26.8577Z"
                      fill="url(#paint0_linear)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="31.9665"
                      y1="-0.0832506"
                      x2="7.01192"
                      y2="35.7308"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                    <clipPath id="clip0">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
            <SleepIssueOption
              isActive={activeIssues.includes('without-pills')}
              onClick={() => toggleIssue('without-pills')}
              text="Sleep without taking pills"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M26.8424 5.15786C29.718 8.03343 29.718 12.6532 26.8424 15.5288L15.5287 26.8425C12.6532 29.718 8.03339 29.718 5.15782 26.8425C2.28225 23.9669 2.28225 19.3471 5.15782 16.4716L16.4715 5.15786C19.3471 2.28229 23.9669 2.28229 26.8424 5.15786Z"
                      stroke="#19212C"
                      strokeMiterlimit="10"
                    />
                    <path d="M10.8147 10.8147L21.1856 21.1856" stroke="#19212C" strokeMiterlimit="10" />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
              iconActive={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <g clipPath="url(#clip0)">
                    <path
                      d="M26.8424 5.15786C29.718 8.03343 29.718 12.6532 26.8424 15.5288L15.5287 26.8425C12.6532 29.718 8.03339 29.718 5.15782 26.8425C2.28225 23.9669 2.28225 19.3471 5.15782 16.4716L16.4715 5.15786C19.3471 2.28229 23.9669 2.28229 26.8424 5.15786Z"
                      stroke="url(#paint0_linear)"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M10.8147 10.8147L21.1856 21.1856"
                      stroke="url(#paint1_linear)"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="32.0279"
                      y1="10.3433"
                      x2="3.01744"
                      y2="5.03027"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear"
                      x1="21.1856"
                      y1="21.1856"
                      x2="19.9349"
                      y2="22.3235"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF8F5B" />
                      <stop offset="1" stopColor="#536DE2" />
                    </linearGradient>
                    <clipPath id="clip0">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              }
            />
            <QuestionnaireCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
