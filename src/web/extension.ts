import * as vscode from 'vscode';

const NUMBERS = /^[0-9]+$/;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'bojodog.showBoj',
    async () => {
      const id = await vscode.window.showInputBox({
        title: 'Enter BOJ Problem Id',
        validateInput: (value) =>
          NUMBERS.test(value) ? null : 'Problem Id must be a number',
      });

      const html = await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: `Loading #${id}...`,
        },
        async (progress, _token) => {
          progress.report({
            message: 'Try to fetch website...',
            increment: 10,
          });
          const response = await fetch(
            'https://api.allorigins.win/raw?url=' +
              encodeURIComponent(`https://acmicpc.net/problem/${id}`),
            {}
          );
          progress.report({
            message: 'Processing page...',
            increment: 80,
          });
          const pageRaw = await response.text();
          const processed = pageRaw.substring(
            pageRaw.search('<div class="container content"'),
            pageRaw.search('<div class="footer-v3 no-print"')
          );
          progress.report({
            message: 'Done!',
            increment: 10,
          });
          return processed;
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

      panel.webview.html = `
				<html>
					<head>
						<meta charset="UTF-8">
						<meta http-equiv="X-UA-Compatible" content="IE=edge">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>BOJ #${id}</title>
						<style>
							html {
								max-width: 970px;
								margin: 0 auto;
							}
							ul.nav, .problem-label {
								display: none;
							}
							.col-md-6 {
								width: 50%;
								float: left;
							}
							table {
								width: 100%;
							}
							th {
								text-align: left;
							}
						</style>
					</head>
					<body>
						${html ?? 'No Problem Found'}
						<script>
							for (const btn of document.querySelectorAll('.btn')) {
								if (btn.innerText !== '복사') {
									continue;
								}
								console.log(btn.dataset);
								btn.onclick = () => navigator.clipboard.writeText(document.querySelector(btn.dataset.clipboardTarget).innerText);
							}
						</script>
					</body>
				</html>
			`;
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
