/**
 * SAP by Sali — Production Design System (v2) barrel.
 * Canonical, reusable components codifying docs/design/component-catalog.md.
 * Every new page builds from here. Token-only, RTL-aware, a11y-first,
 * motion via lib/motion.ts + globals.css utilities.
 */
export { Button, buttonVariants, type ButtonProps } from "./button";
export { Badge } from "./badge";
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
export { Input } from "./input";
export { EmptyState } from "./empty-state";
export { Skeleton, SkeletonRows } from "./skeleton";
// v2 additions — patterns + composites
export { Eyebrow } from "./eyebrow";
export { IconWell, type IconWellProps } from "./icon-well";
export { Pill, pillVariants, type PillProps } from "./pill";
export { Chip, chipVariants, type ChipProps } from "./chip";
export { Callout, calloutVariants, type CalloutProps } from "./callout";
export { SectionCard, type SectionCardProps } from "./section-card";
export { StatCard, StatGrid, type StatCardProps } from "./stat-card";
export { Breadcrumb, type Crumb } from "./breadcrumb";
export { PageHeader, type Metric, type PageHeaderProps } from "./page-header";
export { FilterButton, FilterBar, type FilterButtonProps } from "./filter-bar";
export { SearchField, type SearchFieldProps } from "./search-field";
