const worryInput = document.querySelector('#worry-input');
const charCount = document.querySelector('#char-count');
const formMessage = document.querySelector('#form-message');
const processButton = document.querySelector('#process-button');
const result = document.querySelector('#result');
const scene = document.querySelector('#game-scene');
const speech = document.querySelector('#ghost-speech');
const effectLayer = document.querySelector('#effect-layer');
const statusLabel = document.querySelector('#status-label');
const energyLabel = document.querySelector('#energy-label');
const downloadStatus = document.querySelector('#download-status');

const modes = {
  shred: { name: '碎成像素', note: '已经碎了，拼不回来了。真遗憾呢。', speech: '啪！烦恼已碎成像素。', working: '准备像素粉碎机...' },
  launch: { name: '发射到外太空', note: '已离开地球信号范围，请勿追踪。', speech: '咻——它现在归宇宙管。', working: '正在校准发射轨道...' },
  seal: { name: '封进下班盒', note: '盒子上写着：今天禁止加班。', speech: '咔哒！明天再打开吧。', working: '下班盒正在打开...' },
};

let selectedMode = 'shred';
let lastReceipt = null;

function updateCount() {
  charCount.textContent = `${worryInput.value.length} / 80`;
  if (worryInput.value.trim()) formMessage.textContent = '';
}

worryInput.addEventListener('input', updateCount);

document.querySelectorAll('[data-pick]').forEach((button) => {
  button.addEventListener('click', () => {
    worryInput.value = button.dataset.pick;
    updateCount();
    worryInput.focus();
  });
});

document.querySelectorAll('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    selectedMode = button.dataset.mode;
    document.querySelectorAll('[data-mode]').forEach((card) => {
      const selected = card === button;
      card.classList.toggle('selected', selected);
      card.setAttribute('aria-pressed', String(selected));
    });
  });
});

function playEffect(mode, worry) {
  effectLayer.className = `effect-layer effect-${mode}`;
  effectLayer.replaceChildren();

  const label = document.createElement('div');
  label.className = 'effect-label';
  label.textContent = modes[mode].name;
  effectLayer.append(label);

  const chip = document.createElement('div');
  chip.className = 'effect-token';
  chip.textContent = worry;

  if (mode === 'shred') {
    effectLayer.append(chip);
    for (let index = 0; index < 20; index += 1) {
      const pixel = document.createElement('span');
      pixel.className = 'effect-pixel';
      pixel.style.setProperty('--x', `${(index % 2 ? 1 : -1) * (25 + Math.random() * 145)}px`);
      pixel.style.setProperty('--y', `${(index < 10 ? -1 : 1) * (20 + Math.random() * 105)}px`);
      pixel.style.setProperty('--delay', `${Math.random() * 0.25}s`);
      effectLayer.append(pixel);
    }
  } else if (mode === 'launch') {
    const flight = document.createElement('div');
    flight.className = 'effect-flight';
    const rocket = document.createElement('div');
    rocket.className = 'effect-rocket';
    rocket.textContent = '🚀';
    flight.append(chip, rocket);
    effectLayer.append(flight);
  } else {
    const box = document.createElement('div');
    box.className = 'effect-box';
    box.innerHTML = '<div class="effect-box-lid"></div><div class="effect-box-front">下 班 盒</div>';
    const stamp = document.createElement('div');
    stamp.className = 'effect-seal-stamp';
    stamp.textContent = '已封存 ✓';
    effectLayer.append(chip, box, stamp);
  }
}

function formatDate(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function makeReceipt(worry, mode) {
  const now = new Date();
  const number = String(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()).padStart(6, '0');
  return { worry, mode: modes[mode].name, note: modes[mode].note, date: formatDate(now), number };
}

function renderReceipt(receipt) {
  document.querySelector('#receipt-number').textContent = receipt.number;
  document.querySelector('#receipt-worry').textContent = receipt.worry;
  document.querySelector('#receipt-mode').textContent = receipt.mode;
  document.querySelector('#receipt-note').textContent = receipt.note;
  document.querySelector('#receipt-date').textContent = receipt.date;
  result.hidden = false;
  result.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

processButton.addEventListener('click', () => {
  const worry = worryInput.value.trim();
  if (!worry) {
    formMessage.textContent = '先给幽灵一句烦恼，它才知道要处理什么。';
    worryInput.focus();
    return;
  }

  result.hidden = true;
  const mode = selectedMode;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollDelay = reducedMotion ? 0 : 500;
  processButton.disabled = true;
  document.querySelectorAll('[data-mode]').forEach((card) => { card.disabled = true; });
  processButton.innerHTML = '<span>✦</span> 幽灵处理中... <span class="button-arrow">→</span>';
  statusLabel.textContent = modes[mode].working;
  speech.innerHTML = '收到！<br>交给我吧。';
  document.querySelector('#game-frame').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'center' });
  effectLayer.replaceChildren();
  window.setTimeout(() => {
    playEffect(mode, worry);
    scene.classList.add('celebrating');
  }, scrollDelay);

  window.setTimeout(() => {
    effectLayer.replaceChildren();
    effectLayer.className = 'effect-layer';
    scene.classList.remove('celebrating');
    speech.textContent = modes[mode].speech;
    statusLabel.textContent = '回收成功！今日可以休息了';
    energyLabel.textContent = '■■■■■';
    lastReceipt = makeReceipt(worry, mode);
    renderReceipt(lastReceipt);
    processButton.disabled = false;
    document.querySelectorAll('[data-mode]').forEach((card) => { card.disabled = false; });
    processButton.innerHTML = '<span>✦</span> 开始情绪回收 <span class="button-arrow">→</span>';
  }, scrollDelay + (reducedMotion ? 350 : 2200));
});

