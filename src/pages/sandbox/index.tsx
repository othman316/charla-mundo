import { type FC } from "react";

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  return (
    <div className="flex justify-between">
      <div className="">name</div>
      <span className="">time</span>
    </div>
  );
};

export default index;
