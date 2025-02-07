import { borderRadius, colors, fontSize, fontWeight, lineHeight, margins, spacing } from "@/components/constants";

const baseTheme = {
  margins,
  spacing,
  typography: {
    fontSize,
    fontWeight,
    lineHeight,
  },
  borderRadius,
} as const;

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    // Base Colors
    base: colors.white,
    baseAlt: colors.gray_100,
    surface: colors.white,
    surfaceAlt: colors.gray_100,

    // Content Colors
    content: colors.black_900,
    contentSubtle: colors.gray_700,
    contentMuted: colors.gray_500,
    contentDisabled: colors.gray_400,
    contentInverse: colors.white,

    // Border Colors
    borderDefault: colors.gray_300,
    borderFocus: colors.blue_600,
    borderError: colors.red_600,
    borderSuccess: colors.green_600,

    // Action Colors
    actionPrimary: colors.blue_600,
    actionPrimaryHover: colors.blue_700,
    actionPrimaryPressed: colors.blue_800,
    actionPrimaryDisabled: colors.blue_300,
    actionPrimaryContent: colors.white,

    actionSecondary: colors.purple_600,
    actionSecondaryHover: colors.purple_700,
    actionSecondaryPressed: colors.purple_800,
    actionSecondaryDisabled: colors.purple_300,
    actionSecondaryContent: colors.white,

    // Feedback Colors
    feedbackSuccess: colors.green_600,
    feedbackSuccessContent: colors.white,
    feedbackError: colors.red_600,
    feedbackErrorContent: colors.white,
    feedbackWarning: colors.yellow_600,
    feedbackWarningContent: colors.black_900,
    feedbackInfo: colors.blue_600,
    feedbackInfoContent: colors.white,

    // Interactive Elements
    interactive: colors.blue_600,
    interactiveHover: colors.blue_700,
    interactivePressed: colors.blue_800,
    interactiveDisabled: colors.gray_400,
    interactiveContent: colors.white,

    // Overlay Colors
    overlay: "rgba(0, 0, 0, 0.5)",
    overlayContent: colors.white,

    // System Colors
    focus: colors.blue_600,
    placeholder: colors.gray_500,
    disabled: colors.gray_300,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
} as const;

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    // Base Colors
    base: colors.black_900,
    baseAlt: colors.black_800,
    surface: colors.black_800,
    surfaceAlt: colors.black_700,

    // Content Colors
    content: colors.gray_100,
    contentSubtle: colors.gray_300,
    contentMuted: colors.gray_500,
    contentDisabled: colors.gray_700,
    contentInverse: colors.black_900,

    // Border Colors
    borderDefault: colors.gray_800,
    borderFocus: colors.blue_500,
    borderError: colors.red_500,
    borderSuccess: colors.green_500,

    // Action Colors
    actionPrimary: colors.blue_500,
    actionPrimaryHover: colors.blue_400,
    actionPrimaryPressed: colors.blue_300,
    actionPrimaryDisabled: colors.blue_800,
    actionPrimaryContent: colors.black_900,

    actionSecondary: colors.purple_500,
    actionSecondaryHover: colors.purple_400,
    actionSecondaryPressed: colors.purple_300,
    actionSecondaryDisabled: colors.purple_800,
    actionSecondaryContent: colors.black_900,

    // Feedback Colors
    feedbackSuccess: colors.green_500,
    feedbackSuccessContent: colors.black_900,
    feedbackError: colors.red_500,
    feedbackErrorContent: colors.white,
    feedbackWarning: colors.yellow_500,
    feedbackWarningContent: colors.black_900,
    feedbackInfo: colors.blue_500,
    feedbackInfoContent: colors.black_900,

    // Interactive Elements
    interactive: colors.blue_500,
    interactiveHover: colors.blue_400,
    interactivePressed: colors.blue_300,
    interactiveDisabled: colors.gray_700,
    interactiveContent: colors.black_900,

    // Overlay Colors
    overlay: "rgba(0, 0, 0, 0.7)",
    overlayContent: colors.white,

    // System Colors
    focus: colors.blue_500,
    placeholder: colors.gray_600,
    disabled: colors.gray_700,
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2.0,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      elevation: 7,
    },
  },
} as const;
