import React from "react";

export default function About() {
  // Simulate latency
  const start = Date.now();
  while (Date.now() - start < 2000) {}
  return <h2>About This App</h2>;
}
