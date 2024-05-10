import { FC } from "react";
import cls from "classnames";

import "./styles.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};
export const Button: FC<Props> = ({ children, className }) => {
  return <button className={cls("Button", className)}>{children}</button>;
};
