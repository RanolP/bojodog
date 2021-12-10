import * as vscode from 'vscode';
import { registerSearchBojCommand } from './commands/search-boj';

export function activate(context: vscode.ExtensionContext) {
  registerSearchBojCommand(context);
}

export function deactivate() {}
