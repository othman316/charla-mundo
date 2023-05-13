import { type FC } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingPageProps {
  size?: number;
}

const LoadingPage: FC<LoadingPageProps> = ({ size }) => {
  return (
    <div className="bg-gradient-to-b from-blueGray to-plum">
      <LoadingSpinner size={size} />
    </div>
  );
};

export default LoadingPage;
