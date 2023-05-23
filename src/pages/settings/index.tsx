import { type FC } from "react";
import Button from "~/components/Button";

const Settings: FC = ({}) => {
  return (
    <div className="w-[100%] bg-slate-50">
      <div className="flex w-[100%] justify-around text-clip bg-[#b4528d]">
        <Button>change name 3</Button>
        <Button buttonColor="yellow">change name </Button>
      </div>
    </div>
  );
};

export default Settings;
