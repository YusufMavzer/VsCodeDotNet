// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MyWebviewViewProvider } from "./MyWebviewViewProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const provider =  new MyWebviewViewProvider(context.extensionUri);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider("vs-dotnet", provider));
	provider.renderPanel();
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('visualstudiodotnet.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	let openDialogOptions: vscode.OpenDialogOptions = {
	// 		canSelectFiles: true,
	// 		canSelectFolders: false,
	// 		canSelectMany: false,
	// 		filters: {
	// 			Json: ["json"]
	// 		}
	// 	};
	// 	vscode.window
  //   .showOpenDialog(openDialogOptions)
  //   .then(async (uri: vscode.Uri[] | undefined) => {
  //     if (uri && uri.length > 0) {
  //       const view = new ViewLoader(uri[0]);
  //     } else {
  //       vscode.window.showErrorMessage("No valid file selected!");
  //       return;
  //     }
  //   });
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from VisualStudioDotNet!');
	// });

	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
