import { FC, useState } from "react";
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
  const toggle = () => {
    setIsActive((prev) => {
      onChange?.(!prev);
      return !prev;
    });
  };
  return (
    <div className={cls("main", className)}>
      <div
        className={cls("ToggleBox", {
          ToggleBox_active: isActive,
        })}
        onClick={toggle}
      >
        <div className="toggler"></div>
      </div>
      <div className="label">{label}</div>
    </div>
  );
};
