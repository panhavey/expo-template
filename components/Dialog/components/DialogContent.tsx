import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DialogStyles } from "../types";

interface DialogContentProps extends DialogStyles {
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, contentStyle, contentTextStyle }) => {
  return (
    <View style={[styles.content, contentStyle]}>
      {typeof children === "string" ? <Text style={[styles.contentText, contentTextStyle]}>{children}</Text> : children}
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
