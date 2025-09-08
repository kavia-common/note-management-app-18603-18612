import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type NoteListItemProps = {
  title: string;
  contentPreview: string;
  updatedAt: string; // ISO string
  onPress?: () => void;
  onLongPress?: () => void;
};

export default function NoteListItem(props: NoteListItemProps) {
  const { title, contentPreview, updatedAt, onPress, onLongPress } = props;
  const updated = new Date(updatedAt);
  const subtitle =
    contentPreview.length > 100
      ? contentPreview.substring(0, 100) + '…'
      : contentPreview;

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>{title || 'Untitled'}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{subtitle || 'No content'}</Text>
      </View>
      <Text style={styles.time} numberOfLines={1}>
        {updated.toLocaleDateString()} {updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E4E6EB',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
 gap: 12,
  },
  pressed: { backgroundColor: '#F6F7F9' },
  texts: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  time: { fontSize: 12, color: '#9CA3AF' },
});
