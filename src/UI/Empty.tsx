import { FC } from "react";
import { BsEmojiSmile } from "react-icons/bs";

interface Props {
  message?: string;
}

const Empty: FC<Props> = ({ message = "Start by searching" }) => {
  return (
    <div>
      <p className="flex items-center justify-center gap-3 py-6 px-4 align-middle text-primary text-lg">
        <span>
          <BsEmojiSmile className="w-6 h-6" />
        </span>
        {message}
      </p>
    </div>
  );
};

export default Empty;
