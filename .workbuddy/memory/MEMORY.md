# Project Memory — Piper Project Page

## What this workspace is

Static project page for a four-Piper bimanual robot learning system, hosted at
`https://gabriel-ning.github.io/physical_ai_runtime/`. Source code & runtime live at
`https://github.com/dream25851/physical_ai_runtime`.

## Page structure (v3, 2026-09-02)

5 sections only — top nav maps 1:1.

| # | Section | Slug | Anchor in nav |
|---|---------|------|---------------|
| 01 | Overview | `#overview` | Overview |
| 02 | System   | `#system`   | System |
| 03 | Learning | `#learning` | Learning |
| 04 | Results  | `#results`  | Results |
| 05 | Status   | `#status`   | Status |

Engineering Notes live **inside** §5, not in the top nav.

## Conventions

- **Layout**: English at `/`, Chinese at `/zh-cn/`. Both pages must have identical section
  order, IDs, and asset filenames.
- **IDs**: `overview / system / learning / results / status`. Do not localize.
- **Status pills**:
  - `status-pill--done` → green (`--c-status-done` #16a34a) — completed
  - `status-pill--doing` → amber (`--c-status-doing` #d97706) — running now
  - `status-pill--todo` → blue (`--c-status-todo` #2563eb) — intentionally next
  Use `data-note` attribute to attach a hover tooltip text.
- **Lab notes** sit inside §5 only (not after every section like v2 did). Style: white card
  on warm-paper background (`--c-paper: #fbfaf7`), left accent stripe, mono
  `LAB · NN` kicker.
- **Towel cards** in §04 use the four real photos at `assets/images/towel_{red,blue,green,yellow}.jpg`.
  Yellow is a dashed "lab color" card; red & green are the HIL fine-tuning colors; blue is
  the pretraining base.

## Hard "do not" rules (from user, 2026-09-02 晚)

- **Three cameras only.** Two wrist cameras + one top Orbbec. The earlier five-camera
  multi-view setup is a dead end and lives only as a one-line callout in §02 ("Five views
  was a dead end — see Engineering Notes"). Never write "five cameras" as a positive
  feature on the page.
- **Never claim tomorrow's experiments as "in progress".** The site is for completed work
  and the project itself; it does not host future experimental plans.
- **Never use these phrases**: "Pick Bread", "RK3588S", "SmolVLA". All out of scope.
- **Pretraining details are fixed**: 100 episodes · blue towel only · corner-grasp + lift
  · ACT · `chunk_size = 150` (best of the C0 executed-step sweep) · 20k steps · ResNet-18.
- **HIL details are fixed**: 101 episodes · red + green towels · exactly one teleop
  interval per episode · initialized from C1 (no scratch) · 10k HIL steps.
- **Four towel colors** in the lab palette: red, blue, green, yellow. Don't manufacture
  any other color.
- **No fabricated numbers** beyond what's in the experiments archive. Real numbers come
  from the project's own research notes (C1, C2, C3, C4 records).

## Asset replacement workflow

All media paths live in **`js/media.js`** (`window.PIPER_MEDIA`) — the single source of
truth shared by both language pages. To swap any video/image: drop the file in `assets/`
and (if the filename differs) edit one line in `media.js`. Missing files automatically
fall back to a `TODO` placeholder block; HTML keeps a hardcoded `src` as no-JS fallback.
See `assets/README.md`.

Video role split (v5, 2026-09-03 凌晨):
- `teleoperation.mp4` → §02 only (human teleop data collection)
- `hil.mp4` → §04 card 2 (inference with masters tracking slaves, ready for takeover) — **placeholder, not recorded yet**
- `grasp.mp4` → §04 card 1 (corner grasp) — file exists but current content looks like a debug-tool screen recording, user should replace
- `hero_demo.mp4` → Hero

Real assets already in the project:
- `assets/videos/hero_demo.mp4` (real robot footage, 35 MB)
- `assets/videos/teleoperation.mp4` (real dual-arm teleop, 2 MB)
- `assets/videos/grasp.mp4` (8 MB, content mismatch — treat as placeholder)
- `assets/images/towel_{red,blue,green,yellow}.jpg` (real product photos)

## Deployment

- Push to `https://github.com/dream25851/physical_ai_runtime` (branch `main`, folder `/`).
- Local preview: `python -m http.server 8765` from the workspace root.
- See `DEPLOY.md` for the full checklist.
