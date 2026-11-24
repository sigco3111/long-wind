// HUD markup and words: title, wave names, controls, pause, and the poems for victory and defeat.
// Poems are classical and public domain: 敕勒歌 (tagline), 李白《侠客行》 (victory), 《易水歌》 (defeat).
// Owner: UI (U).

export const NUMERALS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
export const numeral = (n) => (n <= 10 ? NUMERALS[n] : n < 20 ? '十' + NUMERALS[n - 10] : String(n));

// Default names per wave (used when the director's title is missing or not Chinese).
export const WAVES = [
  { tt: '风起', en: '바람이 일다' },
  { tt: '草动', en: '풀이 흔들리다' },
  { tt: '剑鸣', en: '검이 울다' },
  { tt: '云散', en: '구름이 걷히다' },
  { tt: '雁回', en: '기러기가 돌아오다' },
];
export const BOSS_WAVE = { no: '최종', tt: '长风', en: '긴 바람' };
export const WAVE_EN = { 风起: '바람이 일다', 草动: '풀이 흔들리다', 剑鸣: '검이 울다', 云散: '구름이 걷히다', 长风: '긴 바람', 雁回: '기러기가 돌아오다', 风定: '들판이 고요해진다' };

// Default boss names by enemy kind (director may send its own via enemy:spawn {name, sub}).
export const BOSS_NAMES = {
  swordmaster: { name: '寒山客', sub: '한산객 · 차가운 산의 검객' },
  boss: { name: '寒山客', sub: '한산객 · 차가운 산의 검객' },
  bandit_heavy: { name: '断岳', sub: '단악 · 산을 부수는 자' },
  assassin: { name: '夜枭', sub: '야효 · 밤의 자객' },
};

export const CONTROLS = [
  ['W A S D', '行', '이동'],
  ['Mouse', '顾', '시선'],
  ['LMB', '斩', '베기'],
  ['Hold LMB', '劈', '강하게 베기'],
  ['RMB', '格', '막기 · 적중 타이밍 패링'],
  ['Space', '闪', '회피'],
  ['Shift', '疾', '질주'],
  ['Q · Tab', '锁', '조준 고정'],
  ['E', '气', '검기'],
  ['F', '剑', '발도 · 납도'],
  ['Esc', '歇', '일시정지'],
];
// The in-game hint shows only the essentials.
export const HINT = [0, 2, 4, 5, 7, 8];

export const VICTORY = {
  lines: ['十步杀一人', '千里不留行', '事了拂衣去', '深藏身与名'],
  en: '열 걸음마다 한 사람을 베고, 천 리를 가도 자취를 남기지 않네.<br>일을 마치면 옷자락 털고 떠나, 몸과 이름을 깊이 감추네.',
  src: '이백 《협객행》',
  go: ['다시 싸우다', 'ride on'],
};
export const DEFEAT = {
  lines: ['风萧萧兮易水寒', '壮士一去兮不复还'],
  en: '바람은 쓸쓸히 불고 역수 물은 차거늘,<br>장사가 한 번 떠나면 다시 돌아오지 않네.',
  src: '《역수가》',
  go: ['다시 일어서다', 'rise again'],
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export const FILTERS = `
<svg class="defs" aria-hidden="true" focusable="false"><defs>
  <filter id="wx-ink" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="4" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="wx-ink-live" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves="3" seed="7" result="n">
      <animate attributeName="baseFrequency" dur="18s" values="0.026;0.034;0.026" repeatCount="indefinite"/>
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="0.35"/>
  </filter>
</defs></svg>`;

export const HUD_HTML = `
${FILTERS}
<div class="lyr marks"></div>
<div class="lyr fxl"></div>
<div class="edge"></div>
<div class="qi"></div>
<div class="play vitals">
  <div class="focus"><div class="wash"></div><div class="rt m"></div><div class="r m"></div><div class="pulse m"></div><div class="g">气</div></div>
  <div class="health"><div class="tr m"></div><div class="gh m"></div><div class="fl m"></div></div>
</div>
<div class="play boss"><div class="nm"></div><div class="sb"></div>
  <div class="bar"><div class="tr m"></div><div class="gh m"></div><div class="fl m"></div></div>
  <div class="po"><div class="a m"></div><div class="b m"></div></div>
</div>
<div class="ret"><div class="e m"></div><div class="d"></div></div>
<div class="banner"><div class="wash"></div><div class="no"></div><div class="tt"></div><div class="ru m"></div><div class="en"></div><img class="seal" alt=""></div>
<div class="hint">${HINT.map((i) => `<kbd>${CONTROLS[i][0]}</kbd><span>${CONTROLS[i][1]}<i>${CONTROLS[i][2]}</i></span>`).join('')}</div>

<div class="scr title">
  <div class="shade"></div>
  <div class="col"><div class="tt">长风</div><div class="tg">하늘은 아득하고 · 들판은 끝없어라</div><img class="seal" alt=""></div>
  <div class="en"><b>LONG WIND</b><i>the wind arrives before the blade</i></div>
  <div class="go"><div class="ln m"></div><div class="t"><b>클릭 · 출발</b><i>click to begin</i></div><div class="ln r m"></div></div>
</div>

<div class="scr pause">
  <div class="shade"></div>
  <div class="pn">
    <div class="hd">歇<small>PAUSED</small></div>
    <div class="mn">
      <button data-act="resume"><b>계속</b><i>resume</i></button>
      <button data-act="restart"><b>다시 시작</b><i>restart</i></button>
      <button data-act="controls"><b>조작법</b><i>controls</i></button>
      <div class="vol"><b>소리</b><div class="sl"><div class="tr m"></div><div class="fl m"></div></div><i>volume</i></div>
      <div class="qual"><b>화질</b><span class="qo" data-q="low">원활</span><span class="qo" data-q="med">균형</span><span class="qo" data-q="high">최고</span><i>quality</i></div>
      <div class="ctl">${CONTROLS.map(([k, zh, en]) => `<kbd>${k}</kbd><span>${zh}<i>${en}</i></span>`).join('')}</div>
    </div>
  </div>
  <div class="ft">the grass waits · the wind does not</div>
</div>

<div class="scr end victory">
  <div class="shade"></div>
  <div class="st"></div>
  <div class="body"></div>
  <div class="tr"></div>
  <div class="go" data-act="restart"></div>
</div>
<div class="scr end defeat">
  <div class="shade"></div>
  <div class="body"></div>
  <div class="tr"></div>
  <div class="go" data-act="restart"></div>
</div>`;

/** Fill an ending screen with its poem. Lines are vertical columns read right-to-left. */
export function fillEnding(root, poem, sealUrl) {
  const body = root.querySelector('.body');
  body.innerHTML = poem.lines.map((l, i) => `<div class="ln${i >= 2 ? ' sm' : ''}" style="--i:${i}">${esc(l)}</div>`).join('') +
    (sealUrl ? `<img class="seal" src="${sealUrl}" alt="">` : '');
  root.querySelector('.tr').innerHTML = `${poem.en}<small>${esc(poem.src)}</small>`;
  root.querySelector('.go').innerHTML = `<b>${esc(poem.go[0])}</b><i>${esc(poem.go[1])}</i>`;
}

export { esc };
