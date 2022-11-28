import "./index.css";
import MD5 from "crypto-js/md5";
import { useCallback, useEffect, useRef, useState } from "react";
import { CreatorResult, CreatorsProps } from "../../interface/creatorsProps";
import Popup from "../../components/popup";

const Creators = () => {
  const [info, setInfo] = useState<CreatorsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [popupData, setPopupData] = useState<CreatorResult | null>(null);
  const observer = useRef<IntersectionObserver>();

  const getCreators = async () => {
    const ts = Date.now().toString();
    const hash = MD5(
      ts + process.env.REACT_APP_PRIVATE_API_KEY + process.env.REACT_APP_API_KEY
    ).toString();

    const result: CreatorsProps | null = await (
      await fetch(
        `${process.env
          .REACT_APP_BASE_URL!}/v1/public/creators?limit=100&offset=${pageNumber}&ts=${ts}&apikey=${process
          .env.REACT_APP_API_KEY!}&hash=${hash}`
      )
    ).json();
    if (result?.data.results.length)
      setInfo({
        data: {
          results: (info?.data.results.length
            ? [...info.data.results, ...result?.data.results]
            : result?.data.results) as CreatorsProps["data"]["results"],
        },
      });
    setLoading(false);
  };

  const lastCreatorsRef = useCallback(
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
    getCreators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      <h1 className="title-page">creators</h1>
      <div className="gridCreators">
        {info?.data.results.map((value, i) => {
          return (
            <>
              <p
                onClick={() => {
                  setOpen(true);
                  setPopupData(info?.data.results.at(i)!);
                }}
                ref={
                  info?.data.results.length === i + 1 ? lastCreatorsRef : null
                }
                key={value.firstName + i}
                id="creators"
              >
                {value.lastName ? `${value.lastName}, ` : null}{" "}
                {value.firstName}{" "}
              </p>
            </>
          );
        })}
        {open ? (
          <Popup closePopup={() => setOpen(false)}>
            <div>
              <h1 className="title-popup">{popupData?.fullName}</h1>
              <p className="title-section-grid">
                Comics created by this creator
              </p>
              <div className="container-grid" id="creator-list-container">
                {popupData?.comics.items.length ? (
                  popupData?.comics.items.map((v, i) => {
                    return (
                      <div className="body-grid" key={v.name + i}>
                        <p>{v.name}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No information</p>
                )}
              </div>
            </div>
          </Popup>
        ) : null}
      </div>
      {!loading ? <div className="loading">'Loading...'</div> : null}
    </>
  );
};

export default Creators;
