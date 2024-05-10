import { FC, useCallback, useState } from "react";
import { Button, Container, InputBox, ToggleBox } from "./ui";
import { EyeIcon } from "./icons";

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
    },
    []
  );

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    for (const field in formVal) {
      const value = formVal[field as keyof typeof formVal];

      if (typeof value === "boolean") continue;

      if (!value || value.trim().length === 0) {
        errors[field] = `${field} обязательна`;
        setErrors(errors);
        return false;
      }

      if (field === "email") {
        const emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;

        if (!emailRegex.test(formVal.email)) {
          errors.email = "Введите почту правильно";
          setErrors(errors);
          return false;
        }
      }

      errors[field] = "";
    }

    if (formVal.password !== formVal.repeatPassword) {
      errors.repeatPassword = "Пароли не совпадают";
      setErrors(errors);
      return false;
    }

    setErrors(errors);
    return true;
  };

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
