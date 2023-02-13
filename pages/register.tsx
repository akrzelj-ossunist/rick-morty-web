import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  repeatEmail: string;
  password: string;
  repeatPassword: string;
  gender?: string;
  address: string;
  zipCode: number;
  city: string;
  country: string;
  personalInfo?: boolean;
  oib: string;
  iban?: string;
}

const RegisterForm: React.FC = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    repeatEmail: "",
    password: "",
    repeatPassword: "",
    gender: "",
    address: "",
    zipCode: 0,
    city: "",
    country: "",
    personalInfo: false,
    oib: "",
    iban: "",
  };

  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(8, "Too short")
      .max(13, "Too long")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    repeatEmail: Yup.string().oneOf(
      [Yup.ref("email"), null],
      "Email must match"
    ),
    password: Yup.string()
      .min(8, "Password must contain minimum of 8 characters")
      .required("Required"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
    gender: Yup.string(),
    address: Yup.string().required("Required"),
    zipCode: Yup.number().required("Required"),
    city: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    personalInfo: Yup.boolean(),
    oib: Yup.string().when("personalInfo", {
      is: (personalInfo: string) => personalInfo,
      then: Yup.string().required("Required"),
    }),
    iban: Yup.string().when("personalInfo", {
      is: (personalInfo: string) => personalInfo,
      then: Yup.string()
        .min(21, "Must be exactly 21 characters")
        .max(21, "Must be exactly 21 characters")
        .required("Required"),
    }),
  });
  return (
    <>
      <div className="flex text-3xl m-5 justify-center">Registration page</div>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationSchema}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          window.location.replace("/");
        }}
      >
        {({ values, errors, touched }) => {
          return (
            <Form className="flex flex-col items-center">
              {/* <div>Values: {JSON.stringify(values)}</div>
              <div>Errors: {JSON.stringify(errors)}</div> */}
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="firstName">First name:</label>
                    <Field
                      name="firstName"
                      className="border-b-2 border-black"
                    />
                    {errors.firstName && touched.firstName && (
                      <label className="text-red-600 text-sm">
                        {errors.firstName}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="lastName">Last name:</label>
                    <Field
                      name="lastName"
                      className="border-b-2 border-black"
                    />
                    {errors.lastName && touched.lastName && (
                      <label className="text-red-600 text-sm">
                        {errors.lastName}
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="email">E-mail:</label>
                    <Field
                      name="email"
                      type="email"
                      className="border-b-2 border-black"
                    />
                    {errors.email && touched.email && (
                      <label className="text-red-600 text-sm">
                        {errors.email}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="email">Repeat e-mail:</label>
                    <Field
                      type="email"
                      name="repeatEmail"
                      className="border-b-2 border-black"
                    />
                    {errors.repeatEmail && touched.repeatEmail && (
                      <label className="text-red-600 text-sm">
                        {errors.repeatEmail}
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      className="border-b-2 border-black"
                    />
                    {errors.password && touched.password && (
                      <label className="text-red-600 text-sm">
                        {errors.password}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="password">Repeat password:</label>
                    <Field
                      type="password"
                      name="repeatPassword"
                      className="border-b-2 border-black"
                    />
                    {errors.repeatPassword && touched.repeatPassword && (
                      <label className="text-red-600 text-sm">
                        {errors.repeatPassword}
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="phoneNumber">Phone number:</label>
                    <Field
                      name="phoneNumber"
                      className="border-b-2 border-black"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <label className="text-red-600 text-sm">
                        {errors.phoneNumber}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="gender">Gender:</label>
                    <Field as="select" name="gender">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="address">Address:</label>
                    <Field name="address" className="border-b-2 border-black" />
                    {errors.address && touched.address && (
                      <label className="text-red-600 text-sm">
                        {errors.address}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="zipCode">Zip code:</label>
                    <Field name="zipCode" className="border-b-2 border-black" />
                    {errors.zipCode && touched.zipCode && (
                      <label className="text-red-600 text-sm">
                        {errors.zipCode}
                      </label>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col m-4">
                    <label htmlFor="city">City:</label>
                    <Field name="city" className="border-b-2 border-black" />
                    {errors.city && touched.city && (
                      <label className="text-red-600 text-sm">
                        {errors.city}
                      </label>
                    )}
                  </div>
                  <div className="flex flex-col m-4">
                    <label htmlFor="country">Country:</label>
                    <Field as="select" name="country">
                      <option value="croatia">Croatia</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                      <option value="italy">Italy</option>
                      <option value="england">England</option>
                      <option value="usa">USA</option>
                    </Field>
                  </div>
                </div>
                <div className="flex justify-center m-4">
                  <label className="mr-10" htmlFor="personalInfo">
                    Personal info:
                  </label>
                  <Field name="personalInfo" type="checkbox" />
                </div>
                {values.personalInfo && (
                  <div className="flex">
                    <div className="flex flex-col m-4">
                      <label htmlFor="oib">OIB:</label>
                      <Field name="oib" className="border-b-2 border-black" />
                      {errors.oib && touched.oib && (
                        <label className="text-red-600 text-sm">
                          {errors.oib}
                        </label>
                      )}
                    </div>
                    <div className="flex flex-col m-4">
                      <label htmlFor="iban">IBAN:</label>
                      <Field name="iban" className="border-b-2 border-black" />
                      {errors.iban && touched.iban && (
                        <label className="text-red-600 text-sm">
                          {errors.iban}
                        </label>
                      )}
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="border-2 px-2 border-black rounded-xl shadow-lg"
                >
                  Submit
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;
