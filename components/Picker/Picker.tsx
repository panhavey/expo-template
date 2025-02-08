import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Modal, FlatList, Pressable, TextInput, Keyboard } from "react-native";
import { Field } from "../Field";
import { colors, fontSize } from "@/constants";
import { ChevronDown, ChevronUp, Search } from "lucide-react-native";
import { PickerOption, PickerProps } from "./types";
import { useLayout } from "@/hooks/useLayout";
import { X } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  mode = "modal",
}: PickerProps) => {
  const [internalValue, setInternalValue] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const layout = useLayout();
  const insets = useSafeAreaInsets();

  const searchRef = useRef<TextInput>(null);

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
    console.log("press");

    searchRef.current?.blur();
    setSearchQuery("");
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderOptions = () => {
    const OptionsContent = (
      <View
        style={[
          styles.optionsContainer,
          mode === "normal" && {
            position: "absolute",
            top: layout.y + layout.height * 2 + 5,
            left: layout.x,
            width: layout.width,
            zIndex: 1001,
          },
          mode === "fullModal" && {
            ...styles.fullModal,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        {mode === "fullModal" && (
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{label || "Select Option"}</Text>
            <Pressable onPress={handleClose} hitSlop={8}>
              <X color={colors.gray_900} size={24} />
            </Pressable>
          </View>
        )}
        {searchable && (
          <View style={styles.searchContainer}>
            <Search color={colors.gray_400} size={20} />
            <TextInput
              ref={searchRef}
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              // autoFocus={mode !== "normal"}
            />
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
    );

    if (mode === "normal") {
      return (
        <Pressable style={styles.normalBlocker} onPress={handleClose}>
          {OptionsContent}
        </Pressable>
      );
    }

    return OptionsContent;
  };

  return (
    <>
      <View onLayout={layout.onLayout} style={mode === "normal" ? { zIndex: 1000 } : undefined}>
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
      </View>

      {mode === "normal" && isOpen && (
        <Modal transparent visible={isOpen} onRequestClose={handleClose}>
          {renderOptions()}
        </Modal>
      )}

      {mode !== "normal" && (
        <Modal visible={isOpen} transparent={mode !== "fullModal"} animationType="fade" onRequestClose={handleClose}>
          <Pressable style={[styles.overlay, mode === "fullModal" && styles.fullOverlay]} onPress={handleClose}>
            {renderOptions()}
          </Pressable>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    minHeight: 24,
    justifyContent: "center",
  },
  text: {
    fontSize: fontSize.md,
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
  fullOverlay: {
    padding: 0,
    backgroundColor: colors.white,
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: colors.gray_200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullModal: {
    flex: 1,
    borderRadius: 0,
    maxHeight: "100%",
    borderWidth: 0,
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
  normalBlocker: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
  },
  modalTitle: {
    fontSize: fontSize.md,
    fontWeight: "500",
    color: colors.black_900,
  },
  bottomSheetBackground: {
    backgroundColor: colors.white,
  },
  bottomSheetContent: {
    flex: 1,
  },
  bottomSheetIndicator: {
    backgroundColor: colors.gray_400,
    width: 40,
  },
});
