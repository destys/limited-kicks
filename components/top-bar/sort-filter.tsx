interface SortFilterProps {
    onChange: (sortValue: string) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({ onChange }) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="sort" className="mb-2 text-sm">Сортировка:</label>
            <select id="sort" className="border p-2" onChange={handleSortChange}>
                <option value="default">По дате релиза</option>
                <option value="desc">От дорогих к дешевым</option>
                <option value="asc">От дешевых к дорогим</option>
            </select>
        </div>
    );
}
