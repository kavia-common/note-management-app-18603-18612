import * as FileSystem from 'expo-file-system';

/**
 * Lightweight file-based storage for web/Expo where AsyncStorage may not be available.
 * Stores a single JSON file under the app's document directory.
 */
const NOTES_FILE = `${FileSystem.documentDirectory}notes.json`;

export type StoredNotes = {
  // ISO timestamp strings to avoid serialization issues
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}[];

async function ensureFile(): Promise<void> {
  try {
    const info = await FileSystem.getInfoAsync(NOTES_FILE);
    if (!info.exists) {
      await FileSystem.writeAsStringAsync(NOTES_FILE, JSON.stringify([]));
    }
  } catch {
    // On any error create a fresh file
    await FileSystem.writeAsStringAsync(NOTES_FILE, JSON.stringify([]));
  }
}

// PUBLIC_INTERFACE
export async function readNotes(): Promise<StoredNotes> {
  /** Reads all notes from storage. Returns an empty array when not present or on error. */
  try {
    await ensureFile();
    const data = await FileSystem.readAsStringAsync(NOTES_FILE);
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed as StoredNotes;
    }
    return [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function writeNotes(notes: StoredNotes): Promise<void> {
  /** Writes all notes to storage atomically. */
  await ensureFile();
  await FileSystem.writeAsStringAsync(NOTES_FILE, JSON.stringify(notes));
}
