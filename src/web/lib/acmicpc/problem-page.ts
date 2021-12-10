import { ACMICPC_HOST } from './constants';
import { applyProxy } from '../proxy';
import { CancellationToken } from 'vscode';

export interface Problem {
  id: number;
  html: string;
}

const BEGIN_OF_MAIN_TEXT = '<div class="container content"';
const END_OF_MAIN_TEXT = '<div class="footer-v3 no-print"';
const BOJ_UPLOAD_PATH = /\/JudgeOnline\/upload[^"]+/;

export async function fetchProblemPage(
  id: number,
  token?: CancellationToken
): Promise<Problem> {
  const abortController = new AbortController();
  token?.onCancellationRequested(() => {
    abortController.abort();
  });

  const response = await fetch(applyProxy(`/problem/${id}`, ACMICPC_HOST), {
    signal: abortController.signal,
  });
  const text = await response.text();

  const html = text
    .substring(text.search(BEGIN_OF_MAIN_TEXT), text.search(END_OF_MAIN_TEXT))
    .replace(BOJ_UPLOAD_PATH, (path) => applyProxy(path, ACMICPC_HOST));

  return {
    id,
    html,
  };
}
