# csound-vscode

## Features

- Tree-sitter based grammar for CSound files
- Language Server (LSP) written in Rust
- Provides hover information, completion suggestions, and error diagnostics
- Compatible with CSound 7

## Requirements

- CSound 7 installed
- On macOS: the first time you run the LSP, you may need to authorize the executable in System Preferences-Security & Privacy-Privacy

## Release Notes

### 0.0.2

- Fixed several issues in the language server to improve stability and reliability when analyzing CSound files (.csd, .orc, .sco, .udo)
- The grammar has been enhanced for better parsing of score, options, and udo blocks, with fixes for edge cases
- The language server now provides contextual completions for options defined in `<CsOptions>` blocks
- Detection of declared but unused variables has been improved and now highlights them correctly using semantic tokens
- Completed semantic token mapping to support VS Code highlighting, covering variables, parameters, numbers, strings, functions, macros, types, comments, keywords, operators, and namespaces

### 0.0.1

- Initial release
- Uses Tree-sitter grammar for accurate parsing of CSound code
- LSP implemented in Rust to provide hover, completion, and error recognition features
- Fully compatible with CSound 7
- macOS users: you must authorize the LSP executable in the system’s privacy/security settings to run it correctly
