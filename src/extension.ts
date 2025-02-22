import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("flutterFeatureScaffold.createFeature", async () => {
        const featureName = await vscode.window.showInputBox({ prompt: "Enter feature name" });
        if (!featureName) {
            vscode.window.showErrorMessage("Feature name cannot be empty.");
            return;
        }

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage("Open a Flutter project first.");
            return;
        }

        const basePath = path.join(workspaceFolders[0].uri.fsPath, "lib", "features", featureName);
        createFlutterFeature(basePath, featureName);
        vscode.window.showInformationMessage(`Feature "${featureName}" scaffolded successfully!`);
    });

    context.subscriptions.push(disposable);
}

const featureStructure = {
    models: "",
    data: "",
    providers: "",
    pages: "",
    widgets: "",
} as const;

type FeatureKey = keyof typeof featureStructure;

function createFlutterFeature(basePath: string, featureName: string) {
    const structure: Record<FeatureKey, string> = {
        models: `${featureName}_model.dart`,
        data: `${featureName}_service.dart`,
        providers: `${featureName}_provider.dart`,
        pages: `${featureName}_page.dart`,
        widgets: `${featureName}_widget.dart`,
    };

    for (const folder of Object.keys(structure) as FeatureKey[]) {
        const folderPath = path.join(basePath, folder);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, structure[folder]);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, getTemplate(folder, featureName));
        }
    }
}

function getTemplate(type: FeatureKey, featureName: string): string {
    const className = capitalize(featureName);
    switch (type) {
        case "models":
            return `class ${className}Model {\n  // Define model properties\n}`;
        case "data":
            return `import '../models/${featureName}_model.dart';

class ${className}Service {
  ${className}Service(this._client);
  final ApiClient _client;

  Future<${className}Model> getSubjects() async {
    try {
      final response = await _client.get(
        '',
      );
      return ${className}Model.fromJson(response.data);
    } catch (e) {
      throw ErrorHandler.handle(e);
    }
  }
}`;
        case "providers":
            return `
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:global_school/core/client/client.dart';
import '../data/${featureName}_service.dart';

final ${featureName}ServiceProvider = Provider<${className}Service>((ref) {
  final client = ref.watch(clientProvider);
  return ${className}Service(client);
});
			`;
        case "pages":
            return `
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import '../provider/${featureName}_provider.dart';

class ${className}Page extends ConsumerWidget {
  const ${className}Page({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: Appbar(),
    );
  }
}
			`;
        case "widgets":
            return `
import 'package:flutter/material.dart';
import '../models/${featureName}_model.dart';

class ${className}Card extends StatelessWidget {
  const ${className}Card({
    super.key,
    required this.${featureName},
  });

  final ${className} ${featureName};

  @override
  Widget build(BuildContext context) {
    return const SizedBox(height: 8);
  }
}

			`;
        default:
            return `// Placeholder file for ${className}`;
    }
}

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function deactivate() {}