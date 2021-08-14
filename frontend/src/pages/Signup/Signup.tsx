import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import Button from "../../shared/Button/Button";
import ErrorMessage from "../../shared/ErrorMessage/ErrorMessage";
import Input from "../../shared/Input/Input";
import { User } from "../../types";
import classes from "./Signup.module.css";

interface InputState {
  id: "name" | "email" | "lastname" | "password";
  valid: boolean;
  value: string;
  touched: boolean;
  required: boolean;
  isEmail?: boolean;
  minLength?: number;
  type?: "text" | "password";
}

const Signup = (props: { setUser: (user: User) => void }) => {
  const [formState, setFormState] = useState<InputState[]>([
    { id: "name", valid: false, touched: false, value: "", required: true },
    {
      id: "lastname",
      valid: false,
      touched: false,
      value: "",
      required: true,
    },
    {
      id: "email",
      isEmail: true,
      valid: false,
      touched: false,
      value: "",
      required: true,
    },
    {
      id: "password",
      valid: false,
      touched: false,
      value: "",
      required: true,
      minLength: 6,
      type: "password",
    },
  ]);
  const [formValid, setFormValid] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  const { signup, user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    props.setUser(user);
  }, [user]);

  useEffect(() => {
    const updateFormValidation = function () {
      let formValid = true;
      formState.forEach((el) => {
        formValid = formValid && el.valid;
      });

      setFormValid(formValid);
    };

    updateFormValidation();
  }, [formState]);

  const isEmailValid = function (inputValue: string): boolean {
    return /\S+@\S+\.\S+/.test(inputValue);
  };

  const inputChangeHandler = function (
    e: React.ChangeEvent<HTMLInputElement>,
    inputElement: InputState
  ) {
    const inputValue = e.target.value;
    const updatedFormState = [...formState];
    const currentInput = updatedFormState.find(
      (el) => el.id === inputElement.id
    )!;

    let isInputValid = true;
    if (currentInput.isEmail) {
      isInputValid = isInputValid && isEmailValid(inputValue);
    }
    if (currentInput.required) {
      isInputValid = isInputValid && inputValue.length > 0;
    }
    if (currentInput.minLength) {
      isInputValid =
        isInputValid && inputValue.length >= currentInput.minLength;
    }

    currentInput.valid = isInputValid;
    currentInput.value = inputValue;
    currentInput.touched = true;

    setFormState(updatedFormState);
  };

  const formSubmitHandler = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      await signup({
        name: formState[0].value,
        lastname: formState[1].value,
        email: formState[2].value,
        password: formState[3].value,
      });
      setLoading(false);

      history.push("/home/1");
    } catch (errorMessage) {
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes.form}>
      {formState.map((el) => (
        <Input
          key={el.id}
          type={el.type ? el.type : "text"}
          placeholder={el.id.toUpperCase()}
          value={el.value}
          valid={el.valid}
          touched={el.touched}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputChangeHandler(e, el)
          }
        />
      ))}
      {error && <ErrorMessage errorMessage={error} setError={setError} />}
      <Button title="Sign up" disabled={!formValid} loading={loading} />
    </form>
  );
};

export default Signup;
