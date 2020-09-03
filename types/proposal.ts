export type CMSProposal = {
  address: string;
  key: string;
  content: string;
  about: string;
  proposalBlurb: string;
  title: string;
  date: string;
};

type Proposal = CMSProposal;

export default Proposal;
