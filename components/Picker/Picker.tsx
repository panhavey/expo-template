import React, { useRef, useState, useCallback } from "react";
import { View, Text, StyleSheet, Modal, Pressable, TextInput } from "react-native";
import { Field } from "../Field";
import { borderRadius, colors, fontSize } from "@/constants";
import { ChevronDown, ChevronUp, X } from "lucide-react-native";
import { PickerOption, PickerProps, PickerValue } from "./types";
import { useLayout } from "@/hooks/useLayout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PickerOptions } from "./PickerOptions";
import { SearchInput } from "./SearchInput";
import { Tag } from "../Tag";
import { Trash2 } from "lucide-react-native";

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
  fieldNames = { label: "label", value: "value" },
  multiple,
  maxSelected,
  showSelectAll = false,
  showClear = false,
  onMaxSelected,
}: PickerProps) => {
  const [internalValue, setInternalValue] = useState<PickerValue | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const layout = useLayout();
  const insets = useSafeAreaInsets();

  const searchRef = useRef<TextInput>(null);

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;
  const mappedOptions = options.map((option) => ({
    label: option[fieldNames.label],
    value: option[fieldNames.value],
    original: option,
  }));

  const selectedOptions =
    multiple && Array.isArray(value)
      ? mappedOptions.filter((option) => value.includes(option.value))
      : mappedOptions.find((option) => option.value === value);

  const handleClose = () => {
    searchRef.current?.blur();
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleSelect = (option: PickerOption) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];

      if (maxSelected && currentValue.length >= maxSelected && !currentValue.includes(option.value)) {
        onMaxSelected?.();
        return;
      }

      const newValue = currentValue.includes(option.value) ? currentValue.filter((v) => v !== option.value) : [...currentValue, option.value];

      if (!isControlled) {
        setInternalValue(newValue);
      }
      externalOnChange?.(newValue, option.original);
    } else {
      if (!isControlled) {
        setInternalValue(option.value);
      }
      externalOnChange?.(option.value, option.original);
      handleClose();
    }
  };

  const renderValue = () => {
    if (multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0) {
      const maxVisibleTags = 2;
      const remainingCount = selectedOptions.length - maxVisibleTags;
      const visibleTags = selectedOptions.slice(0, maxVisibleTags);

      return (
        <View style={styles.tagsContainer}>
          {visibleTags.map((option) => (
            <Tag key={option.value} label={option.label} onRemove={() => handleSelect(option)} />
          ))}
          {remainingCount > 0 && (
            <View style={styles.counterTag}>
              <Text style={styles.counterText}>+{remainingCount}</Text>
            </View>
          )}
        </View>
      );
    }

    return (
      <Text style={[styles.text, !selectedOptions && styles.placeholder]}>
        {Array.isArray(selectedOptions) ? placeholder : selectedOptions?.label || placeholder}
      </Text>
    );
  };

  const filteredOptions = mappedOptions.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSelectAll = () => {
    const allValues = mappedOptions.map((option) => option.value);
    if (!isControlled) {
      setInternalValue(allValues);
    }
    externalOnChange?.(allValues);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue(multiple ? [] : undefined);
    }
    externalOnChange?.(multiple ? [] : (undefined as any));
  };

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
            <View style={styles.headerActions}>
              {showClear && value && (
                <Pressable onPress={handleClear} style={styles.headerButton}>
                  <Trash2 color={colors.gray_900} size={20} />
                </Pressable>
              )}
              <Pressable onPress={handleClose} hitSlop={8}>
                <X color={colors.gray_900} size={24} />
              </Pressable>
            </View>
          </View>
        )}

        {multiple && showSelectAll && (
          <Pressable style={styles.selectAllButton} onPress={handleSelectAll}>
            <Text style={styles.selectAllText}>Select All</Text>
          </Pressable>
        )}

        {searchable && <SearchInput value={searchQuery} onChangeText={setSearchQuery} inputRef={searchRef} />}

        <PickerOptions options={filteredOptions} value={value} onSelect={handleSelect} multiple={multiple} />
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
              <View style={styles.textContainer}>{renderValue()}</View>
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
    borderRadius: borderRadius.md,
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
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  selectAllButton: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_200,
  },
  selectAllText: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: "500",
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingVertical: 4,
    maxWidth: "100%",
  },
  counterTag: {
    backgroundColor: colors.gray_100,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    justifyContent: "center",
  },
  counterText: {
    fontSize: fontSize.sm,
    color: colors.gray_900,
  },
});
