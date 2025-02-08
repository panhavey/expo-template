// More information check: https://docs.swmansion.com/react-native-reanimated/examples/switch
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { colors, spacing } from "../../constants";

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  style?: any;
  duration?: number;
  trackColors?: { on: string; off: string };
  // Add new props for thumb customization
  thumbStyle?: any;
  thumbOnIcon?: React.ReactNode;
  thumbOffIcon?: React.ReactNode;
}

export const Switch: React.FC<SwitchProps> = ({
  value: externalValue,
  onChange,
  style,
  duration = 300,
  trackColors,
  thumbStyle,
  thumbOnIcon,
  thumbOffIcon,
}) => {
  const [isOn, setIsOn] = useState(externalValue ?? false);
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const internalValue = useSharedValue(externalValue ?? false);

  useEffect(() => {
    if (externalValue !== undefined) {
      setIsOn(externalValue);
      internalValue.value = externalValue;
    }
  }, [externalValue]);

  const handlePress = () => {
    const newValue = !internalValue.value;
    internalValue.value = newValue;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  const defaultTrackColors = {
    on: colors.primary,
    off: colors.black_300,
    ...trackColors,
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(Number(internalValue.value), [0, 1], [defaultTrackColors.off, defaultTrackColors.on]);
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(internalValue.value), [0, 1], [0, width.value - height.value]);
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.track, style, trackAnimatedStyle]}
      >
        <Animated.View style={[styles.thumb, thumbStyle, thumbAnimatedStyle]}>{isOn ? thumbOnIcon : thumbOffIcon}</Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: spacing.xl * 2,
    height: spacing.xl,
    padding: spacing.xs,
  },
  thumb: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
