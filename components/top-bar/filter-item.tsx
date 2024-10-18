import { Attribute } from "@/types";
import { SetStateAction, useState, useEffect, useRef } from "react";

import getAttributes from "@/actions/get-attributes";
import CheckBox from "../ui/checkbox/checkbox";

interface IFilterItem {
  data: Attribute;
  onChange: (arg0: string, arg1: SetStateAction<string>, arg2: boolean, arg3: string) => void;
}

const FilterItem: React.FC<IFilterItem> = ({ data, onChange }) => {
  const [open, setOpen] = useState(false);
  const [attributes, setAttributes] = useState<Attribute[] | null>(null);

  // Create a ref to track the component wrapper
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const attributesList = await getAttributes(data.id);
      const filteredAttributesList = attributesList.filter(attribute =>
        data.options.includes(attribute.id)
      );
      setAttributes(filteredAttributesList);
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    // Function to handle click outside the component
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Изменено: передаем текстовое значение вместо ID
  const handleInputChange = (event: { target: { value: string; checked: boolean } }, optionName: string) => {
    onChange(data.slug, event.target.value, event.target.checked, optionName);
  };

  if (attributes && attributes.length < 2) return null;

  return (
    <div
      ref={wrapperRef}
      className={`border-b border-b-add_1 lg:rounded-lg lg:bg-add_1 transition-colors ${!open && " lg:hover:bg-add_1_hv"
        }`}
    >
      <div
        className="flex items-center justify-between gap-3 py-3 px-2.5 md:py-3 md:px-5 lg:py-5 lg:px-7 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="text-xs xs:text-sm md:text-base">{data.name}</p>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`max-md:max-w-[16px] transition-transform ${open ? '-rotate-90' : ''}`}
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
      <div className={open ? 'block relative' : 'hidden'}>
        <div className="lg:absolute lg:-top-1 lg:w-full lg:z-[1000] bg-add_1/50 lg:bg-add_1 grid grid-cols-2 gap-2 mb-4 p-2 pt-3 overflow-y-auto max-h-[280px]">
          {attributes?.map((option) => (
            <CheckBox
              key={option.id}
              label={option.name}
              name={option.slug}
              id={option.slug + '_' + option.id}
              onChange={(e) => handleInputChange(e, option.name)}
              className="!py-2 !px-3 border border-add_4 font-medium !text-xs !max-md:text-sm justify-center before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value={option.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterItem;