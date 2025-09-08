import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { Note, toStored } from '../types';
import { readNotes, writeNotes } from '../storage/storage';

type NoteEditorScreenProps = {
  note: Note;
  onBack: () => void;
  onDeleteInList?: (id: string) => void;
  onSaved?: (note: Note) => void;
};

export default function NoteEditorScreen({ note: initialNote, onBack, onDeleteInList, onSaved }: NoteEditorScreenProps) {
  const [title, setTitle] = useState(initialNote.title);
  const [content, setContent] = useState(initialNote.content);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(initialNote.title);
    setContent(initialNote.content);
  }, [initialNote.id]);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const all = (await readNotes()).map(n => ({
        ...n,
        // normalize string dates to keep storage consistent
      }));
      const index = all.findIndex(n => n.id === initialNote.id);
      const now = new Date();
      const updatedNote: Note = {
        ...initialNote,
        title: title.trim(),
        content,
        updatedAt: now,
      };
      if (index >= 0) {
        all[index] = toStored(updatedNote);
      } else {
        all.unshift(toStored(updatedNote));
      }
      await writeNotes(all);
      onSaved?.(updatedNote);
      onBack();
    } finally {
      setSaving(false);
    }
  }, [title, content, initialNote, onBack, onSaved]);

  const del = useCallback(() => {
    Alert.alert('Delete note', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const all = await readNotes();
          const remaining = all.filter(n => n.id !== initialNote.id);
          await writeNotes(remaining);
          onDeleteInList?.(initialNote.id);
          onBack();
        },
      },
    ]);
  }, [initialNote.id, onBack, onDeleteInList]);

  const Right = useMemo(() => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Pressable onPress={del} hitSlop={8}>
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
      <Pressable onPress={save} disabled={saving} hitSlop={8}>
        <Text style={[styles.save, saving && { opacity: 0.6 }]}>Save</Text>
      </Pressable>
    </View>
  ), [del, save, saving]);

  const Left = useMemo(() => (
    <Pressable onPress={onBack} hitSlop={8}>
      <Text style={styles.back}>Back</Text>
    </Pressable>
  ), [onBack]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
      <Header title="Edit Note" left={Left} right={Right} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TextInput
          style={styles.title}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#9CA3AF"
        />
        <TextInput
          style={styles.body}
          placeholder="Write something..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#9CA3AF"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  content: { padding: 16 },
  back: { color: '#4B5563', fontWeight: '600' },
  save: { color: '#4F46E5', fontWeight: '700' },
  delete: { color: '#DC2626', fontWeight: '700' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  body: {
    minHeight: 300,
    fontSize: 16,
    color: '#111827',
    lineHeight: 22,
  },
});
