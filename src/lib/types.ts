export type ReportCategory = 'cheating' | 'toxicity' | 'spam' | 'other';
export type ReportStatus = 'pending' | 'reviewing' | 'resolved';

export interface Report {
  id: string;
  reporter_name: string;
  reported_player: string;
  category: ReportCategory;
  description: string;
  status: ReportStatus;
  created_at: string;
}

export interface ReportInput {
  reporter_name: string;
  reported_player: string;
  category: ReportCategory;
  description: string;
}
