// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from 'path';
import utils from "./utils";

let me: any;
export class MyWebviewViewProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _panel?: vscode.WebviewPanel;

  constructor(private readonly _extensionUri: vscode.Uri) {
    me = this;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
     webviewView.webview.html = this.render(webviewView.webview);
     webviewView.webview.onDidReceiveMessage(this.onReceiveMessageHandler);
  }

  private async onReceiveMessageHandler(data: any) {
    const func: (webViewProvider: MyWebviewViewProvider, param?: any) => Promise<void> | undefined = me[data.name];
    if(!func) {
      vscode.window.showErrorMessage(`function '${data.name}' is undefined`);
      return;
    }
    await func(me , data.param);
  }

  private render(webview: vscode.Webview) {
    const resources = utils.getResources(webview,this._extensionUri);
    const nonce = utils.getNonce();
    const html = `
    <!DOCTYPE html>
			<html lang="en">
			<head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy" content="default-src https://bowl.azurewebsites.net; img-src https: data:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VS DotNet</title>
        <link href="${resources["reset.css"]}" rel="stylesheet">
        <link href="${resources["vscode.css"]}" rel="stylesheet">
        <link href="${resources["main.css"]}" rel="stylesheet">
			</head>
        <body class="vs-sidebar">
          <div>
            <button class="startpage">Welcome</button>
          </div>
          <script nonce="${nonce}" src="${resources["main.js"]}"></script>
        </body>
      </html>`;
      return html;
  }

  public renderPanel(): void {
    const column: vscode.ViewColumn = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn || vscode.ViewColumn.One : vscode.ViewColumn.One;
    let panel = this._panel;
    if (panel) {
      try {
        panel.reveal(column, false);
      }catch(e: any) {
        console.debug(e);
      }    
    } else {
      panel = vscode.window.createWebviewPanel(
        "vsDotNetStartPage",
        "Welcome",
        column,
        {
          enableScripts: true,
          localResourceRoots: [
            this._extensionUri
          ],
        }
      );
      panel.iconPath = vscode.Uri.joinPath(this._extensionUri, "media", "vs.svg");
      panel.webview.onDidReceiveMessage(this.onReceiveMessageHandler);
      panel.onDidDispose(() => {
        panel = undefined;
      });
    }
    const nonce = utils.getNonce();
    const resources = utils.getResources(panel.webview,this._extensionUri);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src  ${panel.webview.cspSource} file: http: https: data:; style-src ${panel.webview.cspSource}; script-src 'nonce-${nonce}';">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <link href="${resources["reset.css"]}" rel="stylesheet">
        <link href="${resources["vscode.css"]}" rel="stylesheet">
        <link href="${resources["main.css"]}" rel="stylesheet">
      </head>
      <body>
        <h1>Visual Studio DotNet</h1>
        <div class="container">
          <div>
            <h2>Open recent</h2>
          </div>
          <div>
            <h2>Get started</h2>
            <div class="sidebar">
              <div class="welcome-sidebar-btn btn-clone">  
                <div>
                  <img src="${resources["cloneToDesktop.svg"]}" width="48px"/>
                </div>
                <div>
                  <h3>Clone or check out code</h3>
                  <p>
                    Get code from an online git repository
                  </p>
                </div>
              </div>
              <div class="welcome-sidebar-btn btn-open-proj">
                <div>
                  <img src="${resources["openProject.svg"]}" width="48px"/>
                </div>
                <div>
                  <h3>Open a project or solution</h3>
                  <p>Open a local Visual Studio project or .sln file</p>
                </div>
              </div>
              <div class="welcome-sidebar-btn btn-open-dir">
                <div>
                  <img src="${resources["openFolder.svg"]}" width="48px"/>
                </div>
                <div>
                  <h3>Open a local folder</h3>
                  <p>Navigate and edit code within any folder</p>
                </div>
              </div>
              <div class="welcome-sidebar-btn btn-create-proj">
                <div></div>
                <div>
                  <h3>Create a new project</h3>
                  <p>Choose a project template with code scaffolding to get started</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script nonce="${nonce}" src="${resources["main.js"]}"></script>
      </body>
    </html>`;

    panel.webview.html = html;
  }

  public async onLoadWelcomePage(webViewProvider: MyWebviewViewProvider, param?: any) {
    webViewProvider.renderPanel();
  }

  public async onError(webViewProvider: MyWebviewViewProvider, param?: any) {
    vscode.window.showErrorMessage(param);
  }

  public async onCloneButtonClick(webViewProvider: MyWebviewViewProvider, param?: any) {
    vscode.window.showInformationMessage("Clone project");
  }

  public async onOpenProjectButtonClick(webViewProvider: MyWebviewViewProvider, param?: any) {
    vscode.window.showInformationMessage("Open project");
  }

  public async onOpenDirButtonClick(webViewProvider: MyWebviewViewProvider, param?: any) {
    vscode.window.showInformationMessage("Open folder");
  }

  public async onCreateProjectButtonClick(webViewProvider: MyWebviewViewProvider, param?: any) {
    vscode.window.showInformationMessage("Create project");
  }
}