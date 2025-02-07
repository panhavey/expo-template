import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Text } from "../../Text";
import { useToastGesture } from "../hooks/useToastGesture";
import { ProgressBar } from "./ProgressBar";
import { ToastItemProps } from "../types";
import { getToastIcon } from "../utils/icons";
import { colors, spacing } from "@/constants";

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type = "info",
  duration = 3000,
  position = "bottom",
  animation = "slide",
  showProgress,
  animationConfig,
  icon,
  action,
  onDismiss,
  style,
}) => {
  const { gesture, translateX, translateY, opacity, dismiss } = useToastGesture(onDismiss, position, animation, animationConfig);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (duration > 0) {
      timer = setTimeout(() => {
        dismiss();
        onDismiss();
      }, duration);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, dismiss, onDismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleActionPress = () => {
    action?.onPress();
    dismiss();
  };

  const containerStyle = [
    styles.container,
    styles[`${type}Container`],
    position === "top" ? styles.topPosition : styles.bottomPosition,
    style,
    animatedStyle,
  ];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={containerStyle}>
        <View style={styles.content}>
          {icon || getToastIcon(type)}
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
          {action && (
            <Pressable onPress={handleActionPress} style={styles.actionButton}>
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          )}
        </View>
        {showProgress && <ProgressBar duration={duration} onComplete={onDismiss} />}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    padding: spacing.md,
    borderRadius: spacing.sm,
    overflow: "hidden",
  },
  successContainer: {
    backgroundColor: colors.success,
  },
  errorContainer: {
    backgroundColor: colors.error,
  },
  infoContainer: {
    backgroundColor: colors.info,
  },
  warningContainer: {
    backgroundColor: colors.warning,
  },
  topPosition: {
    top: 32,
  },
  bottomPosition: {
    bottom: 32,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  message: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
