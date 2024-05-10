import { FC } from "react";
import cls from "classnames";

import "./styles.scss";

type Props = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};
export const Container: FC<Props> = ({ children, className }) => {
  return <div className={cls("container", className)}>{children}</div>;
};
