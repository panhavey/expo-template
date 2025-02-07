import React from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { colors, spacing } from "../constants";

interface FloatingLabelProps {
  children: React.ReactNode;
  hasValue: boolean;
  isFocused: boolean;
  labelStyle?: StyleProp<TextStyle>;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({ children, isFocused, hasValue, labelStyle }) => {
  const shouldFloat = hasValue || isFocused;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(shouldFloat ? 1 : 0, {
      duration: 120,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.wrapper}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: spacing.sm,
    top: -8,
    zIndex: 2,
  },
  wrapper: {
    paddingHorizontal: spacing.xs,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
});
