export interface PoliticalExperience {
  id?: number;
  title: string;
  description?: string;
  year?: number;
}

export interface CampaignFocus {
  id?: number;
  title: string;
  description?: string;
  priority?: number;
}

export interface PositiveContribution {
  id?: number;
  title: string;
  description?: string;
  date?: string;
  impact?: string;
}

export interface Controversy {
  id?: number;
  title: string;
  description?: string;
  date?: string;
  severity?: string;
}

export interface Achievement {
  id?: number;
  description: string;
}

export interface CandidateDetails {
  id?: number;
  candidate_id: number;
  overall_rating: number;
  total_ratings: number;
  past_elections?: any;
  social_links?: any;
  political_experiences: PoliticalExperience[];
  campaign_focuses: CampaignFocus[];
  contributions: PositiveContribution[];
  controversies: Controversy[];
  achievements: Achievement[];
}

export interface Candidate {
  id: number;
  name: string;
  party: string;
  image?: string;
  age?: number;
  gender?: string;
  nationality?: string;
  province?: { name: string };
  district?: { name: string };
  details?: CandidateDetails;
}