"use client";

/** Reader view mode shared from BookReader down to the section renderer.
 *  bilingual = EN‖HE study spread · hebrew = single-column flowing comfort. */
import { createContext, useContext } from "react";
import type { ReaderView } from "@/lib/continuity-store";

export const ReaderViewContext = createContext<ReaderView>("bilingual");
export const useReaderView = () => useContext(ReaderViewContext);

/** Page View (paginated) forces every chapter open so content can flow into pages. */
export const PageModeContext = createContext<boolean>(false);
export const usePageMode = () => useContext(PageModeContext);
