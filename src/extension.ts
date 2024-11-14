import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('YanExt has been activated!');

    const disposable = vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        if (event.contentChanges[0].text !== '/') {
            return;
        }

        const document = editor.document;
        let fullText = document.getText();

        const ifRegex = /\n(\s*)\/\/i(.*?)\/\/\s*\n/g;
        const ifElseRegex = /\n(\s*)\/\/i(.*?)\e\/\/\s*\n/g;
        const forRegex = /\n(\s*)\/\/f(-?\d+)([_a-zA-Z][_a-zA-Z0-9]*?)(.*?)(-?\d+)(.*?)\/\/\s*\n/g;
        const whileRegex = /\n(\s*)\/\/w(.*?)\/\/\s*\n/g;

        let match;
        if ((match = ifElseRegex.exec(fullText)) !== null) {
            const indent = match[1];
            const condition = match[2];

            const replacementText = `\n${indent}if (${condition}) {\n${indent}    \n${indent}} else {\n${indent}    \n${indent}}\n`;

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            editor.edit(editBuilder => {
                editBuilder.replace(range, replacementText);
            });
            fullText = document.getText();
            const cursorPosition = new vscode.Position(editor.selection.active.line + 1, indent.length + 4);
            editor.selection = new vscode.Selection(cursorPosition, cursorPosition);

            console.log('Replaced text with:', replacementText);
        } else if ((match = ifRegex.exec(fullText)) !== null) {
            const indent = match[1];
            const condition = match[2];

            const replacementText = `\n${indent}if (${condition}) {\n${indent}    \n${indent}}\n`;

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            editor.edit(editBuilder => {
                editBuilder.replace(range, replacementText);
            });
            fullText = document.getText();
            const cursorPosition = new vscode.Position(editor.selection.active.line + 1, indent.length + 4);
            editor.selection = new vscode.Selection(cursorPosition, cursorPosition);

            console.log('Replaced text with:', replacementText);
        } else if ((match = forRegex.exec(fullText)) !== null) {
            const indent = match[1];
            const startIndex = match[2];
            const variableName = match[3];
            const logicOperator = match[4];
            const endIndex = match[5];
            const operation = !match[6] ? '++' : ((match[6] === '+' || match[6] === '-') ? (match[6] + match[6]) : match[6]);

            const replacementText = `\n${indent}for (int ${variableName} = ${startIndex}; ${variableName} ${logicOperator} ${endIndex}; ${variableName} ${operation}) {\n${indent}    \n${indent}}\n`;

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            editor.edit(editBuilder => {
                editBuilder.replace(range, replacementText);
            });
            fullText = document.getText();
            const cursorPosition = new vscode.Position(editor.selection.active.line + 1, indent.length + 4);
            editor.selection = new vscode.Selection(cursorPosition, cursorPosition);

            console.log('Replaced text with:', replacementText);
        } else if ((match = whileRegex.exec(fullText)) !== null) {
            const indent = match[1];
            const condition = match[2];

            const replacementText = `\n${indent}while (${condition}) {\n${indent}    \n${indent}}\n`;

            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            const range = new vscode.Range(startPos, endPos);

            editor.edit(editBuilder => {
                editBuilder.replace(range, replacementText);
            });
            fullText = document.getText();
            const cursorPosition = new vscode.Position(editor.selection.active.line + 1, indent.length + 4);
            editor.selection = new vscode.Selection(cursorPosition, cursorPosition);

            console.log('Replaced text with:', replacementText);
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}