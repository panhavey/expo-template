import { colors } from "@/constants";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ProgressBarProps {
  duration: number;
  onComplete: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ duration, onComplete }) => {
  const width = useSharedValue(100);

  useEffect(() => {
    width.value = withTiming(0, { duration }, (finished) => {
      if (finished) {
        runOnJS(onComplete)();
      }
    });
  }, [duration]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: colors.white,
  },
});
