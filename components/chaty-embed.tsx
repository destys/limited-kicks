'use client';

import { useEffect, useState } from 'react';

export default function ChatyEmbed() {
  const [html, setHtml] = useState('');
  console.log('html: ', html);

  useEffect(() => {
    const res = fetch('https://limited-kicks.ru/admin/wp-json/chaty/v1/widget')
      .then((res) => res.json())
      .then((data) => {
        if (data?.html) {
          setHtml(data.html);
        }
      });
    console.log('res: ', res);
  }, []);

  useEffect(() => {
    if (!html) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Вставка <link> в <head>
    const links = tempDiv.querySelectorAll('link[rel="stylesheet"]');
    links.forEach((link) => {
      const exists = document.querySelector(`link[href="${link.getAttribute('href')}"]`);
      if (!exists) {
        const clone = document.createElement('link');
        Array.from(link.attributes).forEach((attr) =>
          clone.setAttribute(attr.name, attr.value)
        );
        document.head.appendChild(clone);
      }
    });

    // Вставка <script> в <body>
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach((script) => {
      const newScript = document.createElement('script');

      // Копируем все атрибуты
      Array.from(script.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );

      // Переносим содержимое (если inline-скрипт)
      if (script.textContent) {
        newScript.textContent = script.textContent;
      }

      document.body.appendChild(newScript);
    });

    // Вставка остальных HTML-элементов (div и пр.)
    const others = tempDiv.querySelectorAll('div, span, section');
    others.forEach((el) => {
      document.body.appendChild(el.cloneNode(true));
    });
  }, [html]);

  return null;
}