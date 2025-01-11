const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F5F5F5",
  neutral300: "rgba(236,236,236,0.97)",
  neutral400: "#BDBDBD",
  neutral500: "#9E9E9E",
  neutral600: "#757575",
  neutral700: "#616161",
  neutral800: "#424242",
  neutral900: "#212121",

  primary100: "#D7F2F4",
  primary200: "#BCE8ED",
  primary300: "#9EDDE6",
  primary400: "#80D2DF",
  primary500: "#62C7D8",
  primary600: "#43BAC4",

  secondary500: "#DCDDE9",
  secondary400: "#BCC0D6",
  secondary300: "#9196B9",
  secondary200: "#626894",
  secondary100: "#41476E",

  accent500: "#FFEED4",
  accent400: "#FFE1B2",
  accent300: "#FDD495",
  accent200: "#FBC878",
  accent100: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
