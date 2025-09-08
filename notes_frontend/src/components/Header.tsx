import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({ title, left, right }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.side}>{left}</View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({ ios: 54, android: 24, default: 16 }),
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#111827' },
  side: { width: 64, minHeight: 24, justifyContent: 'center' },
  right: { alignItems: 'flex-end' },
});
