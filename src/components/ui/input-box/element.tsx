import { FC, useMemo, useRef } from "react";
import cls from "classnames";
import { v4 as generateUUID } from "uuid";

import "./styles.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  inputClassName?: string;
  label?: string;
  id?: string;
  error?: string;
  icon?: JSX.Element;
  autoGrow?: boolean;
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;

  /*
    type?: React.HTMLInputTypeAttribute | "textarea"; - could be done somehow like this, but
    this approach is not good, because we're kinda trying to add our custom value
    for 'type' attribute into react internal types, which can cause problems potentially, 
    that's why I chose to add autoGrow prop instead
  */
};

export const InputBox: FC<Props> = ({
  className,
  inputClassName,
  placeholder,
  onChange,
  type,
  id,
  error,
  icon,
  autoGrow = false,
  value,
  name,
  ...props
}) => {
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  const fieldId = useMemo(() => id || generateUUID(), [id]);

  const increaseHeight = () => {
    fieldRef!.current!.style.height = "84px";
    const scrollHeight = fieldRef!.current!.scrollHeight;
    fieldRef!.current!.style.height = scrollHeight + "px";
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { tagName } = event.target;

    onChange?.(event);

    if (tagName === "TEXTAREA") {
      increaseHeight();
    }
  };
  return (
    <div
      className={cls("InputBox", className, {
        error: Boolean(error?.length),
      })}
    >
      {autoGrow ? (
        <textarea
          className={inputClassName}
          onChange={handleChange}
          ref={fieldRef}
          id={fieldId}
          placeholder="&nbsp;"
          value={value}
          name={name}
        />
      ) : (
        <input
          className={inputClassName}
          onChange={handleChange}
          type={type}
          id={fieldId}
          placeholder="&nbsp;"
          value={value}
          name={name}
          {...props}
        />
      )}
      <label htmlFor={fieldId} className="label">
        {error || placeholder}
      </label>
      {icon}
    </div>
  );
};
