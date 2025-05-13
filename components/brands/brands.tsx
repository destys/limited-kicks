'use client';

import { useRef, useEffect } from 'react';
import { Brand } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './brands.module.scss';

interface IBrands {
  data: Brand[];
}

const Brands: React.FC<IBrands> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // ❗ Создаём один ref на каждый элемент
  const dragRefs = useRef<Record<number, boolean>>({});

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const start = (clientX: number) => {
      isDraggingRef.current = true;
      el.classList.add('dragging');
      startXRef.current = clientX - el.offsetLeft;
      scrollLeftRef.current = el.scrollLeft;
    };

    const move = (clientX: number) => {
      if (!isDraggingRef.current) return;
      const x = clientX - el.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const end = () => {
      isDraggingRef.current = false;
      el.classList.remove('dragging');
    };

    const onMouseDown = (e: MouseEvent) => start(e.pageX);
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) e.preventDefault();
      move(e.pageX);
    };
    const onTouchStart = (e: TouchEvent) => start(e.touches[0].pageX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].pageX);
    const onMouseUp = end;
    const onMouseLeave = end;
    const onTouchEnd = end;

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseLeave);

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseLeave);

      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section aria-label="Популярные бренды" className="mb-8">
      <h2 className="sr-only">Бренды</h2>
      <div
        ref={containerRef}
        className="flex gap-3 pb-3 overflow-x-auto cursor-grab select-none"
        style={{ scrollBehavior: 'smooth' }}
      >
        {data.map((item) => {
          // сохраняем ref по item.id
          const handleMouseDown = () => {
            dragRefs.current[item.id] = false;
          };

          const handleMouseMove = () => {
            dragRefs.current[item.id] = true;
          };

          const handleClick = (e: React.MouseEvent) => {
            if (dragRefs.current[item.id]) {
              e.preventDefault();
            }
          };

          return (
            <Link
              key={item.id}
              href={`/brand/${item.slug}`}
              className={styles.slide}
              draggable={false}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            >
              {item.acf?.logotip?.url ? (
                <Image
                  src={item.acf.logotip.url}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              ) : (
                <p>{item.name}</p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Brands;