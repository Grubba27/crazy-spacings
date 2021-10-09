// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { eventNames } from 'process';
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "crazy-spacings" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('crazy-spacings.crazy', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		vscode.window.showInformationMessage('Crazy time!');


		const textRange = () => {
			const textEditor = vscode.window.activeTextEditor?.document;
			if (!textEditor) {
				return;
			}
			let linesArray: vscode.TextLine[] = [];
			new Array(textEditor.lineCount).fill(0).forEach((el, index) => {
				el = textEditor.lineAt(index);
				linesArray.push(textEditor.lineAt(index));
			});
			const rangeArray = linesArray.map((item, index) => {
				if (item.isEmptyOrWhitespace) {
					return;
				}
				if (/\S/.test(item.text[1])) {
					return;
				} else {
					return new vscode.Range(item.lineNumber, 0, item.lineNumber, item.firstNonWhitespaceCharacterIndex);
				}

			});
			return rangeArray;
		};
		const randomSpaceNumber = (max: number) => {
			const r = Math.random() * max;
			const f = Math.floor(r);
			return f;
		};

		vscode.workspace.onDidChangeTextDocument(function event(e) {
			const changedText = e.contentChanges[0].text;
			const range = textRange();
			if (!range) {
				return;
			}

			if (/\S/.test(changedText) || e.contentChanges[0].rangeLength !== 0) {

			} else {
				const random = randomSpaceNumber(8);
				const randomAddOrSubstr = randomSpaceNumber(10);
				if (randomAddOrSubstr <= 5) {
					vscode.window.activeTextEditor?.edit((editBuilder) => {
						range.forEach((r) => {
							if (r !== undefined) {
								const spacesValue = r.end.character + random;
								let crazySpaces = ' '.repeat(spacesValue);
								editBuilder.replace(r, crazySpaces);
							}
						});
					});
				} else {
					vscode.window.activeTextEditor?.edit((editBuilder) => {
						range.forEach((r) => {
							if (r !== undefined) {
								const spacesValue = r.end.character - random;
								let crazySpaces = ' '.repeat(spacesValue);
								editBuilder.replace(r, crazySpaces);
							}
						});
					});
				}
			}
		});

	});


	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
