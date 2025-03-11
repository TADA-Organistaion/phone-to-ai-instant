
import React from "react";

const GooglePlacesStyles: React.FC = () => (
  <style>
    {`
    /* Custom styling for Google Places Autocomplete */
    .places-autocomplete__control {
      border-color: var(--border);
      border-radius: 0.375rem;
      min-height: 2.5rem;
      background-color: var(--background);
    }
    .places-autocomplete__control:hover {
      border-color: var(--border);
    }
    .places-autocomplete__control--is-focused {
      border-color: #ED7D31 !important;
      box-shadow: 0 0 0 1px rgba(237, 125, 49, 0.2) !important;
    }
    .places-autocomplete__menu {
      background-color: var(--background);
      border: 1px solid var(--border);
      border-radius: 0.375rem;
      z-index: 10;
    }
    .places-autocomplete__option {
      color: var(--foreground);
    }
    .places-autocomplete__option--is-focused {
      background-color: rgba(237, 125, 49, 0.1);
    }
    .places-autocomplete__option--is-selected {
      background-color: #ED7D31;
      color: white;
    }
    .places-autocomplete__input {
      color: var(--foreground);
    }
    .places-autocomplete__placeholder {
      color: var(--muted-foreground);
    }
    .dark .places-autocomplete__menu {
      background-color: hsl(224 71% 4%);
      border-color: hsl(215 28% 17%);
    }
    .dark .places-autocomplete__option {
      color: white;
    }
    .dark .places-autocomplete__control {
      background-color: hsl(224 71% 4%);
      border-color: hsl(215 28% 17%);
    }
    .dark .places-autocomplete__input {
      color: white;
    }
    .dark .places-autocomplete__placeholder {
      color: hsl(215 16% 47%);
    }
    `}
  </style>
);

export default GooglePlacesStyles;
