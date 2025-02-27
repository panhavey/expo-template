import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DialogContentProps {
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children }) => {
  return (
    <View style={styles.content}>
      {typeof children === "string" ? <Text style={styles.contentText}>{children}</Text> : children}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginBottom: 24,
    width: "100%",
  },
  contentText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    lineHeight: 24,
  },
});