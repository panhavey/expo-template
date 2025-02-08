import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

interface LayoutRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle>({ x: 0, y: 0, width: 0, height: 0 });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    event.target.measureInWindow((x, y) => {
      setLayout({ x, y, width, height });
    });
  }, []);

  return { onLayout, ...layout };
};
