import * as Yup from "yup";

interface validationSchemasInterface {
  login: any;
}

const validationSchemas: validationSchemasInterface = {
  login: Yup.object({
    email: Yup.string().email("Must be a valid email").required("required"),
    password: Yup.string().required("Password is required"),
  }),
};

const getValidationSchema = (key: string) => {
  return validationSchemas[key as keyof validationSchemasInterface];
};

export default getValidationSchema;
