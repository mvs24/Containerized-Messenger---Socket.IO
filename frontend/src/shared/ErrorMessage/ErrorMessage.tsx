import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import classes from "./ErrorMessage.module.css";

interface Props {
  errorMessage: string;
  setError: (error: undefined) => void;
}

const ErrorMessage = (props: Props) => {
  const { setError } = props;

  useEffect(() => {
    setTimeout(() => {
      if (props.errorMessage) {
        setError(undefined);
      }
    }, 4000);
  }, [setError]);

  return (
    <div className={classes.errorContainer}>
      <h3>{props.errorMessage}</h3>
      <AiFillCloseCircle
        onClick={() => setError(undefined)}
        className={classes.errorIcon}
      />
    </div>
  );
};

export default ErrorMessage;
