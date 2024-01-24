import { CitationSource } from 'types/sanity-schema-types';
import { PortableText } from 'components/PortableText';

interface PostCitationSourcesProps {
  sources: CitationSource[];
}
export function PostCitationSources({ sources }: PostCitationSourcesProps) {
  return (
    <>
      <h3 className="text-xl font-semibold">References</h3>
      <ol className="mt-4 list-decimal">
        {sources.map((source, index) => (
          <li key={index} id={`citation-source-${source.id}`} className="mb-3 ml-4 break-all">
            <PortableText blocks={source.text} />
          </li>
        ))}
      </ol>
    </>
  );
}
