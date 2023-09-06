export type ImageProps = {
  path: string;
  time: number;
  id: string;
  clickCallback: () => void;
};

const Image = (props: ImageProps) => {
  const { path, time, id, clickCallback } = props;
  const date = new Date(time * 1000);
  return (
    <div
      onClick={() => clickCallback()}
      className="text-center bg-zinc-600 p-5 rounded text-zinc-200 zoom"
    >
      <img className="mx-auto" src={"/api/get-thumbnail?path=" + id} alt={path}></img>
      <div className="break-words">{path}</div>
      <div className="text-zinc-400">
        {date.toLocaleDateString("en-GB")}
      </div>
    </div>
  );
};

export default Image;
