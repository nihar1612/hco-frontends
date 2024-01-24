import { SVGProps, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import IconFacebook from 'components/icons/IconFacebook';
import IconTwitter from 'components/icons/IconTwitter';
import IconUrl from 'components/icons/IconUrl';

interface PostShareButtonProps {
  actionText: string;
  action: { url: string; actionType: 'href' | 'copyToClipboard' };
  icon: SVGProps<SVGSVGElement>;
  isSmallScreen: boolean;
}

interface PostShareButtonsProps {
  title: string;
  description: string;
  isSmallScreen?: boolean;
}

function PostShareButton({ actionText, action, icon, isSmallScreen }: PostShareButtonProps) {
  const [linkHasBeenCopied, setLinkHasBeenCopied] = useState(false);
  useEffect(() => {
    if (linkHasBeenCopied) {
      setTimeout(() => {
        setLinkHasBeenCopied(false);
      }, 1000);
    }
  }, [linkHasBeenCopied]);
  const body = (
    <>
      <div>
        <div aria-hidden="true" className="w-6 h-6">
          {icon}
        </div>
      </div>
      {!isSmallScreen && (
        <div className="text-sm text-transparent font-inter group-hover:text-white">
          {linkHasBeenCopied ? 'Link copied!' : actionText}
        </div>
      )}
    </>
  );
  const largeScreenWrapperClassName =
    'flex items-center space-x-2 w-full px-3 py-2 hover:text-white hover:bg-dawnDark-700 rounded-full group';
  function wrapperHref() {
    return (
      <a
        href={action.url}
        target="_blank"
        rel="noreferrer"
        aria-label={actionText}
        className={!isSmallScreen ? largeScreenWrapperClassName : ''}
      >
        {body}
      </a>
    );
  }

  function wrapperCopyToClipboard() {
    return (
      <button
        onClick={() => {
          setLinkHasBeenCopied(true);
          const element = document.createElement('textarea');
          element.value = action.url;
          document.body.appendChild(element);
          element.select();
          document.execCommand('copy');
          document.body.removeChild(element);
        }}
        aria-label={actionText}
        className={!isSmallScreen ? largeScreenWrapperClassName : ''}
      >
        {body}
      </button>
    );
  }
  return action.actionType === 'href' ? wrapperHref() : wrapperCopyToClipboard();
}

export default function PostShareButtons({ title, isSmallScreen = false }: PostShareButtonsProps) {
  const router = useRouter();
  const url = `https://www.dawn.health${router.asPath}`;
  const twitterText = encodeURIComponent(`${title} by @dawnhealthapp ${url}`);
  return (
    <div className={`flex ${isSmallScreen ? 'flex-row space-x-6' : 'flex-col space-y-6'}`}>
      <PostShareButton
        actionText="Share on Facebook"
        action={{ url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, actionType: 'href' }}
        icon={<IconFacebook />}
        isSmallScreen={isSmallScreen}
      />
      <PostShareButton
        actionText="Share on Twitter"
        action={{
          url: `https://twitter.com/intent/tweet/?text=${twitterText}`,
          actionType: 'href',
        }}
        icon={<IconTwitter />}
        isSmallScreen={isSmallScreen}
      />
      <PostShareButton
        actionText="Copy to clipboard"
        action={{ url, actionType: 'copyToClipboard' }}
        icon={<IconUrl />}
        isSmallScreen={isSmallScreen}
      />
    </div>
  );
}
