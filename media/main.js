// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();
  const bindMessage = function(selector, type, name, param = undefined) {
    const el = document.querySelector(selector);
    el && el.addEventListener(type, function() {
      vscode.postMessage({
        name: name,
        param: param
      });
    });
  };
  bindMessage(".btn-clone", "click", "onCloneButtonClick");
  bindMessage(".btn-open-proj", "click", "onOpenProjectButtonClick");
  bindMessage(".btn-open-dir", "click", "onOpenDirButtonClick");
  bindMessage(".btn-create-proj", "click", "onCreateProjectButtonClick");

  bindMessage(".startpage", "click", "onLoadWelcomePage");
})();