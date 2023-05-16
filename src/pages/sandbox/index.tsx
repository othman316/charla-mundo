import { type FC } from "react";
import { SiBeatsbydre } from "react-icons/si";
import Button from "~/components/Button";
import { useBearStore } from "~/utils/zustand";

const SandBox: FC = ({}) => {
  const { increase, bears } = useBearStore();

  return (
    <div className="flex justify-between">
      <div className="">{bears}</div>
      <span className="">hello </span>
    </div>
  );
};

export default SandBox;
