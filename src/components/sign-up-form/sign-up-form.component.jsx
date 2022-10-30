import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
// import {
//   createAuthUserWithEmailAndPassword,
//   createUserDocumentFromAuth
// } from "../../utils/firebase/firebase.utils";
import { SignUpContainer } from "./sign-up-form.styles";
import { signUpStart, onSignUpSuccess } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handleSummit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) alert("password do not match");
    // try {
    // const { user } = await createAuthUserWithEmailAndPassword(
    //   email,
    //   password
    // );

    // await createUserDocumentFromAuth(user, { displayName });
    dispatch(signUpStart(email, password, displayName));
    resetFormField();
    // } catch (error) {
    //   if (error.code === "auth/email-already-in-use") {
    //     alert("email-already-in-use");
    //   } else {
    //     console.log(error);
    //   }
    // }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up your email and password</span>
      <form onSubmit={handleSummit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
