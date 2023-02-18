import type { ImageProps } from "next/image"

import georgieImage from "../assets/ambassadors/georgie.jpg"
import moominImage from "../assets/ambassadors/moomin.jpg"
import stompyImage from "../assets/ambassadors/stompy.jpg"

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type DateStringYear = `19${ZeroToNine}${ZeroToNine}` | `20${ZeroToNine}${ZeroToNine}`
type DateStringMonth = `0${OneToNine}` | `1${0 | 1 | 2}`
type DateStringYearMonth = `${DateStringYear}-${DateStringMonth}`
type DateStringDay = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`
type DateString = `${DateStringYearMonth}-${DateStringDay}`

export const iucnStatuses = {
  EX: "Extinct",
  EW: "Extinct in the Wild",
  CR: "Critically Endangered",
  EN: "Endangered",
  VU: "Vulnerable",
  NT: "Near Threatened",
  LC: "Least Concern",
  DD: "Data Deficient",
  NE: "Not Evaluated",
};

export const iucnFlags = {
  decreasing: "with decreasing population trend",
};

type IUCNStatuses = keyof typeof iucnStatuses
type ICUNFlags = keyof typeof iucnFlags
type IUCNStatus = IUCNStatuses | `${IUCNStatuses}/${ICUNFlags}`

type Image = { src: ImageProps["src"], alt: string }

type Nullable<T> = T | null

export type Ambassador = {
  name: string
  species: string
  scientific: string
  sex: Nullable<"Male" | "Female">
  birth: Nullable<DateStringYear | DateStringYearMonth | DateString>
  arrival: Nullable<DateStringYear | DateStringYearMonth | DateString>
  iucn: IUCNStatus
  story: string
  mission: string
  images: [Image, ...Image[]]
  homepage: Nullable<{ title: string, description: string }>
};

const ambassadors: Record<string, Ambassador> = {
  moomin: {
    name: "Moomin",
    species: "Chinchilla",
    scientific: "Chinchilla lanigera",
    sex: "Male",
    birth: "2017",
    arrival: "2021-04",
    iucn: "EN/decreasing",
    story: "Rehomed from a local pet owner.",
    mission: "He is an ambassador for the exploitation of wildlife in the fur trade.",
    images: [
      { src: moominImage, alt: "Moomin the Chinchilla" },
    ],
    homepage: {
      title: "Moomin is Movin' In!",
      description: "He is an ambassador for how the fur trade has affected his species and many others.",
    },
  },
  georgie: {
    name: "Georgie",
    species: "African Bullfrog",
    scientific: "Pyxicephalus adspersus",
    sex: "Male",
    birth: "2021",
    arrival: "2021-04",
    iucn: "LC/decreasing",
    story: "Georgie was part of an educational program at a zoo and was rehomed to Alveus.",
    mission: "He is an ambassador for the wildlife trade and how chytrid fungus is affecting amphibian species worldwide.",
    images: [
      { src: georgieImage, alt: "Georgie the African Bullfrog" },
    ],
    homepage: {
      title: "Georgie!",
      description: "He is here to teach all about threats to his species and to amphibians worldwide.",
    },
  },
  stompy: {
    name: "Stompy",
    species: "Emu",
    scientific: "Dromaius novaehollandiae",
    sex: "Male",
    birth: "2021-02-14",
    arrival: "2021-04",
    iucn: "LC",
    story: "Stompy was hatched in captivity and Maya hand was raised to be the first Alveus ambassador.",
    mission: "Stopping exotic meat trade, traditional medicine, and over exploitation of animal products in cosmetics.",
    images: [
      { src: stompyImage, alt: "Stompy the Emu" },
    ],
    homepage: {
      title: "Stompy!",
      description: "He is an ambassador for how the exotic meat trade & use of animal products in cosmetics has affected his species and many others.",
    },
  },
};

export default ambassadors;
