export type Sponsor = {
  id: string;
  name: string;
  url: string | null;
  logo: string | null;
};

export const sponsors: Sponsor[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    url: 'https://www.anthropic.com/',
    logo: '/logos/anthropic.svg',
  },
  {
    id: 'gxl',
    name: 'GXL',
    url: 'https://gxl.ai/',
    logo: '/logos/gxl.jpg',
  },
  {
    id: 'aws',
    name: 'AWS',
    url: 'https://aws.amazon.com/',
    logo: '/logos/aws.svg',
  },
  {
    id: 'highlanders',
    name: 'Highlanders',
    url: null,
    logo: '/logos/highlanders.png',
  },
];

export const sponsorDisclosure =
  'All sponsors have committed monetary support to SPeC and are formally recognized in the technical report. Sponsors may also participate as co-authors and may attend office hours.';
