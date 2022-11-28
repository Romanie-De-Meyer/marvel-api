import "./index.css";
import MD5 from "crypto-js/md5";
import { useCallback, useEffect, useRef, useState } from "react";
import { CharacterResult, CharactersProps } from "../../interface/charactersProps";
import Card from "../../components/card";
import Popup from "../../components/popup";

const Characters = () => {
  const [info, setInfo] = useState<CharactersProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<CharacterResult | null>(null);
  const observer = useRef<IntersectionObserver>();

  const getCharacters = async () => {
    const ts = Date.now().toString();
    const hash = MD5(
      ts + process.env.REACT_APP_PRIVATE_API_KEY + process.env.REACT_APP_API_KEY
    ).toString();

    const result: CharactersProps | null = await (
      await fetch(
        `${process.env
          .REACT_APP_BASE_URL!}/v1/public/characters?limit=100&offset=${pageNumber}&ts=${ts}&apikey=${process
          .env.REACT_APP_API_KEY!}&hash=${hash}`
      )
    ).json();
    if (result?.data.results.length)
      setInfo({
        data: {
          results: (info?.data.results.length
            ? [...info.data.results, ...result?.data.results]
            : result?.data.results) as CharactersProps["data"]["results"],
        },
      });
    setLoading(false);
  };

  const lastCharacterRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 100);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setLoading(true);
    getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      <h1 className="title-page">characters</h1>
      <div className="brochure">
        {info?.data.results.map((value, i) => {
          const index = value.thumbnail.path.lastIndexOf("/");
          const url = value.thumbnail.path.slice(
            index + 1,
            value.thumbnail.path.length
          );
          return url.localeCompare("image_not_available") ? (
            <Card
              ref={
                info?.data.results.length === i + 1 ? lastCharacterRef : null
              }
              onClick={() => {
                setOpen(true);
                setPopupData(info?.data.results.at(i)!);
              }}
              name={value.name}
              src={`${value.thumbnail.path}/portrait_uncanny.${value.thumbnail.extension}`}
              alt={value.name}
              key={value.name + i}
            />
          ) : null;
        })}
        {open ? (
          <Popup closePopup={() => setOpen(false)}>
            <div>
              <h1 className="title-popup">{popupData?.name}</h1>
              <p className="description-popup">{popupData?.description}</p>
              <p className="title-section-grid">Comics featuring this character</p>
              <div className="container-grid" id="characters-list-container">
                {popupData?.comics.items.length ? popupData?.comics.items.map((v, i) => {
                  return (
                    <div className="body-grid" key={v.name + i} >
                      <p>{v.name}</p>
                    </div>
                  );
                }) : <p>No information</p>}
              </div>
            </div>
          </Popup>
        ) : null}
      </div>
      {loading ? <div className="loading">Loading...</div> : null}
    </>
  );
};

export default Characters;
