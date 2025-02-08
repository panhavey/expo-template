import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { colors } from "@/constants";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  inputRef?: React.RefObject<TextInput>;
}

export const SearchInput = ({ value, onChangeText, inputRef }: SearchInputProps) => {
  return (
    <View style={styles.searchContainer}>
      <Search color={colors.gray_400} size={20} />
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor={colors.gray_400}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
