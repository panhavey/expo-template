import React from "react";
import { StyleSheet, BackHandler, Pressable } from "react-native";
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
import { spacing } from "@/constants";

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
  dismissible = true,
  overlayStyle,
  dialogStyle,
  titleStyle,
  contentStyle,
  contentTextStyle,
  buttonContainerStyle,
  confirmButtonStyle,
  cancelButtonStyle,
  confirmTextStyle,
  cancelTextStyle,
  iconContainerStyle,
  overlayColor,
  width = "85%",
  maxWidth = 400,
  padding = 24,
  borderRadius = 16,
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

  const overlayAnimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    pointerEvents: opacity.value === 0 ? "none" : "auto",
  }));

  const dialogAnimStyle = useAnimatedStyle(() => {
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

  const handleBackdropPress = () => {
    if (dismissible) {
      runOnJS(onClose)();
    }
  };

  return (
    <Portal>
      <Animated.View style={[styles.overlay, overlayColor && { backgroundColor: overlayColor }, overlayStyle, overlayAnimStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleBackdropPress} />
        <Animated.View
          style={[
            styles.dialog,
            //@ts-ignore
            {
              width,
              maxWidth,
              padding,
              borderRadius,
            },
            dialogStyle,
            dialogAnimStyle,
          ]}
        >
          <DialogHeader title={title} type={type} icon={icon} titleStyle={titleStyle} iconContainerStyle={iconContainerStyle} />
          <DialogContent contentStyle={contentStyle} contentTextStyle={contentTextStyle}>
            {children}
          </DialogContent>
          <DialogActions
            confirmText={confirmText}
            cancelText={cancelText}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onClose={onClose}
            type={type}
            buttonContainerStyle={buttonContainerStyle}
            confirmButtonStyle={confirmButtonStyle}
            cancelButtonStyle={cancelButtonStyle}
            confirmTextStyle={confirmTextStyle}
            cancelTextStyle={cancelTextStyle}
          />
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
    padding: spacing.lg,
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
