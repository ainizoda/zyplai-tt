import { FC, useCallback, useEffect, useState } from "react";
import { Button, Container, InputBox, ToggleBox } from "./ui";
import { EyeIcon } from "./icons";
import { useDebounce } from "../hooks";
import * as yup from "yup";
import { useFormik } from "formik";

interface FormVal {
  email: string;
  description: string;
  password: string;
  repeatPassword?: string;
  rememberMe: boolean;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Введите почту правильно")
    .required("Обязательное поле"),
  description: yup.string().required("Обязательное поле"),
  password: yup.string().required("Обязательное поле"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Обязательное поле"),
});

export const Form: FC = () => {
  const formik = useFormik<FormVal>({
    validationSchema: schema,
    validateOnBlur: true,
    initialValues: {
      email: "",
      description: "",
      password: "",
      repeatPassword: "",
      rememberMe: false,
    },
    onSubmit(values) {},
  });

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordHidden((prev) => !prev);
  };

  const getError = (field: keyof FormVal) => {
    return formik.touched[field] ? formik.errors[field] : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };
  return (
    <Container className="centered">
      <form onSubmit={formik.handleSubmit} noValidate>
        <InputBox
          placeholder="Эл. почта"
          type="email"
          error={getError("email")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
        />
        <InputBox
          placeholder="Описание"
          error={getError("description")}
          autoGrow
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          name="description"
        />
        <InputBox
          type={passwordHidden ? "password" : "text"}
          placeholder="Пароль"
          error={getError("password")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
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
          error={getError("repeatPassword")}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          name="repeatPassword"
        />
        <ToggleBox
          className="push"
          label="Запомнить сессию"
          onChange={(value) => formik.setFieldValue("rememberMe", value)}
          active={formik.values.rememberMe}
        />
        <Button type="submit">Подтвердить</Button>
      </form>
    </Container>
  );
};
