import classes from "./Button.module.css";
import Loading from "../Loading/Loading";

interface Props {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button = (props: Props) => {
  const { title, onClick, disabled, loading } = props;

  return (
    <button
      className={`${classes.button} ${disabled ? classes.disabled : ""}`}
      disabled={disabled || false}
      onClick={onClick}
    >
      {loading && <Loading />}
      {title}
    </button>
  );
};

export default Button;
