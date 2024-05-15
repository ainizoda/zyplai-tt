import { FC, useRef, useState } from "react";
import cls from "classnames";

import "./styles.scss";

type Props = {
  label: string;
  active?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
};
export const ToggleBox: FC<Props> = ({
  label,
  active = false,
  onChange,
  className,
}) => {
  const [isActive, setIsActive] = useState(active);
  const [isDragging, setIsDragging] = useState(false);

  const toggleRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsActive((prev) => {
      onChange?.(!prev);
      return !prev;
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (isDragging) {
      const box = toggleRef.current!.getBoundingClientRect();
      const togglePosition = Math.min(
        Math.max(0, event.clientX - box.left),
        box.left + box.width
      );
      const isActive = togglePosition > box.width / 2;
      setIsActive(isActive);
      onChange?.(isActive);
    }
  };

  return (
    <div
      className={cls("ToggleBox", className)}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div
        className={cls("toggler", {
          on: isActive,
        })}
        onClick={toggle}
        ref={toggleRef}
      ></div>
      <div className="label">{label}</div>
    </div>
  );
};
