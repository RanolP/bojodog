import * as vscode from 'vscode';
import { fetchProblemPage, makeCozyView } from '../acmicpc';

export async function showBojProblem(id: number): Promise<void> {
  const problem = await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Loading #${id}...`,
    },
    async (progress, token) => {
      progress.report({
        message: 'Fetching...',
        increment: 30,
      });

      const problem = fetchProblemPage(id, token);
      progress.report({
        message: 'Done!',
        increment: 70,
      });
      return problem;
    }
  );

  const panel = vscode.window.createWebviewPanel(
    'bojodog.showBoj',
    `BOJ #${id}`,
    {
      viewColumn: vscode.ViewColumn.Beside,
      preserveFocus: true,
    },
    {
      enableScripts: true,
    }
  );

  panel.webview.html = makeCozyView(problem);
}
