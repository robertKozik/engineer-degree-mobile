import * as Yup from "yup";

interface validationSchemasInterface {
  login: any;
  config: any;
}

const validationSchemas: validationSchemasInterface = {
  login: Yup.object({
    email: Yup.string().email("Must be a valid email").required("required"),
    password: Yup.string().required("Password is required"),
  }),
  config: Yup.object({
    sampling_rate: Yup.number(),
    temperature_sensor: Yup.bool(),
    soil_humidity_sensor: Yup.bool(),
    light_sensor: Yup.bool(),
  }),
};

const getValidationSchema = (key: string) => {
  return validationSchemas[key as keyof validationSchemasInterface];
};

export default getValidationSchema;
