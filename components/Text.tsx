import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from "react-native";
import { colors, fontSize } from "../constants";

type TextType = "title" | "subtitle" | "caption" | "button" | "default";
type TextLang = "en" | "kh";

export type TextProps = RNTextProps & {
  type?: TextType;
  lang?: TextLang;
};

const fontFamily: Record<TextType, Record<TextLang, string>> = {
  default: {
    en: "Inter_400Regular",
    kh: "KantumruyPro_400Regular",
  },
  title: {
    en: "Inter_700Bold",
    kh: "KantumruyPro_700Bold",
  },
  subtitle: {
    en: "Inter_700Bold",
    kh: "KantumruyPro_700Bold",
  },
  caption: {
    en: "Inter_400Regular",
    kh: "KantumruyPro_400Regular",
  },
  button: {
    en: "Inter_600SemiBold",
    kh: "KantumruyPro_600SemiBold",
  },
} as const;

const fs: Record<TextType, number> = {
  default: fontSize.sm,
  title: fontSize.xxl,
  subtitle: fontSize.lg,
  caption: fontSize.xs,
  button: fontSize.md,
};

export function Text({ style, type = "default", lang = "en", ...rest }: TextProps) {
  return <RNText style={[styles.base, { fontSize: fs[type] }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  base: {
    color: colors.black_900,
  },
});
