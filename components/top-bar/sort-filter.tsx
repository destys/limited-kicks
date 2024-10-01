interface SortFilterProps {
    onChange: (sortValue: string) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({ onChange }) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="sort" className="mb-2 text-sm px-3 lg:px-0">Сортировка:</label>
            <select id="sort" className=" border-b border-b-add_1 lg:border px-2 py-4 lg:p-2 text-xs" onChange={handleSortChange}>
                <option value="default">По дате релиза</option>
                <option value="desc">От дорогих к дешевым</option>
                <option value="asc">От дешевых к дорогим</option>
            </select>
        </div>
    );
}
