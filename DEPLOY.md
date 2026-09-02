# Deploy Piper Project Page to GitHub Pages

This page is fully static. The fastest free host is **GitHub Pages**.
The runtime, episode format, and architecture live at:

- https://github.com/dream25851/physical_ai_runtime

## 1. Push the code

```bash
cd "C:/Users/rain/Desktop/piper_project_page"
git init -b main
git add .
git commit -m "Piper bimanual towel project page v2 (EN + ZH)"
git remote add origin https://github.com/dream25851/physical_ai_runtime.git
git push -u origin main
```

If the repo is already non-empty, pull first:

```bash
git pull origin main --allow-unrelated-histories
```

## 2. Enable Pages

1. Open `https://github.com/dream25851/physical_ai_runtime/settings/pages`
2. Source: **Deploy from a branch**
3. Branch: `main` · Folder: `/ (root)`
4. Save

Wait ~30 s. The site goes live at:

- English: `https://gabriel-ning.github.io/physical_ai_runtime/`
- Chinese:  `https://gabriel-ning.github.io/physical_ai_runtime/zh-cn/`

(URLs assume the GitHub user `gabriel-ning`; if your repo is under a different account,
substitute accordingly.)

## 3. (Optional) Custom domain

In `settings/pages → Custom domain`, set e.g. `piper.example.com`. Add a CNAME in your
DNS provider pointing to `gabriel-ning.github.io`. Add a file `CNAME` at the repo root
containing `piper.example.com` so it persists across pushes.

## 4. Add real assets

Drop real images / videos into these paths (see `assets/README.md` for full mapping), then push:

| File | Used in |
|------|---------|
| `assets/videos/hero_demo.mp4`        | Hero — left side media tile |
| `assets/images/system_overview.jpg`  | §02 System Architecture |
| `assets/images/teleop.jpg`           | §03 Bimanual Teleoperation |
| `assets/images/slim_gripper.jpg`     | §04 Custom End-Effector |
| `assets/images/multiview.jpg`        | §05 Multiview Observation |
| `assets/images/towel_grasp.jpg`      | §07 Learning to Grasp a Towel |
| `assets/images/towel_folding.jpg`    | §08 From Grasping to Full Folding |
| `assets/videos/towel_grasp.mp4`      | §10 Results / Demos |
| `assets/videos/towel_folding.mp4`    | §10 Results / Demos |
| `assets/images/towel_colors.jpg`     | §09 Multi-Color Robustness |

Each placeholder is an inline gradient block with a `TODO · xxx` caption, so they will
be obvious once you replace them.

After swapping, commit with a message like:

```bash
git add assets/
git commit -m "media: add real robot teleop + gripper + grasp photos"
git push
```

GitHub Pages rebuilds in ~20 s.

## 5. Local preview loop

```bash
cd "C:/Users/rain/Desktop/piper_project_page"
python -m http.server 8765
# English  → http://127.0.0.1:8765/
# Chinese  → http://127.0.0.1:8765/zh-cn/
```

## 6. How to update later

After any change:

```bash
cd "C:/Users/rain/Desktop/piper_project_page"
git add .
git commit -m "Update curriculum C5 results / new asset / new lab note"
git push
```

## 7. Update cadence for the project page

The page currently separates three classes of update:

- **Layout / copy / assets** → push freely. These don't change the project's claims.
- **C5 quantitative results** (Gate A 36-trial, Gate B 45-trial) → wait until the
  frozen per-trial CSV is in the repo; do **not** add success-rate numbers before that.
- **New stages (C6, C7, ...)** → update §06 timeline and §11 status columns together.
  Keep "Completed / In Progress / Future" strictly separated.