document.querySelector('#again-button').addEventListener('click', () => {
  result.hidden = true;
  worryInput.value = '';
  updateCount();
  speech.innerHTML = '嗨，我是摸鱼幽灵。<br>今天还有什么要扔的？';
  statusLabel.textContent = '等待投喂烦恼...';
  energyLabel.textContent = '■■■□□';
  document.querySelector('.workbench').scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => worryInput.focus({ preventScroll: true }), 350);
});

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight) {
  let line = '';
  let lines = 0;
  for (const character of text) {
    if (ctx.measureText(line + character).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = character;
      lines += 1;
    } else {
      line += character;
    }
  }
  if (line) ctx.fillText(line, x, y + lines * lineHeight);
  return lines + 1;
}

function downloadReceipt(receipt) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1190;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#eae3ef';
  ctx.fillRect(0, 0, 900, 1190);
  ctx.fillStyle = '#29213a';
  ctx.fillRect(76, 80, 766, 1030);
  ctx.fillStyle = '#fffaf0';
  ctx.fillRect(66, 70, 766, 1030);

  ctx.fillStyle = '#29213a';
  ctx.font = 'bold 25px "DM Mono", monospace';
  ctx.fillText('✳ AFTER HOURS .EXE', 112, 126);
  ctx.textAlign = 'right';
  ctx.font = '21px "DM Mono", monospace';
  ctx.fillText(`NO. ${receipt.number}`, 790, 126);
  ctx.textAlign = 'left';
  ctx.setLineDash([9, 9]);
  ctx.strokeStyle = '#cfc5c2';
  ctx.lineWidth = 3;
  ctx.beginPath();ctx.moveTo(112, 155);ctx.lineTo(790, 155);ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#8e6ea6';
  ctx.font = '90px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✳', 450, 283);
  ctx.font = 'bold 27px "Noto Sans SC", sans-serif';
  ctx.fillText('工 位 存 活 凭 证', 450, 347);
  ctx.fillStyle = '#29213a';
  ctx.font = 'bold 42px "Noto Sans SC", sans-serif';
  ctx.fillText('今天也有好好活过一天', 450, 417);
  ctx.textAlign = 'left';

  ctx.setLineDash([9, 9]);
  ctx.strokeStyle = '#cfc5c2';
  ctx.beginPath();ctx.moveTo(112, 465);ctx.lineTo(790, 465);ctx.stroke();
  ctx.setLineDash([]);
  const rows = [
    ['已处理烦恼', receipt.worry],
    ['处理方式', receipt.mode],
    ['幽灵批注', receipt.note],
  ];
  let rowY = 524;
  rows.forEach(([label, value]) => {
    ctx.fillStyle = '#8b838b';
    ctx.font = '24px "Noto Sans SC", sans-serif';
    ctx.fillText(label, 112, rowY);
    ctx.fillStyle = '#29213a';
    ctx.font = 'bold 26px "Noto Sans SC", sans-serif';
    const lineCount = drawWrapped(ctx, value, 290, rowY, 475, 42);
    rowY += Math.max(62, lineCount * 42 + 18);
  });
  const ruleY = Math.max(784, rowY + 8);
  ctx.setLineDash([9, 9]);
  ctx.strokeStyle = '#cfc5c2';
  ctx.beginPath();ctx.moveTo(112, ruleY);ctx.lineTo(790, ruleY);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#29213a';
  ctx.textAlign = 'center';
  ctx.font = 'bold 27px "Noto Sans SC", sans-serif';
  ctx.fillText('本凭证证明：你已经努力了。', 450, ruleY + 70);
  ctx.fillText('现在可以理直气壮地休息一下。', 450, ruleY + 112);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#827983';
  ctx.font = '22px "DM Mono", monospace';
  ctx.fillText(receipt.date, 112, 1044);
  ctx.textAlign = 'right';
  ctx.fillText('GHOST APPROVED ✳', 790, 1044);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `工位存活凭证-${receipt.date}.png`;
  link.click();
}

document.querySelector('#download-button').addEventListener('click', async () => {
  if (!lastReceipt) return;
  try {
    await document.fonts.ready;
    downloadReceipt(lastReceipt);
    downloadStatus.textContent = '图片已生成，可以分享给同事啦。';
  } catch {
    downloadStatus.textContent = '保存失败，请截图保存凭证。';
  }
});
