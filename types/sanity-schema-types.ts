export interface TeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  nameWithCredentials?: string;
  role?: string;
  credentials: string;
  image: { [key: string]: string };
  bio: { [key: string]: string };
}

export interface CitationSource {
  _id: string;
  _type: 'citationSource';
  id: string;
  text: { [key: string]: string };
}
