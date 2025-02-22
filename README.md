# Flutter Feature Scaffold - VS Code Extension

A VS Code extension that helps you quickly scaffold a new feature structure for your Flutter projects following a clean architecture pattern.

## Features

- Creates a standardized feature structure with a single command
- Automatically generates boilerplate code for each component
- Follows clean architecture principles with Riverpod state management
- Creates the following structure for each feature:
  ```
  features/
  └── feature_name/
      ├── models/
      │   └── feature_name_model.dart
      ├── data/
      │   └── feature_name_service.dart
      ├── providers/
      │   └── feature_name_provider.dart
      ├── pages/
      │   └── feature_name_page.dart
      └── widgets/
          └── feature_name_widget.dart
  ```

## Installation

1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P` to open the Quick Open dialog
3. Type `ext install flutter-feature-scaffold`
4. Press Enter and restart VS Code

## Usage

1. Open your Flutter project in VS Code
2. Press `Ctrl+Shift+P` / `Cmd+Shift+P` to open the Command Palette
3. Type "Create Flutter Feature" and select the command
4. Enter your feature name when prompted
5. The extension will create the feature structure in your project's `lib/features` directory

## Generated Files

The extension creates the following files with basic boilerplate code:

### feature_name_model.dart
```dart
class FeatureNameModel {
  // Define model properties
}
```

### feature_name_service.dart
```dart
import '../models/feature_name_model.dart';

class FeatureNameService {
  FeatureNameService(this._client);
  final ApiClient _client;

  Future<FeatureNameModel> getSubjects() async {
    try {
      final response = await _client.get(
        '',
      );
      return FeatureNameModel.fromJson(response.data);
    } catch (e) {
      throw ErrorHandler.handle(e);
    }
  }
}
```

### feature_name_provider.dart
```dart
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:global_school/core/client/client.dart';
import '../data/feature_name_service.dart';

final featureNameServiceProvider = Provider<FeatureNameService>((ref) {
  final client = ref.watch(clientProvider);
  return FeatureNameService(client);
});
```

### feature_name_page.dart
```dart
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import '../provider/feature_name_provider.dart';

class FeatureNamePage extends ConsumerWidget {
  const FeatureNamePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: Appbar(),
    );
  }
}
```

### feature_name_widget.dart
```dart
import 'package:flutter/material.dart';
import '../models/feature_name_model.dart';

class FeatureNameCard extends StatelessWidget {
  const FeatureNameCard({
    super.key,
    required this.featureName,
  });

  final FeatureName featureName;

  @override
  Widget build(BuildContext context) {
    return const SizedBox(height: 8);
  }
}
```

## Requirements

- VS Code 1.60.0 or higher
- Flutter extension installed
- Flutter project initialized
- hooks_riverpod package installed

## Extension Settings

This extension contributes the following commands:

* `flutterFeatureScaffold.createFeature`: Create a new Flutter feature structure

## Known Issues

None at the moment.

## Release Notes

### 1.0.0

Initial release of Flutter Feature Scaffold

- Feature structure generation
- Riverpod integration
- API client integration
- Clean architecture pattern support

## Contributing

Feel free to submit issues and enhancement requests on our GitHub repository.

## License

This extension is licensed under the MIT License.