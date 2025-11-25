import React from "react";

interface DropdownProps {
  dropdownItems: Array<{
    id: any;
    image: string;
    label: string;
    dataCy: string;
  }>;
  emitAction: (id: number | string, label: string) => void;
  onMouseLeave?: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownItems,
  emitAction,
  onMouseLeave,
}) => {
  return (
    <div
      className="
        bg-white shadow-lg rounded-lg py-2 w-40 border border-gray-200 
        animate-fadeIn z-50
      "
      onMouseLeave={onMouseLeave}
    >
      <p className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">
        ACTIONS
      </p>

      {dropdownItems.map((item, index) => (
        <button
          key={index}
          data-cy={item.dataCy}
          onClick={() => emitAction(item.id, item.label)}
          className="
            flex items-center gap-3 w-full px-4 py-2 text-left text-gray-700 
            hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200
            cursor-pointer
          "
        >
          <img src={item.image} alt={item.label} className="w-4 h-4" />
          <span className="text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
