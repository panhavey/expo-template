import { Text, StyleSheet, ActivityIndicator, View, StyleProp, ViewStyle } from "react-native";
import { Pressable, type PressableProps } from "react-native-gesture-handler";
import { ReactNode } from "react";
import { colors } from "@/constants";

type ButtonType = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends PressableProps {
  children: ReactNode;
  disabled?: boolean;
  type?: ButtonType;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = ({
  onPress,
  onLongPress,
  children,
  disabled,
  type = "primary",
  loading,
  icon,
  iconPosition = "left",
  style,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={isDisabled}
      style={({ pressed }) => {
        const baseStyles = [
          styles.button,
          styles[`${type}Button`],
          pressed && styles[`${type}ButtonPressed`],
          isDisabled && styles.buttonDisabled,
          typeof style === "function" ? style({ pressed }) : style,
        ];
        return baseStyles;
      }}
      hitSlop={5}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={type === "outline" || type === "ghost" ? "#007AFF" : "#FFFFFF"} />
      ) : (
        <View style={[styles.content, iconPosition === "right" && styles.contentReverse]}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, styles[`${type}Text`], isDisabled && styles.textDisabled]}>{children}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1 }],
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: colors.gray_500,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
  ghostButtonPressed: {
    backgroundColor: "rgba(0, 122, 255, 0.08)",
    transform: [{ scale: 0.98 }],
  },
  ghostText: {
    color: "#007AFF",
  },
  primaryButtonPressed: {
    backgroundColor: "#007AFF",
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  secondaryButtonPressed: {
    backgroundColor: "#5856D6",
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  outlineButtonPressed: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    transform: [{ scale: 0.98 }],
  },

  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: "#007AFF",
  },
  textDisabled: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentReverse: {
    flexDirection: "row-reverse",
  },
  icon: {
    marginHorizontal: 8,
  },
});
