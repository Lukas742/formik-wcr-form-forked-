import { useState } from "react";
import {
  Button,
  CheckBox,
  DatePicker,
  Form,
  FormItem,
  FormGroup,
  Input,
  InputType,
  Label,
  MultiComboBox,
  MultiComboBoxItem,
  Option,
  Select,
  ThemeProvider,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
//For the submits property of the button to have effect, you must add the following import
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

const zodSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address format" }),
  password: z.string().min(5, "Password must be 5 characters at minimum"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "The terms of service must be accepted" }),
  }),
});

export default function LoginForm() {
  const resolver = zodResolver(zodSchema);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      email: "",
      password: "",
      country: "Germany",
      dob: "",
      payment: [],
      terms: false,
    },
  });
  const [invalidEntries, setInvalidEntries] = useState({});
  // example for registering only part of the register properties
  const { ref: cbRef, name: cbName } = register("terms");
  // if you need to fully control the state, you can use `getValues` (see `CheckBox`)
  const values = getValues();

  const onSubmit = (data) => {
    if (Object.keys(invalidEntries).length) {
      Object.entries(invalidEntries).filter(([name, invalid]) => {
        // use this to catch internal (not validated by zod) validation of components
        if (invalid) {
          setError(name, { type: "internal" }, { shouldFocus: true });
        }
      });
    } else {
      alert(`Submitted fields:\n${JSON.stringify(data, null, 2)}`);
    }
  };

  return (
    <ThemeProvider>
      <div style={{ maxWidth: "800px" }}>
        <Form
          labelSpanS={4}
          labelSpanM={4}
          labelSpanL={4}
          labelSpanXL={4}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormGroup>
            <FormItem
              label={
                <Label required showColon>
                  Email
                </Label>
              }
            >
              <Input
                type={InputType.Email}
                {...register("email", { required: true })}
                onInput={(e) => {
                  setValue("email", e.target.value);
                }}
                valueState={errors.email ? "Error" : "None"}
                valueStateMessage={<div>{errors.email?.message}</div>}
              />
            </FormItem>
            <FormItem
              label={
                <Label required showColon>
                  Password
                </Label>
              }
            >
              <Input
                type={InputType.Password}
                {...register("password", { required: true })}
                onInput={(e) => {
                  setValue("password", e.target.value);
                }}
                valueState={errors.password ? "Error" : "None"}
                valueStateMessage={<div>{errors.password?.message}</div>}
              />
            </FormItem>
            <FormItem label="Country">
              <Select
                {...register("country")}
                onChange={(e) => {
                  setValue("country", e.detail.selectedOption.textContent);
                }}
              >
                <Option>Germany</Option>
                <Option>France</Option>
                <Option>Italy</Option>
              </Select>
            </FormItem>
            <FormItem label={<Label showColon>Date of Birth</Label>}>
              <DatePicker
                {...register("dob")}
                onChange={(e) => {
                  if (e.detail.valid) {
                    setValue("dob", e.detail.value);
                    // internal validation
                    setInvalidEntries((prev) => ({ ...prev, dob: false }));
                  } else {
                    // internal validation
                    setInvalidEntries((prev) => ({ ...prev, dob: true }));
                  }
                }}
              />
            </FormItem>
            <FormItem label="Payment methods">
              <MultiComboBox
                {...register("payment", {
                  onChange: undefined,
                  onBlur:
                    undefined /*  disable `onChange` and `onBlur` to prevent unwanted submission of strings*/,
                })}
                onSelectionChange={(e) => {
                  setValue(
                    "payment",
                    e.detail.items.map((item) => item.getAttribute("text"))
                  );
                }}
              >
                <MultiComboBoxItem text="Credit card" />
                <MultiComboBoxItem text="PayPal" />
                <MultiComboBoxItem text="Bank transfer" />
              </MultiComboBox>
            </FormItem>
          </FormGroup>
          <FormItem
            label={
              <Label required showColon>
                I accept the terms of service
              </Label>
            }
          >
            <CheckBox
              ref={cbRef}
              name={cbName}
              onChange={(e) => {
                setValue("terms", e.target.checked);
              }}
              checked={values.terms}
              valueState={errors.terms ? "Error" : "None"}
            />
          </FormItem>
        </Form>
        <Button
          onClick={handleSubmit(onSubmit)}
          style={{ marginBlockStart: "1rem" }}
        >
          Submit
        </Button>
      </div>
    </ThemeProvider>
  );
}
