import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<any>; // тип register из react-hook-form
  error?: string; // опциональное свойство для отображения ошибок
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={name} className="block text-sm font-medium leading-6">
        {placeholder}
      </label>
      <div className="flex border-black border-b-2 focus-within:border-sky-500">
        <input
          {...register(name, { required: `${placeholder} is required` })}
          type="text"
          id={name}
          autoComplete={name}
          className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none ${error ? "border-red-500" : ""}`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
