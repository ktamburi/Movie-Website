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
      className="star-rating"
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
        const fill = Math.min(1, Math.max(0, displayValue - index)); // 0..1
        return (
          <button
            key={i}
            type="button"
            className="star"
            onMouseMove={(e) => setHoverValue(getValueFromPointerEvent(e, index))}
            onClick={(e) => onChange?.(getValueFromPointerEvent(e, index))}
            aria-label={`Set rating (star ${i + 1})`}
          >
            <span className="star-icon" aria-hidden="true">
              <span className="star-fill" style={{ width: `${Math.round(fill * 100)}%` }} />
              <span className="star-outline">☆</span>
            </span>
          </button>
        );
      })}
      {v > 0 && (
        <button type="button" className="star-clear" onClick={() => onChange?.(0)} aria-label="Clear rating">
          ×
        </button>
      )}
    </div>
  );
}

