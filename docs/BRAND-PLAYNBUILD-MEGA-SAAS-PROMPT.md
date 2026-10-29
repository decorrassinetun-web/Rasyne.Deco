# PlayNbuildAnything — Global Creation SaaS Product Prompt

## North star

Build **PlayNbuildAnything**: a playful, multilingual, AI-assisted **World Augmenter** where people learn, imagine, experiment and contribute to the evolution of the world through games. Every game is a different doorway into creation; the best ideas can become structured projects, shared designs, real briefs and, after human and technical review, manufactured outcomes. It begins with furniture, interiors, restoration and craft, then grows into a universal workspace for imagining, prototyping and sharing almost any buildable idea.

The product should feel like an atelier and a game at the same time: tactile enough for a craftsperson, structured enough for a professional designer, and inviting enough for a child or first-time creator. It must never pretend that every idea is instantly manufacturable. It should separate imagination, simulation, quotation and real-world production into honest stages.

## Brand identity

**Official name:** PlayNbuildAnything

**Name logic:** `Build` is the outcome, `N` is the playful connector, and `playAnything` expresses the open-ended creative loop: play with an idea, learn from it, shape it and build it. The spelling is intentional and should remain consistent across product, documentation and future domains.

**Category:** Play-to-build creation SaaS.

**Founding vertical:** Rasyne Deco, one small but real piece of the PlayNbuildAnything cosmos: the first atelier and proof environment for a much larger creation universe.

**Global idea:** people should be able to play with an idea, learn through experimentation, shape it with intelligence and move it toward a real build with trusted people.

**World Augmenter thesis:** the world is not finished. Billions of people can contribute to its next layer through many kinds of play: designing spaces, solving problems, inventing objects, improving systems, teaching one another and remixing useful ideas. PlayNbuildAnything turns those contributions into navigable worlds, not an endless feed of content.

## Brand promise

> Play with an idea. Shape it with intelligence. Build it with people.

Rasyne Deco is the first proof layer: a real workshop where materials, measurements, comfort, restoration and human judgment matter. It is one tiny piece of the cosmos, not the boundary of the vision. PlayNbuildAnything expands that philosophy into a global platform without erasing the atelier origin.

## The play-to-world loop

The platform is designed as a loop rather than a single generator. A person enters a game, explores a possibility, contributes a variation, learns from feedback, saves a project and invites other people to improve it. A selected project moves into a Build Deck, where constraints, materials, cost ranges, provenance and human review are made explicit. Only then can it move toward a quote, a maker, a workshop or a manufacturing partner. Play creates the possibility; review and craft create trust.

## Product principles

1. **Play before paperwork.** Start with a visual, voice or text prompt; let the user explore before asking for a formal brief.
2. **Prompt to plan.** Every creative direction can become a structured brief with dimensions, materials, constraints, budget range, timeline and next action.
3. **Simulation before commitment.** Visual concepts, 3D scenes and exploded views are clearly marked as concepts until reviewed by a human or validated by a production workflow.
4. **Craft is a feature.** Material behavior, joinery, stitching, ergonomics, repairability and provenance should be visible—not hidden behind generic AI language.
5. **One idea, many outputs.** A single project can produce a moodboard, 3D scene, technical notes, shopping list, workshop request, shareable dossier and WhatsApp conversation.
6. **Human-in-the-loop by design.** High-impact decisions, safety-sensitive builds and production promises require human review.
7. **Trilingual from the core.** English, French and Arabic are first-class locales with proper RTL composition, localized terminology and culturally respectful examples.

## Core product surfaces

### 1. Playroom

A fast, low-friction canvas where a person can:

- describe an idea by text, voice or image;
- choose a world such as furniture, room, vehicle interior, object, event or learning project;
- remix materials, colors, forms, lighting and atmosphere;
- compare several directions side by side;
- save a fork without losing the original idea.

### 2. Build Deck

A more rigorous design environment for turning play into a buildable direction:

- parametric dimensions and constraints;
- interactive 3D composition;
- material and finish libraries;
- exploded and assembly views;
- accessibility, comfort and maintenance notes;
- cost, lead-time and confidence indicators;
- exportable dossier for a workshop, maker or supplier.

### 3. Worlds

Game-like environments where users learn by composing systems and contribute to a growing world. Rasyne Worlds is the first world: place furniture, unlock rooms, understand proportion and carry the result into the Studio. Future worlds can include automotive interiors, hospitality spaces, retail displays, tiny homes, product objects, climate solutions, learning environments and educational maker challenges. Each world needs its own rules, contribution model and path from simulation to responsible production.

### 4. Atelier Network

A trust layer connecting projects to real people:

- Rasyne Deco as the initial production partner;
- future makers, upholsterers, carpenters, designers and local suppliers;
- capability profiles, lead times and service regions;
- structured handoff rather than an unmoderated marketplace;
- clear distinction between concept, quote, accepted order and completed work.

### 5. Project Dossier

A persistent project record containing:

- original prompt and media;
- versions and forks;
- selected model, materials and finishes;
- measurements and constraints;
- generated assets and provenance;
- messages, approvals and status history;
- chosen WhatsApp/contact route;
- privacy and sharing controls.

## AI orchestration

Use specialized AI actions rather than one opaque super-agent:

- **Intent mapper:** turns a natural-language idea into a structured creative brief.
- **Visual concept generator:** creates references and variations.
- **3D scene planner:** maps a brief into objects, transforms and materials.
- **Material advisor:** explains tactile, maintenance and suitability trade-offs.
- **Constraint checker:** flags missing measurements, conflicts and unsafe assumptions.
- **Dossier writer:** creates a concise human-readable handoff.
- **Conversation copilot:** prepares a context-rich message for WhatsApp or an atelier channel.
- **Learning guide:** explains why a composition works, turning play into design literacy.

AI outputs must include a confidence label, source/provenance where applicable, and a clear “needs human review” state when the result affects safety, money or production.

## Expansion architecture

Keep the existing Rasyne Deco application as the first vertical and evolve through bounded modules:

- `worlds/` for interactive creation environments;
- `studio/` for parametric design and dossiers;
- `materials/` for catalog, attributes and provenance;
- `projects/` for versions, permissions and persistence;
- `agents/` for typed AI actions and audit trails;
- `atelier/` for human review, quotations and status;
- `sharing/` for WhatsApp and future channels;
- `billing/` only after product-market validation.

Prefer typed contracts, small domain modules, deterministic state machines for production status, and asset references rather than storing media bytes in the database. Keep the current React/TypeScript foundation, Babylon.js/Three.js experiences, tRPC contracts and trilingual locale architecture as the first implementation substrate.

## Trust, safety and governance

- Never claim a design is structurally safe or production-ready without an appropriate review.
- Do not fabricate testimonials, workshop capacity, credentials or supplier relationships.
- Label AI-generated imagery and simulated measurements.
- Give users export, deletion and sharing controls for project media.
- Keep private customer dossiers separate from public inspiration galleries.
- Add moderation for public projects and marketplace content before opening community publishing.
- Log important AI transformations so a user can understand how a brief changed.

## Phased roadmap

### Phase 0 — Rasyne foundation

Stabilize the current Home, Furniture Lab, Studio, Worlds, trilingual UI, WhatsApp routing, local drafts, asset manifest and GitHub synchronization.

### Phase 1 — PlayNbuildAnything beta

Introduce project accounts, cloud-saved dossiers, version history, prompt-to-brief orchestration, shareable read-only links and a small set of curated creation worlds.

### Phase 2 — Build intelligence

Add constraint extraction, material metadata, parametric templates, cost/lead-time estimation ranges and workshop review states. Keep estimates explicitly provisional.

### Phase 3 — Atelier network

Invite a small group of verified makers. Route projects according to capability, language, location and availability. Add quote requests and human approval checkpoints.

### Phase 4 — Creator ecosystem

Add reusable templates, remix permissions, education tracks, team workspaces and carefully moderated public showcases.

### Phase 5 — Universal creation platform

Expand beyond interiors through modular worlds and domain-specific agents, while preserving the same loop: play → shape → simulate → review → build → learn.

## Definition of done for every new world

A world is ready only when it has:

- a clear creative goal and audience;
- a playable interaction loop;
- a structured brief output;
- a truthful boundary between simulation and production;
- responsive desktop/mobile behavior;
- English, French and Arabic content where exposed;
- RTL verification for Arabic;
- accessible keyboard and reduced-motion behavior;
- unit tests for deterministic rules;
- an export or handoff path;
- privacy and provenance notes.

## Master build prompt

> Design and implement the next vertical of **PlayNbuildAnything** as a high-end, trilingual, playful creation system. Preserve the Atelier Quiet Luxury language for the founding Rasyne Deco world, while allowing future worlds to develop their own visual language. Let users start with text, voice or an image, then play with a responsive 3D world, compare variations, inspect materials, adjust constraints and save a project dossier. Translate creative play into a structured brief that can be reviewed by a real atelier or another trusted builder. Keep AI outputs visibly provisional until validated. Support English, French and Arabic with true RTL composition, keyboard accessibility, reduced motion and clear states for loading, uncertainty, privacy and human review. Extend the existing Rasyne Deco foundation instead of replacing it. Build in small typed modules, test pure rules, preserve provenance, avoid fake testimonials and never promise that an imagined object is automatically safe, affordable or manufacturable.
