import "./index.css";

const CardComic = ({ ...props }) => {
  return (
    <figure id="figure-comics" onClick={props.onClick}>
      <div id="img-container">
        <img id="img-comic" src={props.src} alt={props.alt} ref={props.ref} />
      </div>
      <figcaption id="figcaption-comic">{props.name}</figcaption>
    </figure>
  );
};

export default CardComic;
