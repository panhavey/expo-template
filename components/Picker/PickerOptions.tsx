import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { colors } from "@/constants";
import { PickerOptionsProps, PickerOption } from "./types";
import { Check } from "lucide-react-native";

const OptionItem = memo(
  ({
    item,
    selected,
    disabled,
    onSelect,
  }: {
    item: PickerOption;
    selected: boolean;
    disabled: boolean;
    onSelect: (option: PickerOption) => void;
  }) => (
    <Pressable
      style={[styles.option, selected && styles.selectedOption, disabled && styles.disabledOption]}
      onPress={() => !disabled && onSelect(item)}
      disabled={disabled}
    >
      <Text style={[styles.optionText, selected && styles.selectedOptionText, disabled && styles.disabledOptionText]}>{item.label}</Text>
      {selected && <Check size={20} color={colors.primary} />}
    </Pressable>
  )
);

export const PickerOptions = ({ options, value, onSelect, multiple, maxSelected }: PickerOptionsProps) => {
  const isSelected = useCallback(
    (itemValue: string) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(itemValue);
      }
      return itemValue === value;
    },
    [multiple, value]
  );

  const isMaxReached = multiple && Array.isArray(value) && maxSelected && value.length >= maxSelected;

  const renderItem = useCallback(
    ({ item }: { item: PickerOption }) => {
      const selected = isSelected(item.value);
      const disabled = !!isMaxReached && !selected;

      return <OptionItem item={item} selected={selected} disabled={disabled} onSelect={onSelect} />;
    },
    [isSelected, isMaxReached, onSelect]
  );

  const keyExtractor = useCallback((item: PickerOption) => item.value, []);

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No options found</Text>
      </View>
    ),
    []
  );

  return (
    <FlatList
      data={options}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: colors.primary + "10",
  },
  optionText: {
    fontSize: 16,
    color: colors.black_900,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: "600",
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: colors.gray_500,
    fontSize: 14,
  },
  disabledOption: {
    opacity: 0.5,
  },
  disabledOptionText: {
    color: colors.gray_400,
  },
});
