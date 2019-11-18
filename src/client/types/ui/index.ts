export type LineHeights =
  | "0"
  | "16"
  | "20"
  | "24"
  | "28"
  | "36"
  | "40"
  | "48";

export type tFontSize = 
  | "xx-small"
  | "x-small"
  | "small"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large"
  | "smaller"
  | "larger"
  | "initial";


export type FontWeight = "400" | "500" | "600" | "800";

export interface tColor {
  blackColor: string
  veryDarkGray: string
  darkGray: string,
  primaryDefault: string,
  verylightGray: string,
  whiteColor: string,
  error: string,
  success: string,
  warning: string
}

export interface UserData {
  data: {
    createdAt: string
    password: string
    subscriptions: string[]
    updatedAt: string
    username: string
    firstname: string, 
		surname: string, 
		address: string, 
		phone: string, 
    _id: string

  }
}

export type Space =
  | "0"
  | "2"
  | "4"
  | "8"
  | "12"
  | "16"
  | "18"
  | "20"
  | "24"
  | "28"
  | "32"
  | "36"
  | "40"
  | "42"
  | "44"
  | "48"
  | "56"
  | "64"
  | "72"
  | "76"
  | "80"
  | "88"
  | "96"
  | "104"
  | "200"
  | "400"

  export type Size =
  | "16"
  | "20"
  | "24"
  | "24"
  | "40"
  | "48"
  | "64"
  | "70"
  | "90"
  | "200"
  | "300"
  | "400"
  | "1290"
