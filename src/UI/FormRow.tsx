interface Props {
  label: string;
  children: HTMLInputElement;
}

const FormRow = (props: Props) => {
  const { children, label } = props;
  return (
    <>
      <label
        htmlFor={props.children.name}
        className="text-inherit font-medium text-base"
      >
        {label}
      </label>
      {children}
    </>
  );
};

export default FormRow;
