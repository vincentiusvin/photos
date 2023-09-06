export type ModalProps = {
  path: string;
  time: number;
  id: string;
  clickCallback: () => void;
};

const Modal = (props: ModalProps) => {
  const { path, time, id, clickCallback } = props;
  const date = new Date(time * 1000);
  return (
    <div className="top-0 left-0 fixed flex w-full h-screen justify-center items-center z-40 backdrop-blur">
      <div
        className={
          "h-5/6 w-5/6 overflow-y-scroll px-5 py-2 z-50 rounded bg-zinc-600"
        }
      >
        <div className="grid grid-cols-3 mb-5">
          <div></div>
          <div className="text-center">
            <div className="text-zinc-200 break-words">{path}</div>
            <div className="text-zinc-400 text-sm">
              {date.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="bg-red-400 p-2 rounded cursor-pointer w-min ml-auto"
              onClick={() => clickCallback()}
            >
              Close
            </div>
          </div>
        </div>
        <img className="mx-auto" src={"/api/get-photo?path=" + id} alt={path}></img>
      </div>
    </div>
  );
};

export default Modal;
