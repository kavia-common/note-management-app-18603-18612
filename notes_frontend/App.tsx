import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import NoteListScreen from './src/screens/NoteListScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import { Note } from './src/types';

/**
 * Root app with simple navigation between List and Editor screens.
 * Uses minimal state-based navigation to avoid adding routing dependencies.
 */
export default function App() {
  const [route, setRoute] = useState<{ name: 'list' } | { name: 'edit'; note: Note }>({ name: 'list' });

  const goBack = useCallback(() => setRoute({ name: 'list' }), []);
  const openEditor = useCallback((note: Note) => setRoute({ name: 'edit', note }), []);
  const onCreate = useCallback((note: Note) => setRoute({ name: 'edit', note }), []);

  return (
    <SafeAreaView style={styles.container}>
      {route.name === 'list' ? (
        <NoteListScreen onCreate={onCreate} onOpen={openEditor} />
      ) : (
        <NoteEditorScreen
          note={route.note}
          onBack={goBack}
          onDeleteInList={() => {}}
          onSaved={() => {}}
        />
      )}
      <StatusBar style={Platform.select({ ios: 'dark', android: 'auto', default: 'auto' })} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
});
