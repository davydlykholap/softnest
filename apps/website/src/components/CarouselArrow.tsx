import { ChevronLeftIcon, ChevronRightIcon } from "@/components/UiIcons";

export default function CarouselArrow({ direction, label, disabled, onClick }: {
  direction: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`gallery-carousel-arrow gallery-carousel-arrow--${direction}`} type="button" aria-label={label} disabled={disabled} onClick={onClick}>
      {direction === "prev" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}
