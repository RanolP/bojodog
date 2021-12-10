import { SOLVEDAC_HOST } from '../constants';

export interface Problem {
  id: number;
  title: string;
}

export async function getSearchSuggestion(query: string): Promise<Problem[]> {
  const response = await fetch(
    new URL(
      `/api/v3/search/suggestion?query=${encodeURIComponent(query)}`,
      SOLVEDAC_HOST
    ).toString()
  );
  const json = await response.json();

  return json.problems as unknown as Problem[];
}
