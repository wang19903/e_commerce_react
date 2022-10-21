import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { email, password } = formField;
  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSumit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormField();
    } catch (error) {
      alert("incorrect Email or Password");
      // console.log(error);
    }
  };

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSumit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
