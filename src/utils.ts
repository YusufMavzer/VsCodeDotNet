import * as vscode from "vscode";

export const utils = {
  getStyles(uris: vscode.Uri[]): string {
    const styles = uris.map(uri => `<link href="${uri}" rel="stylesheet">`).join('');
    return styles;
  },
  getScripts(uris: vscode.Uri[], nonce: string): string {
    const scripts = uris.map(uri => `<script nonce="${nonce}" src="${uri}"></script>`).join('');
    return scripts;
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