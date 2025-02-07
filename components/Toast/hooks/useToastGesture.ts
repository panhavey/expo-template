import { useCallback, useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue, withSpring, withTiming, Easing, withSequence } from "react-native-reanimated";

type AnimationType = "spring" | "ease" | "bounce" | "slide";

interface AnimationConfig {
  duration?: number;
  damping?: number;
  stiffness?: number;
}

export const useToastGesture = (
  onDismiss: () => void,
  position: "top" | "bottom" = "bottom",
  animation: AnimationType = "spring",
  config: AnimationConfig = {}
) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(position === "top" ? -100 : 100);
  const opacity = useSharedValue(0);

  const getAnimation = useCallback(
    (value: number, isExit = false) => {
      "worklet";
      const springConfig = {
        damping: config.damping || 12,
        stiffness: config.stiffness || 100,
        mass: isExit ? 0.3 : 0.5,
        velocity: isExit ? 20 : 0,
      };

      switch (animation) {
        case "bounce":
          return withSpring(value, {
            damping: 4,
            stiffness: 200,
            mass: 0.4,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          });
        case "slide":
          return withTiming(value, {
            duration: config.duration || 400,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          });
        default: // ease
          return withTiming(value, {
            duration: config.duration || 300,
            easing: Easing.bezier(0.42, 0, 0.58, 1),
          });
      }
    },
    [animation, config]
  );

  const dismiss = useCallback(() => {
    "worklet";
    const exitY = position === "top" ? -100 : 100;
    translateY.value = getAnimation(exitY, true);
    opacity.value = getAnimation(0, true);
    translateX.value = getAnimation(0, true);
  }, [getAnimation, position]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      "worklet";
      translateX.value = event.translationX;
      opacity.value = Math.max(0, 1 - Math.abs(event.translationX) / 200);
    })
    .onEnd((event) => {
      "worklet";
      if (Math.abs(event.translationX) > 100) {
        dismiss();
        runOnJS(onDismiss)();
      } else {
        translateX.value = withSequence(getAnimation(0), getAnimation(0));
        opacity.value = getAnimation(1);
      }
    });

  useEffect(() => {
    translateY.value = getAnimation(0);
    opacity.value = getAnimation(1);
  }, []);

  return {
    gesture,
    translateX,
    translateY,
    opacity,
    dismiss,
  };
};
