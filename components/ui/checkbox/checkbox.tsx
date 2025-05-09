import { cn } from "@/lib/utils";

interface ICheckBox {
  className?: string;
  label: string;
  id: string;
  name: string;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: any;
  wrapperClassNames?: string;
  onChange?: (e: any) => void;
}

const CheckBox: React.FC<ICheckBox> = ({ className, label, id, name, wrapperClassNames, ...props }) => {
  return (
    <div className={wrapperClassNames}>
      <input type="checkbox" id={id} className="hidden peer" name={name} {...props} />
      {label && (
        <label
          htmlFor={id}
          className={cn('flex items-center gap-6 relative py-3 px-5 pl-10 lg:py-8 lg:px-10 lg:pl-20 text-sm sm:text-base lg:text-lg border border-transparent rounded-lg cursor-pointer bg-add_1 text-add_2 transition-colors before:w-4 before:h-4 md:before:w-5 md:before:h-5 before:rounded-full before:absolute before:t-[50%] before:left-[13px] lg:before:left-10 before:border before:border-add_4 after:w-3 after:h-3 md:after:w-4 md:after:h-4 after:rounded-full after:absolute after:t-[50%] after:left-[15px] lg:after:left-[42px] after:transition-colors peer-checked:border-black peer-checked:after:bg-black', className)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
