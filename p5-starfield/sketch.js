let messages = [
  "我是joy。",
  "學號是413730887。",
  "身份認同是一隻棕熊。",
  "平時喜歡吃鮭魚。",
  "喜歡游泳。",
  "喜歡爬樹。",
  "但是我也是拉拉熊。",
  "所以更喜歡在家躺。"
];
let currentMessageIndex = 0;
let messageAlpha = 0;
let fadeDirection = 1; // 1: fade in, -1: fade out
let messageTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stars = [];
  for (let i = 0; i < 1000; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(245, 245, 220); // 米白色背景
  translate(width / 2, height / 2);

  // 繪製星星
  for (let star of stars) {
    star.update();
    star.show();
  }

  // 繪製文字動畫
  drawMessage();
}

function drawMessage() {
  fill(139, 69, 19, messageAlpha); // 棕色文字，透明度根據 messageAlpha
  textAlign(CENTER, CENTER);
  textSize(32);
  text(messages[currentMessageIndex], 0, 0); // 顯示在螢幕正中央

  // 控制透明度變化
  messageAlpha += fadeDirection * 2; // 調整透明度變化速度，放慢淡入淡出
  if (messageAlpha >= 255) {
    fadeDirection = -1; // 開始淡出
    messageTimer = frameCount; // 記錄淡入完成的時間
  } else if (messageAlpha <= 0 && frameCount > messageTimer + 90) { // 增加停留時間
    fadeDirection = 1; // 開始淡入
    currentMessageIndex = (currentMessageIndex + 1) % messages.length; // 切換到下一段文字
  }
}

class Star {
  constructor() {
    this.position = createVector(random(-width, width), random(-height, height));
    this.size = random(2, 5);
    this.speed = random(0.5, 2);
    this.color = color(random(255), random(255), random(255)); // 隨機鮮豔顏色
  }

  update() {
    this.position.z -= this.speed;
    if (this.position.z < 1) {
      this.position.z = width;
      this.position.x = random(-width, width);
      this.position.y = random(-height, height);
      this.color = color(random(255), random(255), random(255)); // 更新顏色
    }
  }

  show() {
    let sx = map(this.position.x / this.position.z, 0, 1, 0, width);
    let sy = map(this.position.y / this.position.z, 0, 1, 0, height);
    let r = map(this.position.z, 0, width, 10, 0);
    noStroke();
    fill(this.color); // 使用隨機顏色
    ellipse(sx, sy, r, r);
  }
}