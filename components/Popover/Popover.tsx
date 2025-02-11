import React from "react";
import { View, StyleSheet } from "react-native";
import { Portal } from "@gorhom/portal";
import { useLayout } from "@/hooks/useLayout";
import { PopoverProps } from "./types";
import { PopoverContent } from "./PopoverContent";
import { PopoverOverlay } from "./PopoverOverlay";
import { getPopoverPosition } from "./utils";

export const Popover = ({ children, content, isOpen, onClose, fullScreen, placement = "bottom", position, offset }: PopoverProps) => {
  const layout = useLayout();

  const popoverPosition = position
    ? getPopoverPosition(layout, placement, offset)
    : !fullScreen && layout.width && layout.height
    ? {
        ...getPopoverPosition(layout, placement, offset),
        position: "absolute",
      }
    : undefined;

  return (
    <>
      <View onLayout={layout.onLayout}>{children}</View>

      {isOpen && (
        <Portal name="popover">
          <View style={styles.portalContainer}>
            <PopoverOverlay onClose={onClose} fullScreen={fullScreen}>
              <PopoverContent fullScreen={fullScreen} style={[styles.content, popoverPosition]}>
                {content}
              </PopoverContent>
            </PopoverOverlay>
          </View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  portalContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
  },
  content: {
    zIndex: 1001,
    elevation: 1001,
  },
});
