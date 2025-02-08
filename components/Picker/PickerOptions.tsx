import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { colors } from "@/constants";
import { PickerOptionsProps } from "./types";

export const PickerOptions = ({ options, value, onSelect }: PickerOptionsProps) => {
  return (
    <FlatList
      data={options}
      keyExtractor={(item) => item.value}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No options found</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable style={[styles.option, item.value === value && styles.selectedOption]} onPress={() => onSelect(item)}>
          <Text style={[styles.optionText, item.value === value && styles.selectedOptionText]}>{item.label}</Text>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
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
});
