import { useEffect, useState } from "react";
import "./App.css";
import Image, { ImageProps } from "./Components/Image";
import Modal from "./Components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
type BackendData = ImageProps[];

function App() {
  const [data, setData] = useState<BackendData>([]);
  useEffect(() => {
    fetch("/api/index")
      .then((result) => result.json())
      .then((data) => setData(data));
  }, []);
  const sortedData = data.sort((a, b) => a.time - b.time);
  const groupedData = sortedData.reduce<{ [year: string]: ImageProps[] }>(
    (obj, curr) => {
      const key = new Date(1000 * curr.time).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      });
      key in obj ? obj[key].push(curr) : (obj[key] = [curr]);
      return obj;
    },
    {}
  );
  const [activeImageId, setActiveImage] = useState("");
  const activeImage = data.find((x) => x.id === activeImageId);
  const [jumpBar, setJumpBar] = useState(false);
  return (
    <>
      {activeImage && (
        <Modal {...activeImage} clickCallback={() => setActiveImage("")} />
      )}
      <div className="flex bg-zinc-800 max-h-screen">
        <div
          className={
            "flex justify-start flex-col overflow-y-auto bg-zinc-900 " +
            (jumpBar ? "px-2 min-w-fit" : "w-0")
          }
        >
          {Object.keys(groupedData).map((year, i) => (
            <div
              className={
                "rounded cursor-pointer text-zinc-200 text-center px-2 py-1 " +
                (i % 2 ? "bg-zinc-900" : "bg-zinc-800")
              }
              onClick={() =>
                document
                  .getElementById(year)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {year}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            onClick={() => setJumpBar(!jumpBar)}
            className="text-lg text-zinc-200 bg-zinc-900 rounded-r-lg px-1 py-3"
            icon={jumpBar ? faLessThan : faGreaterThan}
          />
        </div>
        <div className="overflow-y-auto grow p-5">
          {Object.entries(groupedData).map(([year, array]) => (
            <>
              <div
                id={year}
                className="no-mt-first text-zinc-200 text-xl mb-5 mt-10"
              >
                {year}
              </div>
              <div className="grid gap-5 picture-tiling">
                {array.map((x) => (
                  <Image {...x} clickCallback={() => setActiveImage(x.id)} />
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
