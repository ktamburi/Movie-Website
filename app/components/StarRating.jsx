"use client";

import { useMemo, useState } from "react";

export default function StarRating({ value = 0, onChange, max = 5 }) {
  const v = Number(value) || 0;
  const [hoverValue, setHoverValue] = useState(null);
  const displayValue = hoverValue ?? v;

  const stars = useMemo(() => Array.from({ length: max }), [max]);

  function getValueFromPointerEvent(e, index) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = x < rect.width / 2 ? 0.5 : 1;
    return Math.min(max, Math.max(0, index + half));
  }

  return (
    <div
      className="inline-flex items-center gap-1.5"
      role="slider"
      aria-label="Your rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={v}
      aria-valuetext={`${v} out of ${max}`}
      onMouseLeave={() => setHoverValue(null)}
    >
      {stars.map((_, i) => {
        const index = i;
        const fill = Math.min(1, Math.max(0, displayValue - index));
        return (
          <button
            key={i}
            type="button"
            className="grid size-[22px] cursor-pointer place-items-center rounded-md border-0 bg-transparent p-0 leading-none text-[color:var(--text-2)] outline-none focus:outline-none focus-visible:outline-none hover:[&_.star-outline]:text-[color-mix(in_srgb,var(--text-1),transparent_35%)]"
            onMouseMove={(e) => setHoverValue(getValueFromPointerEvent(e, index))}
            onClick={(e) => onChange?.(getValueFromPointerEvent(e, index))}
            aria-label={`Set rating (star ${i + 1})`}
          >
            <span className="star-icon relative inline-block h-[18px] w-[18px] text-lg leading-none" aria-hidden="true">
              <span className="star-fill absolute inset-0 overflow-hidden" style={{ width: `${Math.round(fill * 100)}%` }} />
              <span className="star-outline absolute inset-0 grid place-items-center text-[color-mix(in_srgb,var(--text-2),transparent_20%)]">
                ☆
              </span>
            </span>
          </button>
        );
      })}
      {v > 0 && (
        <button
          type="button"
          className="grid size-[18px] cursor-pointer place-items-center border-0 bg-transparent text-base leading-none text-[color:var(--text-2)] outline-none hover:text-[color:var(--text-1)] focus:outline-none focus-visible:outline-none"
          onClick={() => onChange?.(0)}
          aria-label="Clear rating"
        >
          ×
        </button>
      )}
    </div>
  );
}
