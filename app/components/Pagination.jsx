"use client";

function IconChevronLeft({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12.5 4.75 7.5 10l5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7.5 4.75 12.5 10l-5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronsLeft({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M11.75 4.75 6.75 10l5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.25 4.75 11.25 10l5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronsRight({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M8.25 4.75 13.25 10l-5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.75 4.75 8.75 10l-5 5.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function buildPages({ page, pageCount, siblingCount = 1 }) {
  const safe = Math.min(Math.max(1, page), pageCount);
  if (pageCount <= 7) return { safe, items: Array.from({ length: pageCount }, (_, i) => i + 1) };

  const left = Math.max(2, safe - siblingCount);
  const right = Math.min(pageCount - 1, safe + siblingCount);
  const items = [1];

  if (left > 2) items.push("…");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < pageCount - 1) items.push("…");

  items.push(pageCount);
  return { safe, items };
}

export default function Pagination({
  page,
  pageCount,
  onPageChange,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  showPageSize = false,
}) {
  if (!pageCount) return null;

  const { safe, items } = buildPages({ page, pageCount, siblingCount: 1 });

  const iconBtn =
    "inline-flex size-8 items-center justify-center rounded-md text-[color:var(--text-2)] transition hover:text-[color:var(--text-1)] disabled:cursor-not-allowed disabled:opacity-45";
  const numBtn =
    "inline-flex size-8 items-center justify-center rounded-md text-sm font-semibold text-[color:var(--text-2)] transition hover:text-[color:var(--text-1)]";
  const numActive =
    "inline-flex size-8 items-center justify-center rounded-md bg-[color:var(--primary)] text-sm font-semibold text-white";

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-6">
      <div className="flex items-center justify-center gap-1">
        <button type="button" className={iconBtn} onClick={() => onPageChange(1)} disabled={safe <= 1} aria-label="First page">
          <IconChevronsLeft className="size-4" />
        </button>
        <button
          type="button"
          className={iconBtn}
          onClick={() => onPageChange(safe - 1)}
          disabled={safe <= 1}
          aria-label="Previous page"
        >
          <IconChevronLeft className="size-4" />
        </button>

        <div className="mx-1 flex items-center gap-1">
          {items.map((it, idx) =>
            it === "…" ? (
              <span key={`e-${idx}`} className="inline-flex size-8 items-center justify-center text-sm text-[color:var(--text-2)]">
                …
              </span>
            ) : (
              <button
                key={it}
                type="button"
                className={it === safe ? numActive : numBtn}
                onClick={() => onPageChange(it)}
                aria-current={it === safe ? "page" : undefined}
              >
                {it}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          className={iconBtn}
          onClick={() => onPageChange(safe + 1)}
          disabled={safe >= pageCount}
          aria-label="Next page"
        >
          <IconChevronRight className="size-4" />
        </button>
        <button
          type="button"
          className={iconBtn}
          onClick={() => onPageChange(pageCount)}
          disabled={safe >= pageCount}
          aria-label="Last page"
        >
          <IconChevronsRight className="size-4" />
        </button>
      </div>

      {showPageSize && pageSize && pageSizeOptions?.length && (
        <label className="flex items-center gap-2 text-sm text-[color:var(--text-2)]">
          <span>Per page</span>
          <select
            className="pagination-select rounded-[10px] border border-[color:var(--border)] bg-[color:var(--surface-2)] px-3 py-2 text-sm text-[color:var(--text-1)] disabled:opacity-60"
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            disabled={!onPageSizeChange}
            title={!onPageSizeChange ? "Per-page selection is currently disabled" : undefined}
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={String(n)}>
                {n}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
