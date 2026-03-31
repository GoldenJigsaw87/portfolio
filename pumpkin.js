// const canvas = document.getElementById('static');
// const ctx = canvas.getContext('2d');

// function resize() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resize);
// resize();

// function drawStatic() {
//   const imageData = ctx.createImageData(canvas.width, canvas.height);
//   const buffer = new Uint32Array(imageData.data.buffer);

//   for (let i = 0; i < buffer.length; i++) {
//     const shade = Math.random() < 0.5 ? 0xff000000 : 0xffffffff;
//     buffer[i] = shade;
//   }

//   ctx.putImageData(imageData, 0, 0);
// }

// // slightly slower update for a cinematic flicker
// function animate() {
//   drawStatic();
//   setTimeout(() => requestAnimationFrame(animate), 40);
// }

// animate();
