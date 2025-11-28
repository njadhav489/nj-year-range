# NJ Year Range Picker

A lightweight, dependency-free JavaScript plugin to select single year or year ranges.

## Features
- Select a single year or a range of years
- Callbacks: onChange, onApply, onClear
- Auto-generated UI
- No external libraries required

## Installation
```html
<link rel="stylesheet" href="dist/nj-year-range.min.css">
<script src="dist/nj-year-range.min.js"></script>
```

## Usage
```html
<div id="yearFilter" class="year-range-picker" data-min="1900" data-max="2025"></div>
```

```js
initYearRangePicker("#yearFilter", {
  onApply: (from, to) => console.log("APPLY:", from, to),
  onChange: (from, to) => console.log("CHANGE:", from, to),
  onClear: () => console.log("CLEARED"),
});
```

## License
MIT License
