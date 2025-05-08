import React from 'react';
import { Range } from 'react-range';

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    onChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, onChange }) => {
    const [values, setValues] = React.useState([minPrice, maxPrice]);

    const handleRangeChange = (values: number[]) => {
        setValues(values);
    };

    if (minPrice >= maxPrice) return <div></div>;

    return (
        <div className="relative mt-10 mb-5 mx-8">
            <div className="mb-3 text-sm px-3">Цена</div>
            <div>
                <Range
                    step={1000}
                    min={minPrice}
                    max={maxPrice}
                    values={values}
                    onChange={handleRangeChange}
                    onFinalChange={() => onChange(values[0], values[1])}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '3px',
                                backgroundColor: '#8F8F8F',
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '15px',
                                width: '15px',
                                borderRadius: '50%',
                                backgroundColor: '#2972FF',
                            }}
                        />
                    )}
                />
            </div>
            <div className="flex justify-between text-xs mt-2">
                <span>{values[0]}₽</span>
                <span>{values[1]}₽</span>
            </div>
        </div>
    );
};

export default PriceFilter;