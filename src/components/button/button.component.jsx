import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted"
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
  }[buttonType]);

const Button = ({ children, buttonType, isloading, ...otherProps }) => {
  // if otherProps == true disabled會被複寫
  const CustomButton = getButton(buttonType);
  return (
    <div>
      <CustomButton disabled={isloading} {...otherProps}>
        {isloading ? <ButtonSpinner /> : children}
      </CustomButton>
    </div>
  );
};

export default Button;
