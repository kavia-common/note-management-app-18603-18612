import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import FAB from '../components/FAB';
import NoteListItem from '../components/NoteListItem';
import EmptyState from '../components/EmptyState';
import { Note, fromStored, toStored } from '../types';
import { readNotes, writeNotes } from '../storage/storage';
import { uid } from '../utils/id';

type NoteListScreenProps = {
  onCreate: (note: Note) => void;
  onOpen: (note: Note) => void;
};

export default function NoteListScreen({ onCreate, onOpen }: NoteListScreenProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await readNotes();
      setNotes(stored.map(fromStored).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const createNew = useCallback(async () => {
    const now = new Date();
    const newNote: Note = {
      id: uid(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    // persist immediately so edit screen can update existing id
    const updated = [newNote, ...notes];
    setNotes(updated);
    await writeNotes(updated.map(toStored));
    onCreate(newNote);
  }, [notes, onCreate]);

  const onDelete = useCallback((note: Note) => {
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = notes.filter(n => n.id !== note.id);
          setNotes(updated);
          await writeNotes(updated.map(toStored));
        },
      },
    ]);
  }, [notes]);

  const renderItem = useCallback(({ item }: { item: Note }) => (
    <NoteListItem
      title={item.title}
      contentPreview={item.content}
      updatedAt={item.updatedAt.toISOString()}
      onPress={() => onOpen(item)}
      onLongPress={() => onDelete(item)}
    />
  ), [onOpen, onDelete]);

  const listEmpty = useMemo(() => !loading && notes.length === 0, [loading, notes.length]);

  return (
    <View style={styles.container}>
      <Header title="My Notes" />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={listEmpty ? <EmptyState /> : null}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={notes.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : undefined}
      />
      <FAB onPress={createNew} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
});
