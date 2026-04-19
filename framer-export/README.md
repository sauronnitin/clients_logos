# Framer Export Structure

This folder contains Framer-facing assets and docs that mirror the `aurora` app without changing production UI behavior.

## Canonical Code Components

- `AuroraIframePassThrough.tsx`: click-through aurora iframe background for Framer hero sections.
- `ClientsMarqueeSingleRow.tsx`: single-row clients marquee iframe for Framer.
- `ClientsMarqueeIframe.tsx`: legacy alias with the same iframe behavior as `ClientsMarqueeSingleRow.tsx` for backwards compatibility.
- `aurora-framer-reference.tsx`: no-iframe plain CSS aurora reference component for Framer Code Components.

## Canonical Docs

- `FRAMER_EMBED_INSTRUCTIONS.md`: primary embed setup and troubleshooting guide.
- `AURORA_HERO_STACKING_PLAN.md`: execution plan for hero layering and responsive validation.
- `INTEGRATION_HERO_FRAMER_RUNBOOK.md`: integration-hero-specific runbook.
- `PROMPT_TEMPLATE_STRUCTURED_TASKS.md`: active structured prompt template.
- `PROMPT_TEMPLATE_HIGH_ACCURACY_VISUAL_INTEGRATION.md`: pointer file to the structured template (Appendix A for visual/embed details).

## Data + Assets

- `cms-clients.json`, `cms-clients.csv`, `cms-clients-minimal.csv`, `cms-clients-framer-schema.json`: exported clients data for embed generation workflows.
- `assets/`: static art assets used by Framer-facing docs and flows.

## Stability Rules

- Keep Framer code components dependency-light (no `@/` aliases, no app-only imports).
- Prefer iframe wrappers in this folder and keep visual logic in deployed embed routes.
- Treat this folder as handoff surface area: stable names, explicit defaults, and backwards-compatible updates.
