import Button from "@/app/(dashboard)/reusables/Button";

interface Props{
    style?:string;
    text?:string;
    onDelete:()=>void;
    onCancel:()=>void;
    loading?:boolean;
    disabled?:boolean;
    popup?:boolean;
}

export const DeleteDialogue = (props:Props) => {
  return (
    <>
      {props.popup ?
       ( <div
          className={`w-full h-screen fixed top-[-20%] left-[10] z-[15] flex justify-center items-center ${props.style}`}
        >
          <div className="w-[30%] rounded-md p-10 border bg-white">
            <div className="w-full text-center font-bold">
              <p>
                {" "}
                {`Are you sure you want to delete `}
                <span className="text-cyan-600">
                  {props.text ? props.text : ""}
                </span>
              </p>
            </div>
            <div className="w-full flex justify-end gap-2 mt-4">
              <Button
                buttonLabel="Delete"
                className="border w-fit p-2 
                  text-white bg-cyan-400"
                disabled={props.disabled}
                loading={props.loading}
                onClick={props.onDelete}
              />

              <Button
                buttonLabel="Cancel"
                className="border w-fit p-2 
                 text-white bg-red-400"
                onClick={props.onCancel}
              />
            </div>
          </div>
        </div>)
        :(
            <div>

            </div>
        )
      }
    </>
  );
}
