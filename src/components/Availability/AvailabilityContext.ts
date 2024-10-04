import { createContext } from "react";
import { AvailabilityWithSlots } from "./types";

export const AvailabilityContext = createContext<AvailabilityWithSlots | null>(null);