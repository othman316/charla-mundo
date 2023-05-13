import { type VariantProps, cva } from "class-variance-authority";
import { type FC, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  ["focus:ring-2", "text-center", "focus:outline-none", "focus:ring-1"],
  {
    variants: {
      buttonColor: {
        default: [
          "text-white",
          "bg-blue-700",
          "hover:bg-blue-800",
          "focus:ring-blue-300",
          "dark:bg-blue-600",
          "dark:hover:bg-blue-700",
          "dark:focus:ring-blue-800",
        ],
        alternative: [
          "text-gray-900",
          "bg-white",
          "border",
          "border-gray-200",
          "hover:bg-gray-100",
          "hover:text-blue-700",
          "focus:z-10",
          "focus:ring-gray-200",
          "dark:focus:ring-gray-700",
          "dark:bg-gray-800",
          "dark:text-gray-400",
          "dark:border-gray-600",
          "dark:hover:text-white",
          "dark:hover:bg-gray-700",
        ],
        dark: [
          "text-white",
          "bg-gray-800",
          "hover:bg-gray-900",
          "focus:ring-gray-300",
          "bg-gray-800",
          "dark:hover:bg-gray-700",
          "dark:focus:ring-gray-700",
          "dark:border-gray-700",
        ],
        light: [
          "text-gray-900",
          "bg-white",
          "border",
          "border-gray-300",
          "hover:bg-gray-100",
          "focus:ring-gray-200",
          "bg-gray-800",
          "dark:text-white",
          "dark:border-gray-600",
          "dark:hover:bg-gray-700",
          "dark:hover:border-gray-600",
          "dark:focus:ring-gray-700",
        ],
        green: [
          "text-white",
          "bg-green-700",
          "hover:bg-green-800",
          "focus:ring-green-300",
          "bg-green-600",
          "dark:hover:bg-green-700",
          "dark:focus:ring-green-800",
        ],
        red: [
          "text-white",
          "bg-red-700",
          "hover:bg-red-800",
          "focus:ring-red-300",
          "dark:bg-red-600",
          "dark:hover:bg-red-700",
          "dark:focus:ring-red-900",
        ],
        yellow: [
          "text-black",
          "bg-yellow-400",
          "hover:bg-yellow-500",
          "focus:ring-yellow-300",
        ],
        purple: [
          "text-white",
          "bg-purple-700",
          "hover:bg-purple-800",
          "focus:ring-purple-300",
          "dark:bg-purple-600",
          "dark:hover:bg-purple-700",
          "dark:focus:ring-purple-900",
        ],
      },
      buttonSize: {
        extraSmall: ["px-3", "py-2", "text-xs", "font-medium"],
        small: ["px-3", "py-2", "text-sm", "font-medium"],
        base: ["font-medium", "text-sm", "px-5", "py-2.5"],
        large: ["px-5", "py-3", "text-base", "font-medium"],
        extraLarge: ["font-medium", "text-base", "px-6", "py-3.5"],
      },
    },
    defaultVariants: { buttonColor: "default", buttonSize: "base" },
  }
);
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: string;
}

const Button: FC<ButtonProps> = ({
  buttonSize,
  buttonColor,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ buttonColor, buttonSize, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
