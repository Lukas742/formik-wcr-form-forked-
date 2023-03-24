import React from "react";
import { Formik, Field, Form as FormikForm } from "formik";
import {
  Form,
  FormItem,
  FormGroup,
  ThemeProvider,
  Label,
  Input,
  Select,
  Button,
  MultiComboBox,
  DatePicker,
  CheckBox,
  InputType,
  Title,
  Option,
  MultiComboBoxItem,
  WrappingType,
} from "@ui5/webcomponents-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
// import "./styles.css";
//For the submits property of the button to have effect, you must add the following import
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "The terms of service must be accepted"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <ThemeProvider>
      <div style={{ height: "200px" }} />
      {/* 
      
      
       */}
      <Form>
        <FormItem
          label={
            <Label required showColon>
              Email
            </Label>
          }
        >
          <Input type={InputType.Email} />
        </FormItem>
        <FormItem
          label={
            <Label required showColon>
              Password
            </Label>
          }
        >
          <Input type={InputType.Password} />
        </FormItem>
        <FormItem label="Country">
          <Select />
        </FormItem>
        <FormItem label={<Label showColon>Date of Birth</Label>}>
          <DatePicker />
        </FormItem>
        <FormItem label="Payment methods">
          <MultiComboBox>
            <MultiComboBoxItem text="Credit card" />
            <MultiComboBoxItem text="PayPal" />
            <MultiComboBoxItem text="Bank transfer" />
          </MultiComboBox>
        </FormItem>
        <FormItem
          label={
            <Label required showColon>
              I accept the terms of service
            </Label>
          }
        >
          <CheckBox />
        </FormItem>
      </Form>
      <Button type="submit" onClick={formik.handleSubmit}>
        Submit
      </Button>
      {/* 
      
      
       */}
      <div style={{ height: "200px" }} />]<Title>Create Account</Title>
      <Formik
        initialValues={{
          email: "",
          password: "",
          country: "Germany",
          birthday: "",
          payment: [],
          terms: false,
        }}
        validationSchema={LoginSchema}
        onSubmit={(...rest) => {
          console.log(rest);
          // alert(JSON.stringify(values, null, 2));
          // console.log(values);
          // setSubmitting(false);
        }}
      >
        {(formik) => (
          <FormikForm>
            <Label required>Email:</Label>
            <Field
              as={Input}
              name="email"
              type={InputType.Email}
              onInput={formik.handleChange}
              onChange={formik.onBlur}
              valueState={formik.errors.email ? "Error" : "None"}
              valueStateMessage={<div>{formik.errors.email}</div>}
            />
            <Label required>Password:</Label>
            <Field
              as={Input}
              name="password"
              type={InputType.Password}
              onInput={formik.handleChange}
              onChange={formik.onBlur}
              valueState={formik.errors.password ? "Error" : "None"}
              valueStateMessage={<div>{formik.errors.password}</div>}
            />
            <Label>Country:</Label>
            <Field
              as={Select}
              name="country"
              onChange={(e) =>
                formik.setFieldValue(
                  "country",
                  e.detail.selectedOption.innerText
                )
              }
            >
              <Option>Germany</Option>
              <Option>France</Option>
              <Option>Italy</Option>
            </Field>
            <Label>Data of Birth:</Label>
            <Field
              as={DatePicker}
              name="birthday"
              onChange={(e) => {
                console.log(formik.errors.email);
                formik.setFieldValue("birthday", e.detail.value);
              }}
            ></Field>
            <Label>Payment methods</Label>
            <Field
              as={MultiComboBox}
              name="payment"
              onSelectionChange={(e) => {
                const selected = [];
                Object.entries(e.detail.items).forEach(([key, val]) => {
                  selected.push(val.text);
                });
                formik.setFieldValue("payment", selected);
              }}
            >
              <MultiComboBoxItem text="Credit card" />
              <MultiComboBoxItem text="PayPal" />
              <MultiComboBoxItem text="Bank transfer" />
            </Field>
            <Field
              as={CheckBox}
              name="terms"
              checked={formik.getFieldProps("terms").value}
              text="I accept the terms of service"
              onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
              valueState={formik.errors.terms ? "Error" : "None"}
            ></Field>

            <Button type="submit" onClick={formik.handleSubmit}>
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </ThemeProvider>
  );
}
