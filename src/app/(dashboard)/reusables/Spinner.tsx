type SpinnerProps = {
  size?: "small" | "medium" | "large";
};

export const ButtonSpinner = (props: SpinnerProps) => {
  const spinnerSizeClass =
    props.size === "small"
      ? "w-5 h-5"
      : props.size === "medium"
        ? "w-8 h-8"
        : "w-12 h-12";

  return (
    <div
      className={`animate-spin ${spinnerSizeClass} border-t-4 border-blue-500 border-solid rounded-full p-1`}
    ></div>
  );
};