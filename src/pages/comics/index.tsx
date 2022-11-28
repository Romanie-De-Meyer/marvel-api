import "./index.css";
import MD5 from "crypto-js/md5";
import { ComicResult, ComicsProps } from "../../interface/comicsProps";
import { useEffect, useState } from "react";
import Carossel from "../../components/carossel";
import Popup from "../../components/popup";

const getComics = async () => {
  const ts = Date.now().toString();
  const hash = MD5(
    ts + process.env.REACT_APP_PRIVATE_API_KEY + process.env.REACT_APP_API_KEY
  ).toString();

  return await (
    await fetch(
      `${process.env
        .REACT_APP_BASE_URL!}/v1/public/comics?limit=100&ts=${ts}&apikey=${process
        .env.REACT_APP_API_KEY!}&hash=${hash}`
    )
  ).json();
};

const Comics = () => {
  const [info, setInfo] = useState<ComicsProps | null>(null);
  const [comicsFormats, setComicsFormats] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<ComicResult | null>(null);
  

  useEffect(() => {
    (async () => {
      setInfo(await getComics());
    })();
  }, []);

  useEffect(() => {
    let tabFormat = info?.data.results.map((value) => {
      return value.format;
    });
    tabFormat?.sort();
    //@ts-ignore
    setComicsFormats([...new Set(tabFormat)]);
  }, [info]);

  return (
    <>
      <h1 className="title-page">comics</h1>
      <div id="rectangle-list">
        {[...Array(8)].map((v, i) => {
          return <div id="rectangle" key={i}></div>;
        })}
      </div>
      <div id="carossel-container">
        {comicsFormats.map((v, i) => {
            info?.data.results.filter((value) => {
              return !value.format.localeCompare(v);
            })
          return (
            <div key={v + i}>
              <p className="title-formats">{v === "" ? "#" : v} </p>
              <Carossel
                info={{
                  data: {
                    //@ts-ignore
                    results: info?.data.results.filter((value) => {
                      return !value.format.localeCompare(v);
                    }),
                  },
                }}
                onClick={(v) => {
                  setOpen(true);
                  setPopupData(v);
                }}
              />
            </div>
          );
        })}
        {open ? (
          <Popup closePopup={() => setOpen(false)}>
            <div>
              <h1 className="title-popup">{popupData?.title}</h1>
              <p className="description-popup">{popupData?.description}</p>
              <p className="title-section-grid">Characters featuring this comic</p>
              <div className="container-grid" id="comic-list-container">
                {popupData?.characters.items.length ? popupData?.characters.items.map((v, i) => {
                  console.log("name: ", v.name)
                  return (
                    <div className="body-grid" key={v.name + i}>
                      <p>{v.name}</p>
                    </div>
                  );
                }) : <p>No information</p>}
              </div>
            </div>
          </Popup>
        ) : null}
      </div>
    </>
  );
};

export default Comics;
