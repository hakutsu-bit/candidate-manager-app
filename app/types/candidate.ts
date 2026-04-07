export type Candidate = {
  id: string;
  name: string;
  yomi: "A" | "B" | "C";
  source: string | null;
  agent_name: string;
  expected_month: string | null;
  status: string;
  first_interview_date: string | null;
  et_date: string | null;
  interview_scheduled_date: string | null;
  memo: string | null;
  created_at: string;
};
