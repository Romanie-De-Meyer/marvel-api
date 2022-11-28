import { forwardRef } from "react";
import { CardProps } from "../../interface/cardProps";
import "./index.css";

const Card = forwardRef(({ ...props }: CardProps, ref: any) => {
  return (
    <div id="div-card">
      <figure className="card" onClick={props.onClick} >
        <img src={props.src} alt={props.alt} ref={ref} />
        <figcaption>{props.name}</figcaption>
      </figure>
    </div>
  );
});

export default Card;
