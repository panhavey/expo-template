import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DialogType } from "../types";
import { DialogTypeConfig } from "../constants/config";

interface DialogHeaderProps {
  title?: string;
  type: DialogType;
  icon?: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ title, type, icon }) => {
  const config = DialogTypeConfig[type];

  return (
    <>
      {icon && <View style={[styles.iconContainer, { backgroundColor: `${config.color}15` }]}>{icon}</View>}
      {title && <Text style={[styles.title, { color: config.color }]}>{title}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
});