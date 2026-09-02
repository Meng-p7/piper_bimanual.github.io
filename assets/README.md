# Asset Placeholders & Real Files

## 想换任何视频 / 图片？只改一个文件就够

所有媒体路径集中在 **`js/media.js`**（[文件路径](#)）。中英文两个页面共用这份清单。

```js
window.PIPER_MEDIA = {
  hero_video:   { file: 'videos/hero_demo.mp4',  poster: 'images/towel_blue.jpg', label: '...' },
  towel_blue:   { file: 'images/towel_blue.jpg',  label: '...' },
  cam_left_wrist: { file: 'images/left_wrist.jpg', label: '...' },  // 文件没放也行，自动 TODO 占位
  ...
};
```

| 你想做的事 | 怎么操作 |
|---|---|
| 替换 Hero 视频 | 把新视频命名为（或改成）`assets/videos/hero_demo.mp4`，刷新页面就生效 |
| 换成完全不同的 Hero 视频 | 把视频丢进 `assets/videos/`（比如 `hero_v2.mp4`），改 `media.js` 里 `hero_video.file: 'videos/hero_v2.mp4'` |
| 加一张左腕相机截图 | 把 jpg 丢进 `assets/images/left_wrist.jpg`，刷新页面——TODO 自动变成真图 |
| 加夹爪实拍 | 丢 `assets/images/slim_gripper.jpg`，刷新 |
| 改 §04 「抓角与抬升」视频 | 改 `media.js` 里 `grasp_video.file` |
| 同时改中英两个页面 | 改 `media.js` 即可，**两份 HTML 自动同步** |

## 当前清单

| key | file | 状态 | 用途 |
|-----|------|------|------|
| `hero_video` | `videos/hero_demo.mp4` | ✅ 已有 | Hero 主视频（叠毛巾完整演示） |
| `teleop_video` | `videos/teleoperation.mp4` | ✅ 已有 | **§02 双臂遥操作**（人全程采集；仅此一处用） |
| `hil_video` | `videos/hil.mp4` | ⏳ 占位（poster=红毛巾） | **§04 第二个卡片**：推理时人在回路、主臂跟随从臂随时接管；录好丢 `assets/videos/hil.mp4` 自动播放 |
| `grasp_video` | `videos/grasp.mp4` | ⚠️ 文件在但内容疑似调试录屏 | **§04 第一个卡片**：抓角与抬升；有真抓角视频后覆盖 `assets/videos/grasp.mp4` |
| `towel_blue` | `images/towel_blue.jpg` | ✅ 已有 | Hero poster / §04 Blue 卡片（预训练色） |
| `towel_red` | `images/towel_red.jpg` | ✅ 已有 | §04 Red 卡片（HIL 色） |
| `towel_green` | `images/towel_green.jpg` | ✅ 已有 | §04 Green 卡片（HIL 色） |
| `towel_yellow` | `images/towel_yellow.jpg` | ✅ 已有 | §04 Yellow 卡片（工位色卡） |
| `cam_left_wrist` | `images/left_wrist.jpg` | ⏳ TODO 占位 | §02 三相机位 |
| `cam_right_wrist` | `images/right_wrist.jpg` | ⏳ TODO 占位 | §02 三相机位 |
| `cam_orbbec_top` | `images/orbbec_top.jpg` | ⏳ TODO 占位 | §02 三相机位 |
| `gripper_photo` | `images/grasp.jpg` | ⏳ TODO 占位 | §02 夹爪实拍位（对比图已删除，只留这一张） |

## 容错行为

- **文件没放**：对应位置自动显示 `TODO · xxx.jpg` 占位块，斜纹背景，不会破图。
- **JS 没加载**：HTML 里硬编码的 `src` 作为 fallback，页面仍能正常显示已有素材。
- **路径写错**：和"文件没放"一样，自动回退到 TODO 占位。

## Asset 命名 / 尺寸建议

- 毛巾卡片：1:1（正方形），800–1200 px 长边。
- 相机帧：4:3，640 × 480（与录制格式一致）。
- 夹爪 / 系统概览：4:3，1200 × 900。
- 视频：H.264 mp4，16:9，≤ 30 MB。Hero 视频 autoplay+muted+loop，建议 ≤ 60 s。

## HTML 里加新素材位的语法（备用）

如果你以后要加一节新的内容，需要放图或视频：

```html
<!-- 图片，文件没放也行，自动 TODO 占位 -->
<div class="media-placeholder" data-media="new_thing">
  <img data-media-img alt="" hidden>
  <div class="media-placeholder__inner" data-media-fallback>
    <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true">...</svg>
    <p class="t-mono">TODO · new_thing.jpg</p>
  </div>
</div>

<!-- 或者直接 img（必须有 alt 文本） -->
<img data-media="new_thing" src="assets/images/new_thing.jpg" alt="..." />

<!-- 视频 -->
<video data-media="new_thing" autoplay muted loop playsinline></video>
```

然后在 `js/media.js` 里加一行：
```js
new_thing: { file: 'images/new_thing.jpg', label: 'New thing caption' },
```

中英文两份 HTML 用同一个 key，自动同步。
