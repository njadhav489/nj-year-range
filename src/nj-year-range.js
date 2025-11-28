/* ================================
   MAIN YEAR RANGE PICKER FUNCTION
   ================================ */
function createYearRangePicker({
  inputEl,
  dropdownEl,
  gridEl,
  applyEl,
  clearEl,
  minYear = 1990,
  maxYear = new Date().getFullYear() + 1,
  onChange = null,
  onApply = null,
  onClear = null
}) {
  let startYear = null;
  let endYear = null;

  /* Generate Year Grid */
  for (let y = minYear; y <= maxYear; y++) {
    const div = document.createElement("div");
    div.className = "year-item";
    div.textContent = y;
    div.dataset.year = y;
    gridEl.appendChild(div);
  }

  /* Toggle Dropdown */
  inputEl.addEventListener("click", () => {
    e.preventDefault();
    dropdownEl.classList.toggle("visible");
  });

  /* Close dropdown when clicking outside */
  document.addEventListener("click", (e) => {
    if (!dropdownEl.contains(e.target) && e.target !== inputEl) {
      dropdownEl.classList.remove("visible");
    }
  });

  /* Handle year select logic */
  gridEl.addEventListener("click", function (e) {
    if (!e.target.classList.contains("year-item")) return;

    const year = parseInt(e.target.dataset.year);

    if (startYear === null) {
      startYear = year;
    } else if (endYear === null) {
      endYear = year;
      if (endYear < startYear) [startYear, endYear] = [endYear, startYear];
    } else {
      startYear = year;
      endYear = null;
    }

    updateSelectionDisplay();

    if (onChange) onChange(startYear, endYear);
  });

  /* Update UI and input */
  function updateSelectionDisplay() {
    const items = gridEl.querySelectorAll(".year-item");

    items.forEach((item) => {
      const y = parseInt(item.dataset.year);
      item.classList.remove("selected", "range");

      if (startYear !== null && y === startYear) item.classList.add("selected");
      if (endYear !== null && y === endYear) item.classList.add("selected");
      if (startYear !== null && endYear !== null && y > startYear && y < endYear)
        item.classList.add("range");
    });

    // Handle same-year selection
    if (startYear !== null && endYear !== null) {
      inputEl.value = (startYear === endYear) 
        ? `${startYear}` 
        : `${startYear} - ${endYear}`;
    } else if (startYear !== null) {
      inputEl.value = `${startYear}`;
    } else {
      inputEl.value = "";
    }
  }

  /* Clear button */
  clearEl.addEventListener("click", () => {
    startYear = null;
    endYear = null;
    inputEl.value = "";
    updateSelectionDisplay();

    if (onClear) onClear();
    if (onChange) onChange(null, null);
  });

  /* Apply button */
  applyEl.addEventListener("click", () => {
    dropdownEl.classList.remove("visible");

    // Same year → treat as single year
    const finalStart = startYear;
    const finalEnd = (endYear === startYear) ? null : endYear;

    if (onApply) onApply(finalStart, finalEnd);
  });

  /* Allow manual access */
  return {
    clear: () => clearEl.click(),
    apply: () => applyEl.click(),
    getStart: () => startYear,
    getEnd: () => endYear
  };
}

/* =======================================
   AUTO-INIT PLUGIN (like flatpickr/select2)
   ======================================= */
function initYearRangePicker(selector, options = {}) {
  const el = document.querySelector(selector);
  if (!el) return;

  const minYear = parseInt(el.dataset.min) || options.minYear || 1990;
  const maxYear = parseInt(el.dataset.max) || options.maxYear || new Date().getFullYear() + 1;

  // Auto-generate HTML
  el.innerHTML = `
    <input class="year-range-input" placeholder="Select year range" readonly>
    <div class="year-dropdown ">
      <div class="year-grid"></div>
      <div class="btn-row">
        <button class="apply-btn">Apply</button>
        <button class="clear-btn">Clear</button>
      </div>
    </div>
  `;

  // Initialize
  return createYearRangePicker({
    inputEl: el.querySelector(".year-range-input"),
    dropdownEl: el.querySelector(".year-dropdown"),
    gridEl: el.querySelector(".year-grid"),
    applyEl: el.querySelector(".apply-btn"),
    clearEl: el.querySelector(".clear-btn"),
    minYear,
    maxYear,
    onApply: options.onApply,
    onChange: options.onChange,
    onClear: options.onClear
  });
}
