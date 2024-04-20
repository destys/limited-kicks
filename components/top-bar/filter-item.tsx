import { useState } from "react";
import Radio from "../ui/radio/radio";

export default function FilterItem({ data }: { data: { id: number; title: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-b-add_1 lg:rounded-lg lg:bg-add_1 transition-colors lg:hover:bg-add_1_hv">
      <div className="flex items-center justify-between gap-3 py-3 px-2.5 md:py-3 md:px-5 lg:py-5 lg:px-7 cursor-pointer" onClick={() => setOpen(!open)}>
        <p className="text-xs xs:text-sm md:text-base" >{data.title}</p>
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
      <div className={open ? 'block' : 'hidden'}>
        {data.id === 0 && (
          <div className="hidden max-lg:flex grid-cols-2 gap-2 mb-4">
            <Radio
              label={"Мужской"}
              name="gender"
              id="male"
              defaultChecked
              className="py-2.5 !px-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value="male"
            />
            <Radio
              label={"Женский"}
              name="gender"
              id="female"
              className="py-2.5 !px-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value="female"
            />
          </div>
        )}
        {data.id === 2 && (
          <div className="hidden max-lg:flex grid-cols-2 gap-2 mb-4">
            <Radio
              label={"XS"}
              name="size"
              id="size-xs"
              defaultChecked
              className="py-2.5 !px-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value="xs"
            />
            <Radio
              label={"S"}
              name="size"
              id="size-s"
              className="py-2.5 !px-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value="s"
            />
            <Radio
              label={"M"}
              name="size"
              id="size-m"
              className="py-2.5 !px-4 max-md:text-xs justify-center font-medium text-lg before:hidden after:hidden peer-checked:bg-add_2 peer-checked:text-white"
              value="m"
            />
          </div>
        )}
      </div>
    </div >
  );
}
