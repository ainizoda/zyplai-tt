import { FC, useCallback, useState } from "react";
import { Button, Container, InputBox, ToggleBox } from "./ui";
import { EyeIcon } from "./icons";
import { useDebounce } from "../hooks";

interface FormVal {
  email: string;
  description: string;
  password: string;
  repeatPassword?: string;
  rememberMe: boolean;
}

export const Form: FC = () => {
  const [formVal, setFormVal] = useState<FormVal>({
    email: "",
    description: "",
    password: "",
    repeatPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<Exclude<FormVal, "rememberMe">>>(
    {}
  );

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!validateForm()) {
      return;
    }
    // you can submit data now
  };

  const validateForm = (): boolean => {
    for (const field in formVal) {
      let value = formVal[field as keyof typeof formVal];

      if (typeof value !== "boolean") {
        checkValidity(field, value!);
      }
    }

    for (const field in errors) {
      if (errors[field as keyof typeof errors]) {
        return false;
      }
    }

    return true;
  };

  const checkValidity = (fieldName: string, value: string) => {
    const errorsCopy: Record<string, string | boolean> = { ...errors };

    const validationMap: Record<string, () => boolean | string> = {
      email: () => !/(^\w.*@\w+\.\w)/.test(value) && "Введите почту правильно",
      repeatPassword: () => formVal.password !== value && "Пароли не совпадают",
      default: () => value.trim().length === 0 && `${fieldName} обязательна`,
    };

    const validate = validationMap[fieldName] || validationMap.default || "";
    errorsCopy[fieldName] = validate();

    setErrors(errorsCopy);
  };

  const deboundCheckValidity = useDebounce(checkValidity, 300);

  const handleChange = useCallback(
    (
      name: string,
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | boolean
    ) => {
      let value: string | boolean;
      if (typeof event === "boolean") {
        value = event;
      } else {
        value = event.target.value;
      }
      setFormVal((prev) => ({ ...prev, [name]: value }));

      if (typeof value !== "boolean") {
        deboundCheckValidity(name, value);
      }
    },
    [deboundCheckValidity]
  );

  const [passwordHidden, setPasswordHidden] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordHidden((prev) => !prev);
  };

  return (
    <Container className="centered">
      <form onSubmit={handleSubmit} noValidate>
        <InputBox
          placeholder="Эл. почта"
          type="email"
          error={errors.email}
          onChange={handleChange.bind(null, "email")}
          value={formVal.email}
        />
        <InputBox
          placeholder="Описание"
          error={errors.description}
          autoGrow
          onChange={handleChange.bind(null, "description")}
          value={formVal.description}
        />
        <InputBox
          type={passwordHidden ? "password" : "text"}
          placeholder="Пароль"
          error={errors.password}
          onChange={handleChange.bind(null, "password")}
          value={formVal.password}
          icon={
            <EyeIcon
              onClick={togglePasswordVisibility}
              className="EyeIcon"
              hidden={passwordHidden}
            />
          }
        />
        <InputBox
          type={passwordHidden ? "password" : "text"}
          placeholder="Подтвердите пароль"
          error={errors.repeatPassword}
          onChange={handleChange.bind(null, "repeatPassword")}
          value={formVal.repeatPassword}
        />
        <ToggleBox
          className="push"
          label="Запомнить сессию"
          onChange={(value) => handleChange("rememberMe", value)}
          active={formVal.rememberMe}
        />
        <Button type="submit">Подтвердить</Button>
      </form>
    </Container>
  );
};
