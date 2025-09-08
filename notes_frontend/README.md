# Notes Frontend (React Native / Expo)

A simple notes application built with React Native (Expo). It allows users to:
- Create notes
- Edit notes
- Delete notes
- View a list of notes with last updated time

Data is stored locally on the device using a lightweight file-based storage under Expo's FileSystem (no extra dependencies).

## Getting Started

- Start the app:
  - npm start
  - npm run web
  - npm run android
  - npm run ios

On first run, the app creates a notes.json under the app's document directory and persists your notes there.

## Usage

- Tap "+" to create a note.
- Tap a note to open and edit.
- Long press a note in the list to delete it.
- In the editor, you can Save or Delete with the header actions.

## Tech

- React Native 0.79 / React 19
- Expo 53
- TypeScript
- File-based persistence via expo-file-system
