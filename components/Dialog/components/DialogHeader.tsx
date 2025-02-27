import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DialogHeaderStyles, DialogType } from "../types";
import { DialogTypeConfig } from "../constants/config";
import { getDialogIcon } from "../utils/icons";

interface DialogHeaderProps extends DialogHeaderStyles {
  title?: string;
  type: DialogType;
  icon?: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ title, type, icon, titleStyle, iconContainerStyle }) => {
  const config = DialogTypeConfig[type];
  const defaultIcon = getDialogIcon(type);

  return (
    <>
      <View style={[styles.iconContainer, { backgroundColor: icon ? undefined : `${config.color}15` }, iconContainerStyle]}>
        {icon ?? defaultIcon}
      </View>
      {title && <Text style={[styles.title, { color: config.color }, titleStyle]}>{title}</Text>}
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
