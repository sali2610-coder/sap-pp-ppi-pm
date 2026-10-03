"use client";

import type { KeyboardEvent, ReactNode } from "react";

type ViewOption<T extends string> = { value: T; label: string; icon: ReactNode; count?: number };
const nf = new Intl.NumberFormat("he-IL");

/** Automatic, RTL-aware tabs. Only the selected tab belongs in the Tab order. */
export function ViewTabs<T extends string>({ id, value, options, onChange }: {
  id: string;
  value: T;
  options: readonly ViewOption<T>[];
  onChange: (value: T) => void;
}) {
  function move(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = options.length - 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const forward = event.key === (rtl ? "ArrowLeft" : "ArrowRight");
      next = (index + (forward ? 1 : -1) + options.length) % options.length;
    } else return;
    event.preventDefault();
    onChange(options[next].value);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  }

  return (
    <div className="nxd-tabs" role="tablist" aria-label="תצוגה">
      {options.map((option, index) => (
        <button
          key={option.value}
          id={`${id}-${option.value}`}
          type="button"
          role="tab"
          className="nu-tab"
          aria-controls={`${id}-panel`}
          aria-selected={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          onClick={() => onChange(option.value)}
          onKeyDown={(event) => move(event, index)}
        >
          {option.icon}{option.label}
          {option.count ? <b>{nf.format(option.count)}</b> : null}
        </button>
      ))}
    </div>
  );
}
