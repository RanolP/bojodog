import * as vscode from 'vscode';
import { showBojProblem } from '../lib/bojodog/show-boj-problem';
import { getSearchSuggestion } from '../lib/solvedac';

export function registerSearchBojCommand(context: vscode.ExtensionContext) {
  const searchBojCommand = vscode.commands.registerCommand(
    'bojodog.searchBoj',
    async () => {
      interface SearchResult {
        id: number;
        title?: string;
        label: string;
        description?: string;
      }

      const quickpick = vscode.window.createQuickPick<SearchResult>();

      quickpick.title = 'Search BOJ Problem';
      quickpick.items = [];
      quickpick.matchOnDescription = true;

      quickpick.onDidChangeValue(async (value) => {
        const problems = await getSearchSuggestion(value);
        quickpick.items = problems.map(({ id, title }) => ({
          id,
          title,
          label: title,
          description: `#${id}`,
        }));
      });

      quickpick.onDidChangeSelection(([{ id }]) => {
        showBojProblem(
          id,
          vscode.workspace
            .getConfiguration('bojodog')
            .get('search.openLocation')
        );
        quickpick.dispose();
      });

      quickpick.show();
      quickpick.onDidHide(() => quickpick.dispose());
    }
  );

  context.subscriptions.push(searchBojCommand);
}
