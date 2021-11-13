import { Formik, FormikHelpers, useFormikContext } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import getValidationSchema from "../constants/validationSchemas";

type FormProps = {
  onSubmit: (
    values: Object,
    formikHelpers: FormikHelpers<Object>
  ) => void | Promise<any>;
  initialValues: Object;
  children: React.ReactChild | Array<React.ReactChild>;
  formName: string;
};

type FormHandlersContextType = {
  handleChange?: any;
  handleBlur?: any;
  handleSubmit?: any;
  values?: any;
};

const FormHandlersContext = React.createContext<FormHandlersContextType>({});

const Form = (props: FormProps) => (
  <Formik
    onSubmit={props.onSubmit}
    initialValues={props.initialValues}
    validationSchema={getValidationSchema(props.formName)}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <FormHandlersContext.Provider
        value={{ handleChange, handleBlur, handleSubmit, values }}
      >
        <View>{props.children}</View>
      </FormHandlersContext.Provider>
    )}
  </Formik>
);

type TextInputType = {
  label: string;
  placeholder: string;
  icon: string;
  name: string;
};

Form.TextInput = function TextInput({
  label,
  placeholder,
  icon,
  name,
}: TextInputType) {
  const { errors, handleChange, handleBlur, values } = useFormikContext();
  return (
    <Input
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      value={(values as any)[name]}
      label={label || name}
      leftIcon={{ name: icon }}
      placeholder={placeholder}
      errorMessage={(errors as any)[name]}
    />
  );
};

Form.Submit = function SubmitButton({ loading }: { loading: boolean }) {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      loading={loading}
      onPress={() => handleSubmit()}
      title={t("register:submit")}
    />
  );
};

export default Form;
