// components/SmokeEffect.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SmokeEffect = ({ backgroundColor }) => {

  const containerRef = useRef();

  useEffect(() => {
    // Инициализация сцены, камеры, рендерера
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Настройки для частиц
    let particleCount = 3000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3); // Каждая частица имеет x, y, z
    const velocities = new Float32Array(particleCount * 3); // Скорости частиц
    const lifetimes = new Float32Array(particleCount); // Время жизни частиц
    const sizes = new Float32Array(particleCount); // Размеры частиц
    const colors = new Float32Array(particleCount * 3); // Цвет каждой частицы

    let source = { x: 0, y: 0, z: 0 }; // Источник дыма, привязанный к курсору
    let cursorActive = true;
    let lastMoveTime = Date.now();
    let moveTarget = { x: 0, y: 0 }; // Цель для произвольного движения источника, если курсора нет

    // Массив цветов для естественного дыма на белом фоне
    const whiteSmokeColors = [
      [0.8, 0.8, 0.8],  // Светло-серый
      [0.9, 0.9, 0.9],  // Почти белый
      [0.7, 0.85, 0.9], // Бледно-голубой
      [0.75, 0.75, 0.75], // Мягкий серебристый
    ];

    // Массив цветов для естественного дыма на черном фоне
    const blackSmokeColors = [
      [0.4, 0.4, 0.4],  // Темно-серый
      [0.35, 0.3, 0.25],  // Светло-коричневый
      [0.3, 0.35, 0.4],   // Слабый дымчатый синий
      [0.2, 0.2, 0.2],    // Почти черный
    ];

    // Функция для получения случайного цвета
    function getRandomColor(colorsArray) {
      const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
      return { r: color[0], g: color[1], b: color[2] };
    }

    // Инициализируем частицы с цветами для белого или черного фона
    const colorsArray = backgroundColor ? whiteSmokeColors : blackSmokeColors;
    
    function initializeParticles() {
      for (let i = 0; i < particleCount; i++) {
        // Сферические координаты для окружности
        const theta = Math.random() * 2 * Math.PI; // Угол по горизонтали
        const phi = Math.acos((Math.random() * 2) - 1); // Угол по вертикали
        const radius = Math.random() * 0.2 + 0.05; // Уменьшенный радиус

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = radius * Math.cos(phi); // z

        // Небольшое случайное движение для каждой частицы
        velocities[i * 3] = (Math.random() - 0.5) * 0.002; // Скорость x
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002; // Скорость y
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002; // Скорость z

        lifetimes[i] = Math.random() * 150 + 50; // Время жизни
        sizes[i] = Math.random() * 0.01 + 0.003; // Меньший размер частиц

        // Устанавливаем случайный цвет для дыма
        const color = getRandomColor(colorsArray);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    }

    // Инициализируем частицы
    initializeParticles();

    // Материал для частиц
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Меньший размер для плотного эффекта
      vertexColors: true, // Использование цвета из геометрии
      transparent: true,
      opacity: 0.7,
      depthTest: false,
      blending: THREE.AdditiveBlending, // Для плавного смешивания частиц
    });

    // Создаем Points (точки), которые представляют частицы
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Позиционируем камеру
    camera.position.z = 5;

    // Функция для плавного движения источника, если курсор неактивен
    function moveSourceRandomly() {
      const time = Date.now();
      if (cursorActive || time - lastMoveTime < 2000) return; // Ждем 2 секунды перед началом произвольного движения

      // Двигаем источник плавно по экрану
      const moveSpeed = 0.005;
      source.x += (moveTarget.x - source.x) * moveSpeed;
      source.y += (moveTarget.y - source.y) * moveSpeed;

      // Если достигли цели, задаем новую
      if (Math.abs(source.x - moveTarget.x) < 0.01 && Math.abs(source.y - moveTarget.y) < 0.01) {
        moveTarget.x = (Math.random() - 0.5) * 1.4; // Произвольное движение по ширине экрана
        moveTarget.y = (Math.random() - 0.5) * 1.4; // Произвольное движение по высоте экрана
      }
    }

    // Анимация
    function animate() {
      requestAnimationFrame(animate);

      moveSourceRandomly(); // Вызываем функцию для перемещения источника, если курсор неактивен

      // Обновляем позиции частиц
      const positions = particlesGeometry.attributes.position.array;
      const sizes = particlesGeometry.attributes.size.array;
      const colors = particlesGeometry.attributes.color.array;

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3;

        // Двигаем частицы
        positions[index] += velocities[index];
        positions[index + 1] += velocities[index + 1];
        positions[index + 2] += velocities[index + 2];

        // Уменьшаем время жизни частиц
        lifetimes[i]--;

        // Уменьшение размера частицы и затухание
        sizes[i] *= 0.99;

        // Плавное изменение цвета для более естественного затухания
        if (backgroundColor === 'white') {
          colors[index] *= 0.99; // Для белого фона
          colors[index + 1] *= 0.99;
          colors[index + 2] *= 0.99;
        } else {
          colors[index] *= 0.97; // Для черного фона
          colors[index + 1] *= 0.97;
          colors[index + 2] *= 0.97;
        }

        // Если частица "умирает", возвращаем её к источнику (курсор)
        if (lifetimes[i] <= 0) {
          positions[index] = source.x;
          positions[index + 1] = source.y;
          positions[index + 2] = source.z;

          lifetimes[i] = Math.random() * 150 + 50; // Новая жизнь
          sizes[i] = Math.random() * 0.01 + 0.003; // Новый размер

          // Устанавливаем случайный цвет для новой частицы
          const color = getRandomColor(backgroundColor === 'white' ? whiteSmokeColors : blackSmokeColors);
          colors[index] = color.r;
          colors[index + 1] = color.g;
          colors[index + 2] = color.b;

          // Новое направление
          velocities[index] = (Math.random() - 0.5) * 0.002;
          velocities[index + 1] = (Math.random() - 0.5) * 0.002;
          velocities[index + 2] = (Math.random() - 0.5) * 0.002;
        }
      }

      // Обновляем геометрию частиц
      particlesGeometry.attributes.position.needsUpdate = true;
      particlesGeometry.attributes.color.needsUpdate = true;
      particlesGeometry.attributes.size.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    // Следим за движением курсора
    document.addEventListener('mousemove', (event) => {
      cursorActive = true; // Курсор активен
      lastMoveTime = Date.now(); // Обновляем время последнего движения курсора

      // Получаем координаты мыши относительно окна
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Преобразуем их в координаты сцены
      const vector = new THREE.Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1,
        0.5
      );

      vector.unproject(camera); // Преобразуем в 3D-пространство

      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Устанавливаем источник дыма на позиции курсора
      source.x = pos.x;
      source.y = pos.y;
      source.z = pos.z;
    });

    // Если курсор уходит с экрана
    document.addEventListener('mouseleave', () => {
      cursorActive = false; // Курсор ушел с экрана, начинаем произвольное движение
      moveTarget.x = (Math.random() - 0.5) * 1.4; // Новая цель по ширине экрана
      moveTarget.y = (Math.random() - 0.5) * 1.4;
    });

    return () => {
      // Очистка при размонтировании компонента
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [backgroundColor]);

  return <div ref={containerRef} style={{ position: 'fixed', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1 }} />;
};

export default SmokeEffect;
