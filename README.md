# Quick Copy Chrome Extension

A simple and efficient Chrome extension that automatically copies selected text to your clipboard. Just activate the extension and select any text - it will be copied instantly!

## Features

- 🚀 One-click activation/deactivation
- ✨ Instant text copying on selection
- 🔔 Visual feedback with subtle notifications
- 👁️ Clear visual indication of active/inactive state
- 🎯 Works on any webpage
- 🔒 Minimal permissions required

## Installation

### From Firefox Add-ons
*(Coming soon)*

### Manual Installation
1. Clone this repository or download the ZIP file
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select any file from the extension directory

## How to Use

1. Click the extension icon in your Chrome toolbar to activate Quick Copy
   - Gray icon = inactive
   - Colored icon = active
2. Select any text on the webpage
3. The selected text will be automatically copied to your clipboard
4. A small notification will confirm the copy action
5. Click the icon again to deactivate the feature


## Permissions

This extension requires minimal permissions:
- `activeTab`: To interact with the current tab
- `scripting`: To inject the copy functionality

## Technical Details

- Built with Manifest V2
- Uses Firefox WebExtensions API
- No external dependencies
- Lightweight and efficient

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Icon designed by [credit to icon designer if applicable]
- Inspired by the need for quick and efficient text copying