import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
// import {
//   signInWithGooglePopup,
//   signInAuthUserWithEmailAndPassword
// } from "../../utils/firebase/firebase.utils";
import { SignInContainer, H2, ButtonsContainer } from "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  googleSignInStart,
  emailSignInStart
} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const dispatch = useDispatch();
  const { email, password } = formField;

  const SignInWithGoogle = () => {
    dispatch(googleSignInStart());
    // await signInWithGooglePopup();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // try {
    dispatch(emailSignInStart(email, password));
    resetFormField();
    // } catch (error) {
    //   console.log("user sign in failed", error);
    // }
  };

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <SignInContainer>
      <H2>I already have an account</H2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
