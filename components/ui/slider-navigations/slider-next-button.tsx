import { useSwiper } from "swiper/react";

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className="flex items-center justify-center py-2 px-3 md:px-4 md:py-3 rounded bg-add_1 transition-colors hover:hover:bg-add_1_hv disabled:bg-gray-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M10.5 5.83331L17.5 14L10.5 22.1666"
          stroke="#060F2F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
