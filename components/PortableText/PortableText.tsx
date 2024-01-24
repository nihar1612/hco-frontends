import React from 'react';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import classNames from 'classnames';
import { config } from 'lib/sanity';
import SanityImage from 'modules/sanity/SanityImage';
import { CallToActionSlider } from 'components/CallToActionSlider/CallToActionSlider';

function BlockNormal({ text }: { text: string }) {
  return <p>{text}</p>;
}

function BlockHeadingTwo({ text, indexPosition }: { text: string; indexPosition: 'first' | 'middle' | 'last' }) {
  return (
    <h2
      className={classNames('font-inter text-2xl font-semibold leading-8 md:text-4xl', {
        'mt-10': ['middle', 'last'].includes(indexPosition),
      })}
    >
      {text}
    </h2>
  );
}

function BlockRenderer({ props, blocks }: { props: any; blocks: any }) {
  const { style = 'normal' } = props.node;
  switch (style) {
    case 'h2':
      const h2Blocks = blocks.filter((block: any) => block.style === style);
      const index = h2Blocks.findIndex((block: any) => block._key === props.node._key);
      const indexPosition = index === 0 ? 'first' : index === h2Blocks.length - 1 ? 'last' : 'middle';
      return <BlockHeadingTwo text={props.children} indexPosition={indexPosition} />;
    case 'normal':
      return <BlockNormal text={props.children} />;
    default:
      // @ts-expect-error
      return BlockContent.defaultSerializers.types.block(props);
  }
}

function ImageRenderer({ props }: { props: any }) {
  // @ts-expect-error
  const imageUrl = props?.node?.asset ? BlockContent.getImageUrl(props) : null;
  return (
    <figure className="my-10">
      {imageUrl ? <img src={imageUrl} alt="" className="rounded-xl" /> : 'No image url yet. Try reloading the page.'}
    </figure>
  );
}

function buildInternalUrl(contentType: string, slug: string): string {
  return `${contentType === 'post' ? '/blog/' : '/'}${slug}`;
}

function InternalLinkExtendedRenderer({ props }: { props: any }) {
  const { contentType, slug } = props.node;
  let imageAsset;
  if (props?.node?.mainImage) {
    imageAsset = props?.node.mainImage;
  } else if (props?.node?.introSection) {
    imageAsset = props.node.introSection.image;
  }
  let text = props?.node?.excerpt || props?.node?.introSection?.text;
  const title = props?.node?.title || 'No title';

  return (
    <Link href={buildInternalUrl(contentType, slug)}>
      <a className="flex p-4 mt-4 space-x-6 border rounded group md:p-6 border-dawnDark-200">
        {imageAsset && (
          <div>
            <div className="relative h-24 overflow-hidden rounded w-22 md:w-34 md:h-28">
              <SanityImage image={imageAsset} fill={true} />
            </div>
          </div>
        )}
        <div className="font-inter">
          <div className="text-base font-semibold md:text-xl md:leading-8 font-inter group-hover:text-dawnPurple-500 line-clamp-1">
            {title}
          </div>

          <div className="text-dawnDark-400 line-clamp-3">{text}</div>
        </div>
      </a>
    </Link>
  );
}

function ExternalLinkRendererAnnotation({ props }: { props: any }) {
  return (
    <Link href={props.mark.href ? props.mark.href : ''}>
   
      <a className="text-dawnPurple-500 hover:underline">{props.children[0]}</a>
    </Link>
  );
}

function InternalLinkRendererAnnotation({ props }: { props: any }) {
  const { contentType, slug } = props.mark;
  return (
    <Link href={buildInternalUrl(contentType, slug)}>
      <a className="text-dawnPurple-500 hover:underline">{props.children[0]}</a>
    </Link>
  );
}
function ListRenderer({ props }: { props: any }) {
  return <ul>{props.children}</ul>;
}
function ListItemRenderer({ props }: { props: any }) {
  return <li>{props.children}</li>;
}

function CitationSourceReferenceAnnotationRenderer({ props }: { props: any }) {
  return (
    <Link href={`#citation-source-${props.mark.citationSourceReference}`}>
      <a className="text-sm align-top">{props.children}</a>
    </Link>
  );
}

function CallToActionSliderRenderer({ props }: { props: any }) {
  return <CallToActionSlider href={props.node?.href} />;
}

interface CreateSerializersParams {
  blocks: any;
}
function createSerializers({ blocks }: CreateSerializersParams) {
  return {
    types: {
      block: (props: any) => BlockRenderer({ props, blocks }),
      image: (props: any) => ImageRenderer({ props }),
      internalLinkExtended: (props: any) => InternalLinkExtendedRenderer({ props }),
      callToActionSlider: (props: any) => CallToActionSliderRenderer({ props }),
    },
    marks: {
      internalLinkAnnotation: (props: any) => InternalLinkRendererAnnotation({ props }),
      externalLinkAnnotation: (props: any) => ExternalLinkRendererAnnotation({ props }),
      citationSourceReferenceAnnotation: (props: any) => CitationSourceReferenceAnnotationRenderer({ props }),
    },
    listItem: (props: any) => ListItemRenderer({ props }),
    list: (props: any) => ListRenderer({ props }),
  };
}

interface PortableTextProps {
  blocks: any;
}
export function PortableText({ blocks }: PortableTextProps) {
  return (
    <BlockContent
      projectId={config.projectId}
      dataset={config.dataset}
      serializers={createSerializers({ blocks })}
      blocks={blocks}
      imageOptions={{ w: 672, fit: 'max' }}
    />
  );
}
