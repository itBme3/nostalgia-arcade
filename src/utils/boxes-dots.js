// @ts-nocheck
import { browser } from '$app/env';
import chroma from 'chroma-js';
const confettiColors = {
  blue: [],
  pink: [],
};
const blue = '#06b6d4';
const pink = '#ec4899';

for (let i = 0; i < 5; i++) {
  confettiColors.pink.push({
    front: chroma(pink)
      .set('hsl.h', `*0.${97 - i}`)
      .saturate(1)
      .brighten(0.7),
    back: chroma(pink)
      .set('hsl.h', `*0.${97 - i}`)
      .saturate(1)
      .darken(0.5),
  });
  confettiColors.blue.push({
    front: chroma(blue)
      .set('hsl.h', `*0.${97 - i}`)
      .saturate(1)
      .brighten(0.7),
    back: chroma(blue)
      .set('hsl.h', `*0.${97 - i}`)
      .saturate(1)
      .darken(0.5),
  });
}

export const confettiExplosion = (containerSelector, color) => {
  if(!browser) { return }
  const canvas = document.createElement('canvas');
  const container =
    typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetWidth;
  canvas.style.position = 'absolute';
  canvas.style.left = '0px';
  canvas.style.right = '0px';
  canvas.style.bottom = '0px';
  canvas.style.top = '0px';
  canvas.style.transform = 'scale(1.5)';

  const confetti = [];
  const confettiCount = 20;
  const gravity = 0.25;
  const terminalVelocity = 5;
  const drag = 0.075;
  const colors = confettiColors[color];

  const randomRange = (min, max) => Math.random() * (max - min) + min;

  const initConfetti = () => {
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        color: colors[Math.floor(randomRange(0, colors.length))],
        dimensions: {
          x: randomRange(canvas.height * 0.03, canvas.height * 0.1),
          y: randomRange(canvas.height * 0.03, canvas.width * 0.1),
        },
        position: {
          x: randomRange(0, canvas.width),
          y: canvas.height - 1,
        },
        rotation: randomRange(0, 2 * Math.PI),
        scale: {
          x: 1,
          y: 1,
        },
        velocity: {
          x: randomRange(-2, 5),
          y: randomRange(2, -10),
        },
      });
    }
  };

  //---------Render-----------
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((confetto, index) => {
      let width = confetto.dimensions.x * confetto.scale.x;
      let height = confetto.dimensions.y * confetto.scale.y;

      // Move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // Apply forces to velocity
      confetto.velocity.x -= confetto.velocity.x * drag;
      confetto.velocity.y = Math.min(
        confetto.velocity.y + gravity,
        terminalVelocity
      );
      confetto.velocity.x +=
        Math.random() > 0.5 ? Math.random() : -Math.random();

      // Set position
      confetto.position.x += confetto.velocity.x;
      confetto.position.y += confetto.velocity.y;

      // Delete confetti when out of frame
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

      // Loop confetto x position
      if (confetto.position.x > canvas.width) confetto.position.x = 0;
      if (confetto.position.x < 0) confetto.position.x = canvas.width;

      // Spin confetto by scaling y
      confetto.scale.y = Math.cos(confetto.position.y * 0.1);
      ctx.fillStyle =
        confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // Draw confetto
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    });

    // Fire off another round of confetti

    window.requestAnimationFrame(render);
  };

  //---------Execution--------
  initConfetti();
  render();
  setTimeout(() => {
    canvas.remove();
  }, 1000);
};
