import * as vscode from "vscode";

const paths: {[key:string]: string} = { 
  "reset.css": "media/reset.css",
  "vscode.css": "media/vscode.css",
  "main.css": "media/main.css",
  "main.js": "media/main.js",
  "cloneToDesktop.svg": "media/icons/cloneToDesktop.svg",
  "openFolder.svg": "media/icons/openFolder.svg",
  "openProject.svg": "media/icons/openProject.svg"
};

export const utils = {
  getResources(webview: vscode.Webview, uri: vscode.Uri) {
    const ret: {[key:string]: vscode.Uri} = {};
    Object.keys(paths).forEach((key: string) => {
      ret[key] = webview.asWebviewUri(vscode.Uri.joinPath(uri, paths[key]));
    });
    return ret;
  },
  getNonce() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
};

export default utils;