import classNames from 'classnames';
import { Gradient } from 'components/Gradient';
import { Description } from 'modules/questionnaire/InfoPage/Description';

interface ChecklistProps {
  title: string;
  text: { [key: string]: any };
  gradient: boolean;
  checklists: { [key: string]: any }[];
}

export function ChecklistItem({ checklist }: { [key: string]: any }) {
  return (
    <div
      className={classNames('p-6 md:p-8 flex-1', {
        'bg-white bg-opacity-5 rounded-xl': checklist.highlighted,
      })}
    >
      {checklist.title && <h3 className="text-xl leading-6 text-center md:text-2xl md:leading-8">{checklist.title}</h3>}
      <ul className={classNames('flex flex-col space-y-8', {
        'mt-4': checklist.title, 
      })}>
        {checklist?.checklistItems &&
          checklist.checklistItems.map((checklistItem: any) => (
            <li key={checklistItem._key} className="flex text-base md:text-xl md:leading-8 font-inter">
              <div className="mr-4">
                {checklistItem.checked ? (
                  <svg className="mt-1 lg:mt-2" width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 7L7.5 13L17.5 1" stroke="#FF8F5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 mt-1" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.29303 5.29299C5.48056 5.10552 5.73487 5.0002 6.00003 5.0002C6.26519 5.0002 6.5195 5.10552 6.70703 5.29299L12 10.586L17.293 5.29299C17.3853 5.19748 17.4956 5.1213 17.6176 5.06889C17.7396 5.01648 17.8709 4.98889 18.0036 4.98774C18.1364 4.98659 18.2681 5.01189 18.391 5.06217C18.5139 5.11245 18.6255 5.1867 18.7194 5.28059C18.8133 5.37449 18.8876 5.48614 18.9379 5.60904C18.9881 5.73193 19.0134 5.86361 19.0123 5.99639C19.0111 6.12917 18.9835 6.26039 18.9311 6.38239C18.8787 6.5044 18.8025 6.61474 18.707 6.70699L13.414 12L18.707 17.293C18.8892 17.4816 18.99 17.7342 18.9877 17.9964C18.9854 18.2586 18.8803 18.5094 18.6948 18.6948C18.5094 18.8802 18.2586 18.9854 17.9964 18.9877C17.7342 18.9899 17.4816 18.8891 17.293 18.707L12 13.414L6.70703 18.707C6.51843 18.8891 6.26583 18.9899 6.00363 18.9877C5.74143 18.9854 5.49062 18.8802 5.30521 18.6948C5.1198 18.5094 5.01464 18.2586 5.01236 17.9964C5.01008 17.7342 5.11087 17.4816 5.29303 17.293L10.586 12L5.29303 6.70699C5.10556 6.51946 5.00024 6.26515 5.00024 5.99999C5.00024 5.73483 5.10556 5.48052 5.29303 5.29299Z"
                      fill="#BBBDC5"
                    />
                  </svg>
                )}
              </div>
              {checklistItem.text}
            </li>
          ))}
      </ul>
    </div>
  );
}

export function Checklist({ title, text, gradient, checklists }: ChecklistProps) {
  return (
    <div className={classNames('overflow-hidden ', {
      'bg-dawnDark-700': gradient,
    })}>
      {gradient && <div className="relative hidden md:block">
        <Gradient color="purple" scale={7} opacity={0.15} left="-50rem" top="2rem" />
        <Gradient color="orange" scale={6} opacity={0.15} left="-60rem" top="2rem" />
        <Gradient color="purple" scale={7} opacity={0.15} right="-50rem" top="-10rem" />
        <Gradient color="orange" scale={7} opacity={0.1} right="-50rem" top="-2rem" />
      </div>}

      <section className={classNames("relative flex justify-center text-white", {'py-20 md:py-30': title.length > 1})}>
        <div className={classNames('lg:mx-4', `${checklists.length > 1 ? 'max-w-6xl' : 'max-w-2xl'}`)}>
          {title.length > 1 && <h2 className="text-2.5xl leading-8 md:text-5xl font-semibold text-center md:leading-14">{title}</h2>}
          {text != null && <div className='pt-2'><Description>{text[0].children[0].text}</Description></div>}
          <div
            className={classNames('mt-8 ', {
              'flex flex-col space-y-4 md:space-y-0 md:space-x-8 md:flex-row': checklists.length > 1,
            })}
          >
            {checklists && checklists.map((checklist) => <ChecklistItem key={checklist._key} checklist={checklist} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
