import React from "react";
import { StyleSheet, BackHandler } from "react-native";
import { Portal } from "@gorhom/portal";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  runOnJS,
  WithSpringConfig,
  WithTimingConfig,
} from "react-native-reanimated";
import { DialogContent } from "./components/DialogContent";
import { DialogActions } from "./components/DialogActions";
import { DialogHeader } from "./components/DialogHeader";
import { DialogProps } from "./types";

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  type = "default",
  icon,
  animation = "fade",
}) => {
  const opacity = useSharedValue(visible ? 1 : 0);
  const scale = useSharedValue(visible ? 1 : 0.3);
  const translateY = useSharedValue(visible ? 0 : 50);

  const springConfig: WithSpringConfig = {
    damping: 15,
    mass: 1,
    stiffness: 100,
  };

  const timingConfig: WithTimingConfig = {
    duration: 200,
  };

  React.useEffect(() => {
    if (visible) {
      // Show animations
      if (animation === "fade" || animation === "scale" || animation === "slideUp") {
        opacity.value = withTiming(1, timingConfig);
      }

      if (animation === "scale") {
        scale.value = withSpring(1, springConfig);
      }

      if (animation === "slideUp") {
        translateY.value = withSpring(0, springConfig);
      }
    } else {
      // Hide animations
      const hideDialog = () => {
        opacity.value = withTiming(0, timingConfig);
        if (animation === "scale") {
          scale.value = withSpring(0.3, springConfig);
        }
        if (animation === "slideUp") {
          translateY.value = withSpring(50, springConfig);
        }
      };
      hideDialog();
    }
  }, [visible, animation]);

  React.useEffect(() => {
    if (visible) {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        runOnJS(onClose)();
        return true;
      });
      return () => backHandler.remove();
    }
  }, [visible, onClose]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: opacity.value === 0 ? "none" : "auto",
  }));

  const dialogStyle = useAnimatedStyle(() => {
    switch (animation) {
      case "scale":
        return {
          transform: [{ scale: scale.value }],
        };
      case "slideUp":
        return {
          transform: [{ translateY: translateY.value }],
        };
      default:
        return {};
    }
  });

  return (
    <Portal>
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Animated.View style={[styles.dialog, dialogStyle]}>
          <DialogHeader title={title} type={type} icon={icon} />
          <DialogContent>{children}</DialogContent>
          <DialogActions confirmText={confirmText} cancelText={cancelText} onConfirm={onConfirm} onCancel={onCancel} onClose={onClose} type={type} />
        </Animated.View>
      </Animated.View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
