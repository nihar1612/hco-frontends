import SanityPortableText from '@sanity/block-content-to-react';

interface PortableTextProps {
  blocks: any;
  serializers?: { [key: string]: any };
}

export default function PortableText({ blocks, serializers = {} }: PortableTextProps) {
  return (
    <SanityPortableText
      projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
      serializers={serializers}
      blocks={blocks}
    />
  );
}
