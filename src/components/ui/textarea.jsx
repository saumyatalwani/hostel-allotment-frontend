// src/components/ui/textarea.jsx
import React from "react";

export function Textarea({ placeholder, ...props }) {
  return (
    <textarea
      className="border p-2 rounded"
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
}
