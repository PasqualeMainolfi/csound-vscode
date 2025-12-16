import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions
} from 'vscode-languageclient/node';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  const serverPath = getServerPath(context);

  if (!serverPath) { return; }

  const serverOptions: ServerOptions = {
    command: serverPath,
    args: [],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [
      { scheme: "file", language: "csound" }
    ],
  };

  client = new LanguageClient(
    "csound-lsp",
    "CSound Language Server",
    serverOptions,
    clientOptions
  );

  client.start();
}

export function deactivate() {
  return client?.stop();
}

function getServerPath(context: vscode.ExtensionContext): string | undefined {
  const binDir = path.join(context.extensionPath, 'bin');
  
  const platform = os.platform();
  const arch = os.arch();

  let binaryName = '';

  if (platform === 'win32') {
    binaryName = 'csound-lsp-windows-x86_64.exe';
  } 
  else if (platform === 'linux') {
    binaryName = 'csound-lsp-linux-x86_64';
  } 
  else if (platform === 'darwin') {
    if (arch === 'arm64') {
      binaryName = 'csound-lsp-macos-aarch64';
    } else {
      binaryName = 'csound-lsp-macos--x86_64';
    }
  } 
  else {
    vscode.window.showErrorMessage(`OS not supported: ${platform}`);
    return undefined;
  }

  const fullPath = path.join(binDir, binaryName);

  if (!fs.existsSync(fullPath)) {
    vscode.window.showErrorMessage(`LSP not founded in: ${fullPath}`);
    return undefined;
  }

  if (platform !== 'win32') {
    try {
        fs.chmodSync(fullPath, '755');
    } catch (e) {
        console.warn("permission denied +x:", e);
    }
  }

  return fullPath;
}
