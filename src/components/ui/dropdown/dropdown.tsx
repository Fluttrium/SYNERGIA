import { useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

interface ExpandableTextProps {
  text: string;
  title: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, title }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col rounded-md border-2 max-w-md py-5 px-5 relative ">
      <button
        onClick={toggleExpand}
        className="  focus:outline-none  basis-1/2   inset-x-0 top-0 rounded-md "
      >
        {expanded ? (
          <div className=" flex flex-row basis-5/6 ">
            <p className="text-lg font-semibold">{title}</p>
            <IconContext.Provider
              value={{ className: "shared-class px-1 rotate-180", size: "25" }}
            >
              <IoIosArrowDown />
            </IconContext.Provider>
          </div>
        ) : (
          <div className="flex flex-row">
            <p className="text-lg font-semibold">{title}</p>
            <IconContext.Provider
              value={{ className: "shared-class px-1", size: "25" }}
            >
              <IoIosArrowDown />
            </IconContext.Provider>
          </div>
        )}
      </button>
      {expanded && (
        <div className="mt-2 inset-x-0 top-0">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </div>
  );
};

export default ExpandableText;
