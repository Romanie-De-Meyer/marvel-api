import { ComicResult, ComicsProps } from "../../interface/comicsProps";
import CardComic from "../card/cardComic";
import "./index.css";

const Carossel = ({ ...props }: { info: ComicsProps | null, onClick: (v: ComicResult) => void }) => {
  return (
    <div id="carossel-comic">
      {props.info?.data.results.map((value, i) => (
        <CardComic
          src={`${value.thumbnail.path}/portrait_uncanny.${value.thumbnail.extension}`}
          alt={value.title}
          name={value.title}
          key={value.title + i}
          onClick={() => props.onClick(value)}
        />
      ))}
    </div>
  );
};

export default Carossel;
