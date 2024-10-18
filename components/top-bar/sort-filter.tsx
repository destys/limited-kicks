import { useState } from 'react';

interface SortFilterProps {
    onChange: (sortValue: string) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('По дате релиза');

    const handleSortChange = (sortValue: string, label: string) => {
        setSelectedOption(label);
        onChange(sortValue);
        setIsOpen(false);
    };

    const options = [
        { value: 'default', label: 'По дате релиза' },
        { value: 'desc', label: 'От дорогих к дешевым' },
        { value: 'asc', label: 'От дешевых к дорогим' }
    ];

    return (
        <div className="relative flex flex-col">
            {/* Заголовок "Сортировка" */}
            <label htmlFor="sort" className="hidden lg:block mb-2 text-sm px-3 lg:px-0">Сортировка:</label>
            {/* Основной блок имитации select */}
            <div 
                className="border-b border-b-add_1 lg:border-none lg:rounded-lg lg:bg-add_1 transition-colors lg:hover:bg-add_1_hv lg:cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between gap-3 py-3 px-2.5 md:py-3 md:px-5 lg:py-4 lg:px-6">
                    <p className="text-xs xs:text-sm md:text-base">{selectedOption}</p>
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`max-md:max-w-[16px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                        <path
                            d="M17.5 5.83331L10.5 14L17.5 22.1666"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {/* Выпадающий список */}
            <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <div className="lg:absolute lg:w-full lg:z-[1000] bg-add_1/50 lg:bg-add_1 lg:border lg:rounded-lg grid grid-cols-1 gap-2 mb-4 p-2 pt-3 overflow-y-auto max-h-[280px]">
                    {options.map(option => (
                        <div key={option.value}>
                            <div
                                className={`flex items-center gap-6 relative py-3 px-5 pl-10 lg:py-4 lg:px-6 lg:pl-14 text-sm sm:text-base lg:text-lg rounded-lg cursor-pointer bg-add_1 text-add_2 transition-colors hover:bg-add_1_hv border border-add_4 font-medium !text-xs !max-md:text-sm justify-center 
                                    ${selectedOption === option.label ? 'bg-add_2 text-white' : ''}`}
                                onClick={() => handleSortChange(option.value, option.label)}
                            >
                                {option.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};