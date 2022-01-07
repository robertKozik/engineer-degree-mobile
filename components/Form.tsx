import { Formik, FormikHelpers, useFormikContext } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Animated } from "react-native";
import {
  Button,
  Switch,
  Input,
  Icon,
  Text,
  Slider,
} from "react-native-elements";
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
  disabled?: boolean;
  isPassword?: boolean;
};

type CheckBoxType = {
  label: string;
  icon: string;
  name: string;
};

type SliderType = {
  label: string;
  icon: string;
  name: string;
  min: number;
  max: number;
  step: number;
};

Form.CheckBox = function CheckBox({ label, icon, name }: CheckBoxType) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: "5%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Icon type="feather" name={icon} color={"#DDDDDD"} />
        <Text h4 style={{ marginRight: 50, marginLeft: 10 }}>{`${
          label || name
        } :`}</Text>
      </View>
      <Switch
        onChange={() => setFieldValue(name, !(values as any)[name])}
        value={(values as any)[name]}
      />
    </View>
  );
};

Form.Slider = function Sliders({
  label,
  icon,
  name,
  min,
  max,
  step,
}: SliderType) {
  const { setFieldValue, values } = useFormikContext();
  return (
    <View>
      <Text h4>{`${label || name} :`}</Text>
      <Slider
        value={(values as any)[name]}
        step={step}
        minimumValue={min}
        maximumValue={max}
        onValueChange={(val) => setFieldValue(name, val)}
        thumbStyle={{ height: 40, width: 40, backgroundColor: "transparent" }}
      />
      <Text>Value: {(values as any)[name]}</Text>
    </View>
  );
};

Form.TextInput = function TextInput({
  label,
  placeholder,
  icon,
  name,
  disabled,
  isPassword,
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
      disabled={disabled}
      secureTextEntry={isPassword}
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
