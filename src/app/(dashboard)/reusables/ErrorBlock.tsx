import { VscError } from "react-icons/vsc";
type ErrorInterface = {
  blockControl: boolean;
  message?: string;
};

export const ErrorBlock = (props: ErrorInterface) => {
  return (
    <div
      className={
        props.blockControl == true
          ? "max-sm:w-full md:w-[80%] lg:w-[30%] flex border border-[red] shadow-xl  fixed top-1 right-[2%] transition-all duration-300 z-10"
          : "max-sm:w-full md:w-[80%] lg:w-[40%] flex shadow-xl  fixed top-1 right-[-100%] transition-all duration-300 z-50"
      }
    >
      <div className={"w-[80%] p-2 text-center text-[red] bg-[white]"}>
        {props.message}
      </div>
      <div className={"w-[25%] p-2 text-[white] bg-[red] flex justify-center"}>
        <div className="p-1">
          <p>{"Failed"}</p>
        </div>
        <div className="flex items-center">{<VscError />}</div>
      </div>
    </div>
  );
};
