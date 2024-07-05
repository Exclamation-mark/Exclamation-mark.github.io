---
title: YouTrack 的 loading 特效
author: zzq
pubDatetime: 2024-07-05T12:07:51.366Z
modDatetime: 2024-07-05T12:07:51.367Z
slug: youtrack_的_loading_特效.md
featured: true
draft: false
tags:
  - 后端
  - 前端
ogImage: ""
description: YouTrack 的 loading 特效
canonicalURL: ""
---

使用canvas的创建动画效果。它包括一个粒子动画，粒子在canvas上移动并逐渐消失。以下是简化和组织后的代码版本，以便更容易理解。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .loader-screen-fast {
        position: absolute;
        overflow: auto;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
      }

      .loader-screen-fast__canvas-wrapper {
        height: 64px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .fast_loader__canvas {
        display: block;
        margin: 16px auto;
        pointer-events: none;
      }

      @keyframes c_rotation-keyframes__b67 {
        100% {
          transform: rotate(360deg);
        }
      }

      .fast_loader__animate {
        animation: c_rotation-keyframes__b67 36s linear infinite;
      }

      .fast_loader__text {
        text-align: center;
        font-family: var(--ring-font-family);
        font-size: var(--ring-font-size);
        line-height: var(--ring-line-height);
      }
    </style>
    <title>Canvas Animation</title>
  </head>
  <body>
    <div id="fast-loader" class="loader-screen-fast">
      <div class="loader-screen-fast__canvas-wrapper"></div>
    </div>

    <script>
      class Particle {
        constructor({ x, y, radius, color }) {
          this.radius = radius;
          this.x = x;
          this.y = y;
          this.color = color;
          this.decay = 0.01;
          this.life = 1;
        }

        step() {
          this.life -= this.decay;
        }

        isAlive() {
          return this.life >= 0;
        }

        draw(ctx) {
          const alpha = this.life >= 0 ? this.life : 0;
          ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(
            this.x + this.radius,
            this.y + this.radius,
            this.radius,
            0,
            2 * Math.PI
          );
          ctx.fill();
        }
      }

      class Loader {
        static defaultProps = {
          size: 64,
          stop: false,
          deterministic: false,
          colors: [
            { r: 215, g: 60, b: 234 },
            { r: 145, g: 53, b: 224 },
            { r: 88, g: 72, b: 224 },
            { r: 37, g: 183, b: 255 },
            { r: 89, g: 189, b: 0 },
            { r: 251, g: 172, b: 2 },
            { r: 227, g: 37, b: 129 },
          ],
        };

        constructor(container, props) {
          this.props = Object.assign({}, Loader.defaultProps, props);
          this.canvas = document.createElement("canvas");
          this.canvas.dataset.test = "ring-loader";
          this.canvas.classList.add("fast_loader__canvas");
          this.textNode = document.createElement("div");
          this.textNode.dataset.test = "ring-loader-text";
          this.textNode.classList.add("fast_loader__text");
          this.textNode.textContent = this.props.message || "";
          container.appendChild(this.canvas);
          container.appendChild(this.textNode);

          const pixelRatio = Loader.getPixelRatio();
          const size = this.props.size * pixelRatio;
          this.canvas.width = size;
          this.canvas.height = size;
          this.canvas.style.width = `${this.props.size}px`;
          this.canvas.style.height = `${this.props.size}px`;
          this.ctx = this.canvas.getContext("2d");
          this.ctx.scale(pixelRatio, pixelRatio);
          this.height = this.props.size;
          this.width = this.props.size;
          this.particles = [];
          this.baseSpeed = 1;
          this.colorIndex = 0;
          this.maxRadius = 10;
          this.minRadius = 6;
          this.colorChangeTick = 40;
          this.x = 0;
          this.y = 0;
          this.radius = 8;
          this.hSpeed = 1.5;
          this.vSpeed = 0.5;
          this.radiusSpeed = 0.05;
          this.tick = 0;
          this.prepareInitialState(100);
          this.isRunning = !this.props.stop;
          this.isRunning ? this.startAnimation() : this.draw();
        }

        static getPixelRatio() {
          return "devicePixelRatio" in window ? window.devicePixelRatio : 1;
        }

        prepareInitialState(count) {
          for (let i = 0; i < count; i++) {
            this.step();
          }
        }

        handleLimits(position, radius, speed, limit) {
          const n =
            (this.props.deterministic ? () => 0.5 : Math.random)() -
            this.baseSpeed / 2;
          return position + 2 * radius + this.baseSpeed >= limit
            ? -(this.baseSpeed + n)
            : position <= this.baseSpeed
              ? this.baseSpeed + n
              : speed;
        }

        calculateNextCoordinates() {
          this.x += this.hSpeed;
          this.y += this.vSpeed;
          this.hSpeed = this.handleLimits(
            this.x,
            this.radius,
            this.hSpeed,
            this.width
          );
          this.vSpeed = this.handleLimits(
            this.y,
            this.radius,
            this.vSpeed,
            this.height
          );
        }

        calculateNextRadius() {
          this.radius += this.radiusSpeed;
          if (this.radius > this.maxRadius || this.radius < this.minRadius) {
            this.radiusSpeed = -this.radiusSpeed;
          }
        }

        getNextColor() {
          const colors = this.props.colors;
          const currentColor = colors[this.colorIndex];
          const nextColor = colors[this.colorIndex + 1] || colors[0];
          const progress = this.tick / this.colorChangeTick;

          const blend = (start, end, progress) =>
            start + Math.round((end - start) * progress);

          return {
            r: blend(currentColor.r, nextColor.r, progress),
            g: blend(currentColor.g, nextColor.g, progress),
            b: blend(currentColor.b, nextColor.b, progress),
          };
        }

        nextTick() {
          this.tick++;
          if (this.tick > this.colorChangeTick) {
            this.tick = 0;
            this.colorIndex++;
            if (this.colorIndex > this.props.colors.length - 1) {
              this.colorIndex = 0;
            }
          }
        }

        step() {
          this.nextTick();
          this.calculateNextCoordinates();
          this.calculateNextRadius();
          this.particles.forEach(particle => particle.step());
          this.particles.push(
            new Particle({
              x: this.x,
              y: this.y,
              radius: this.radius,
              color: this.getNextColor(),
            })
          );
        }

        removeDeadParticles() {
          this.particles = this.particles.filter(particle =>
            particle.isAlive()
          );
        }

        draw() {
          if (this.ctx) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.removeDeadParticles();
            this.particles.forEach(particle => particle.draw(this.ctx));
          }
        }

        loop() {
          this.step();
          this.draw();
          if (this.isRunning) {
            window.requestAnimationFrame(() => this.loop());
          }
        }

        updateMessage(message) {
          this.textNode.textContent = message || "";
        }

        stopAnimation() {
          this.isRunning = false;
          this.canvas.classList.remove("fast_loader__animate");
        }

        startAnimation() {
          this.isRunning = true;
          this.canvas.classList.add("fast_loader__animate");
          this.loop();
        }

        destroy() {
          this.isRunning = false;
        }
      }

      const loaderElement = document.getElementById("fast-loader");
      if (loaderElement) {
        loaderElement.classList.add("loader-screen-fast");
        const canvasWrapper = document.createElement("div");
        canvasWrapper.classList.add("loader-screen-fast__canvas-wrapper");
        loaderElement.appendChild(canvasWrapper);

        const loader = new Loader(canvasWrapper, {
          className: "loader-screen-fast__loader",
          message: "",
        });

        window.__fastLoader = {
          updateMessage: message => {
            loader.updateMessage(message);
          },
          destroy: () => {
            loader.destroy();
            loaderElement.remove();
          },
        };
      }
    </script>
  </body>
</html>
```

### 说明

- **Particle类**: 代表一个粒子，具有位置、半径、颜色、衰减速度和生命值。粒子会逐渐消失，并在canvas上绘制自己。
- **Loader类**: 代表整个动画，包括canvas元素、文本元素和粒子集合。管理粒子的生成、更新和绘制。
- **动画控制**: 使用`requestAnimationFrame`循环实现平滑动画。粒子的位置、半径和颜色随时间变化，模拟粒子运动和渐变效果。
- **样式**: 定义了一些CSS样式，包括动画的关键帧
