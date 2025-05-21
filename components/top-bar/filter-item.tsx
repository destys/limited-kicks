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
      try {
        const attributesList = await getAttributes(data.id);

        if (data.name === 'Модель') console.log('attributesList: ', attributesList);

        const filteredAttributesList = attributesList.filter(attribute =>
          data.options.includes(attribute.id)
        );
        if (data.name === 'Модель') console.log('filteredAttributesList: ', filteredAttributesList);
        setAttributes(filteredAttributesList);
      } catch (e) {
        console.log(e)
      }
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

  if (attributes && attributes.length < 1) return null;

  return (
    <div>
      {
        data.name === 'Коллекция' ? (
          <div
            ref={wrapperRef}
            className=""
          >
            <div className="block my-4 md:my-8">
              <div className="mb-2 text-xs xs:text-sm md:text-base px-2.5 md:px-5 lg:px-7">В центре внимания</div>
              <div className="flex pb-3 md:pb-0 overflow-x-auto w-full md:grid md:grid-cols-2 gap-2">
                {attributes?.map((option) => (
                  <CheckBox
                    key={option.id}
                    label={option.name}
                    name={option.slug}
                    id={option.slug + '_' + option.id}
                    onChange={(e) => handleInputChange(e, option.name)}
                    className="basis-3/5 !py-2 !px-3 border bg-transparent border-add_4 h-full font-medium !text-xs !max-md:text-sm justify-center text-center before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
                    value={option.id}
                    wrapperClassNames="shrink-0 basis-3/4 h-full"
                  />
                ))}
              </div>
            </div>

          </div>
        ) : (
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
              <div className="bg-add_1/50 lg:bg-add_1 grid grid-cols-2 gap-2 mb-4 p-2 pt-3 overflow-y-auto max-h-[280px]">
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

        )
      }
    </div>
  );
}

export default FilterItem;