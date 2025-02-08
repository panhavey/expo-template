import React from "react";
import { View, Text, StyleSheet, FlatList, Pressable, TextInput } from "react-native";
import { Search, X } from "lucide-react-native";
import { colors, fontSize } from "@/constants";
import { PickerOption } from "./types";

interface PickerOptionsProps {
  options: PickerOption[];
  value?: string;
  onSelect: (option: PickerOption) => void;
  searchable?: boolean;
  searchQuery: string;
  onSearchChange: (text: string) => void;
  showHeader?: boolean;
  title?: string;
  onClose?: () => void;
}

export const PickerOptions = ({
  options,
  value,
  onSelect,
  searchable,
  searchQuery,
  onSearchChange,
  showHeader,
  title,
  onClose,
}: PickerOptionsProps) => {
  return (
    <View style={styles.container}>
      {showHeader && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={8}>
            <X color={colors.gray_900} size={24} />
          </Pressable>
        </View>
      )}
      {searchable && (
        <View style={styles.searchContainer}>
          <Search color={colors.gray_400} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={onSearchChange}
          />
        </View>
      )}
      <FlatList
        data={options}
        keyExtractor={(item) => item.value}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No options found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable 
            style={[styles.option, item.value === value && styles.selectedOption]} 
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.optionText, item.value === value && styles.selectedOptionText]}>
              {item.label}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.black_900,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black_900,
    padding: 0,
  },
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