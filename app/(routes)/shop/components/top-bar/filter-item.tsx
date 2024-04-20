export default function FilterItem({ data }: { data: { id: number; title: string } }) {
  return (
    <div className="rounded-lg bg-add_1 transition-colors hover:bg-add_1_hv group">
      <div className="flex items-center justify-between gap-3 py-1.5 px-2.5 md:py-3 md:px-5 lg:py-5 lg:px-7 cursor-pointer">
        <p className="text-xs xs:text-sm md:text-base">{data.title}</p>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-md:max-w-[16px] group-hover:-rotate-90 transition-transform"
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
  );
}
