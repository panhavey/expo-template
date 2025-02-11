import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, fontSize, borderRadius } from '@/constants';

export interface TagProps {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'filled';
}

export const Tag = ({ label, onRemove, variant = 'default' }: TagProps) => {
  return (
    <View style={[styles.container, variant === 'filled' && styles.filledContainer]}>
      <Text style={[styles.label, variant === 'filled' && styles.filledLabel]} numberOfLines={1}>
        {label}
      </Text>
      {onRemove && (
        <Pressable onPress={onRemove} hitSlop={8}>
          <X size={16} color={variant === 'filled' ? colors.white : colors.gray_600} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_100,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filledContainer: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.gray_900,
  },
  filledLabel: {
    color: colors.white,
  },
});