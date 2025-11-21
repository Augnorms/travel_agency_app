import { FiEye } from "react-icons/fi";
import { GoEyeClosed } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { MouseEventHandler } from "react"; 

type InputsProps = {
  type: string;
  id?: string;
  style: string;
  maxlength?: number;
  labelStyle?: string;
  useIcons?: boolean;
  iconUser?: boolean;
  iconUserPass?: boolean;
  labelOne?: string;
  labelTwo?: string;
  placeholder: string;
  addpasswordVisibility?: boolean;
  showPaswword?: boolean;
  value: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowpass?: MouseEventHandler<SVGElement>;
  inputRef?: any;
};

export const Inputs = (props: InputsProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between">
        <label className={`${props.labelStyle} mb-2 font-bold`}>
          {props.labelOne}
        </label>

        <label className="mb-2 font-bold text-red-500">{props.labelTwo}</label>
      </div>

      <div className="flex relative">
        {props.useIcons ? (
          <div className="w-10 h-10 rounded-full shadow-md  mr-2 flex justify-center items-center">
            {props.iconUser ? (
              <FaUser />
            ) : props.iconUserPass ? (
              <FaUserLock />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div></div>
        )}
        <input
          type={props.type}
          id={props.id}
          className={props.style}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
          maxLength={props.maxlength}
          ref={props.inputRef}
        />
        {props.addpasswordVisibility ? (
          <div className="flex items-center p-2 cursor-pointer position absolute top-0 right-0">
            {props.showPaswword ? (
              <FiEye name="open" onClick={props.onShowpass} />
            ) : (
              <GoEyeClosed name="close" onClick={props.onShowpass} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
