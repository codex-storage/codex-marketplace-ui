import { classnames } from "../../utils/classnames";
import "./AssistanceImage.css";

export function AssistanceImage() {
  return (
    <picture>
      <source
        srcSet="/img/assistance@3x.webp 3x, 
          /img/assistance@2x.webp 2x, 
          /img/assistance.webp 1x"
        type="image/webp"
      />
      <source
        srcSet="/img/assistance@3x.png 3x, 
          /img/assistance@2x.png 2x, 
          /img/assistance.png 1x"
        type="image/png"
      />
      <img
        src="/img/assistance.png"
        alt="assistance Image"
        className={classnames(["assistance-img"])}
      />
    </picture>
  );
}
