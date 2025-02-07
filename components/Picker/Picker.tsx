import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList, Pressable, TextInput } from "react-native";
import { Field, FieldVariants } from "../Field";
import { colors } from "@/constants";
import { ChevronDown, ChevronUp, Search } from "lucide-react-native";
import { PickerOption, PickerProps } from "./types";

export const Picker = ({
  label,
  value: externalValue,
  options,
  onChange: externalOnChange,
  placeholder = "Select an option",
  error,
  variant = "default",
  disabled,
  left,
  right,
  searchable,
}: PickerProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: PickerOption) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }
    externalOnChange?.(option.value);
    handleClose();
  };

  const handleClose = () => {
    setSearchQuery("");
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Field.Root variant={variant} error={error}>
        <Field.Label label={label} />
        <Pressable onPress={() => !disabled && setIsOpen(true)}>
          <Field.Content left={left} right={right || (isOpen ? <ChevronUp color={colors.gray_400} /> : <ChevronDown color={colors.gray_400} />)}>
            <View style={styles.textContainer}>
              <Text style={[styles.text, !selectedOption && styles.placeholder]}>{selectedOption?.label || placeholder}</Text>
            </View>
          </Field.Content>
        </Pressable>
        <Field.Error error={error} />
      </Field.Root>

      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={handleClose}>
        <Pressable style={styles.overlay} onPress={handleClose}>
          <View style={styles.modal}>
            {searchable && (
              <View style={styles.searchContainer}>
                <Search color={colors.gray_400} size={20} />
                <TextInput style={styles.searchInput} placeholder="Search..." value={searchQuery} onChangeText={setSearchQuery} autoFocus />
              </View>
            )}
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No options found</Text>
                </View>
              }
              renderItem={({ item }) => (
                <Pressable style={[styles.option, item.value === value && styles.selectedOption]} onPress={() => handleSelect(item)}>
                  <Text style={[styles.optionText, item.value === value && styles.selectedOptionText]}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    minHeight: 24,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: colors.black_900,
  },
  placeholder: {
    color: colors.gray_500,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 8,
    maxHeight: "80%",
    overflow: "hidden",
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
