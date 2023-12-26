import { FC } from "react";

interface Props {
  message: string;
}

const Error: FC<Props> = ({ message = "Something went very wrong" }) => {
  return (
    <div className="oaerror danger">
      <strong>Error</strong>- {message}
    </div>
  );
};

export default Error;
