'use client';

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import Button from '../ui/button/button';

export const CookieNotice = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const closed = localStorage.getItem('cookie_notice_closed');
        if (!closed) {
            setVisible(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('cookie_notice_closed', '1');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className={cn(
            "fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:bottom-8 max-w-2xl bg-white shadow-lg border rounded-xl p-4 z-[10000]",
            "flex flex-col md:flex-row items-start md:items-center gap-4"
        )}>
            <div className="text-sm text-gray-800">
                Мы используем файлы cookies для улучшения работы сайта. Продолжая пользоваться сайтом, вы соглашаетесь с нашей{' '}
                <a href="/privacy-policy" className="underline">политикой конфиденциальности</a>.
            </div>
            <Button onClick={handleClose} styled="filled" className="mt-2 md:mt-0 md:ml-auto">
                Понятно
            </Button>
        </div>
    );
};