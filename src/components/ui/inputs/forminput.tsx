// components/Input.tsx

import React from "react";

interface InputProps {
  name: string;

  placeholder: string;
}

const Input: React.FC<InputProps> = ({ name, placeholder }) => {
  return (
    <div className="mt-2">
      <label htmlFor="username" className="block text-sm font-medium leading-6">
        {name}
      </label>
      <div className="flex border-black border-b-2 focus-within:border-sky-500">
        <input
          type="text"
          name={name}
          id={name}
          autoComplete={name}
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
