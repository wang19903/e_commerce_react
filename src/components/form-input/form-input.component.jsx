import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {label && (
        <label
          className={`${
            otherProps.value.label ? "shrink" : ""
          } from-input-label`}
        >
          {label}
        </label>
      )}
      <input className="from-input" {...otherProps} />
    </div>
  );
};

export default FormInput;
