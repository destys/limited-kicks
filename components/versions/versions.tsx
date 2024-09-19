'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './versions.module.scss';
import { Attribute } from '@/types';
import getAttributes from '@/actions/get-attributes';

const Versions = async ({ versionsArray }: { versionsArray: Attribute }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Получаем выбранный `attribute_term` из URL
    const selectedTerm = searchParams.get('attribute_term');

    const versionsList = await getAttributes(versionsArray.id);
    const filteredAttributesList = versionsList.filter(attribute =>
        versionsArray.options.includes(attribute.id)
    );

    const handleVersionClick = (termId: number) => {
        const newQuery = new URLSearchParams(searchParams);

        // Удаляем текущие параметры attribute и attribute_term (если они есть)
        newQuery.delete('attribute');
        newQuery.delete('attribute_term');

        // Добавляем новый атрибут и его значение
        newQuery.append('attribute', 'pa_versiya'); // Фиксированный параметр 'pa_versiya'
        newQuery.append('attribute_term', termId.toString()); // ID выбранного элемента

        // Обновляем URL без перезагрузки страницы
        const newPath = `${pathname}?${newQuery.toString()}`;
        router.push(newPath, { scroll: false });
    };

    return (
        <div className={styles.tagCloud__list}>
            {filteredAttributesList.map((item) => (
                <div
                    key={item.id}
                    className={`flex items-center gap-3 w-fit flex-shrink-0 py-3 px-5 rounded-lg hover:bg-add_1_hv text-sm lg:text-base cursor-pointer
                    ${selectedTerm === item.id.toString() ? 'bg-black text-white' : 'bg-add_1'}`} // Красим выбранный элемент в черный
                    onClick={() => handleVersionClick(item.id)} // Обработка клика
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
};

export default Versions;