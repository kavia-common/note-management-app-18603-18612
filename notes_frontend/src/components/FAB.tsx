import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type FABProps = {
  onPress: () => void;
  label?: string;
};

export default function FAB({ onPress, label = '+' }: FABProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  label: { color: '#fff', fontWeight: '800', fontSize: 28, lineHeight: 28 },
});
