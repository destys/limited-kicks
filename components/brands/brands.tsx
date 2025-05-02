"use client";
import { useRef, useEffect } from "react";
import { Brand } from "@/types";

import Link from "next/link";
import Image from "next/image";

import styles from "./brands.module.scss";

interface IBrands {
  data: Brand[];
}

const Brands: React.FC<IBrands> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Горизонтальная прокрутка колесом мыши
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Перетаскивание мышью
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("dragging");
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("dragging");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section>
      <div
        ref={containerRef}
        className="flex gap-3 mb-2 lg:mb-10 pb-3 overflow-x-auto cursor-grab select-none"
        style={{ scrollBehavior: "smooth" }}
      >
        {data.map((item) => {
          let isDragging = false;

          const handleMouseDown = () => {
            isDragging = false;
          };

          const handleMouseMove = () => {
            isDragging = true;
          };

          const handleClick = (e: React.MouseEvent) => {
            if (isDragging) {
              e.preventDefault(); // 🔒 блокируем переход
            }
          };

          return (
            <Link
              href={`/brand/${item.slug}`}
              className={styles.slide}
              key={item.id}
              draggable={false}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            >
              {item.acf?.logotip?.url ? (
                <Image
                  src={item.acf?.logotip.url}
                  width={200}
                  height={200}
                  alt={item.name}
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