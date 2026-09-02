/* =========================================
   Piper — 媒体清单（唯一数据源）
   -----------------------------------------
   想换任何视频 / 图片，只需要改这个文件。

   用法：
     1. 把新文件放进 assets/videos/ 或 assets/images/；
     2. 在这里改对应的 file 值（或新增一行 key）；
     3. 中英文两个页面会同时生效，不用再动 HTML。

   file 路径一律写「相对于 assets/ 目录」，
   前缀（assets/ 或 ../assets/）由 main.js 按当前语言自动补。

   文件还没准备好时，页面会自动显示 TODO 占位块，不会破图。
   ========================================= */
window.PIPER_MEDIA = {

  /* ---------- 视频 ---------- */
  // Hero 右上角的主视频
  hero_video: {
    file:   'videos/hero_demo.mp4',
    poster: 'images/towel_blue.jpg',
    label:  'Corner grasp and fold demo on the blue towel',
  },
  // §02 双臂遥操作：人全程拖动主臂采集数据（已有素材）
  teleop_video: {
    file:   'videos/teleoperation.mp4',
    poster: '',
    label:  'Bimanual teleoperation on the four-Piper workcell',
  },
  // §04 结果区：推理时人在回路——主臂跟随从臂运动，随时准备接管
  // （还没录，先占位；录好丢进 assets/videos/hil.mp4 就会自动播放）
  hil_video: {
    file:   'videos/hil.mp4',
    poster: 'images/towel_red.jpg',
    label:  'Inference with a human in the loop — masters track the slaves, ready to take over',
  },
  // §04 结果区「抓角与抬升」那个视频（占位，等抓角特写录好丢进来）
  grasp_video: {
    file:   'videos/grasp.mp4',
    poster: 'images/towel_blue.jpg',
    label:  'ACT autonomous corner grasp and lift',
  },

  /* ---------- 四色毛巾（已有真图） ---------- */
  towel_blue:   { file: 'images/towel_blue.jpg',   label: 'Blue towel — pretraining base' },
  towel_red:    { file: 'images/towel_red.jpg',    label: 'Red towel — HIL fine-tuning' },
  towel_green:  { file: 'images/towel_green.jpg',  label: 'Green towel — HIL fine-tuning' },
  towel_yellow: { file: 'images/towel_yellow.jpg', label: 'Yellow towel — lab color, not in training set' },

  /* ---------- 待补素材（文件丢进 assets/ 后自动生效） ---------- */
  // §02 三相机视角截图
  cam_left_wrist:  { file: 'images/left_wrist.jpg',   label: 'Left wrist camera' },
  cam_right_wrist: { file: 'images/right_wrist.jpg',  label: 'Right wrist camera' },
  cam_orbbec_top:  { file: 'images/orbbec_top.jpg',   label: 'Top Orbbec camera' },
  // §02 自研细长夹爪实拍（只要一张；对比图已去掉）
  gripper_photo:   { file: 'images/grasp.jpg',       label: 'Custom slim gripper mounted on the slave arm' },
};
