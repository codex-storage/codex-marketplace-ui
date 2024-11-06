import { classnames } from "../../utils/classnames";
import "./WelcomeImage.css";

type Props = {
  tiny: boolean;
};

export function WelcomeImage({ tiny }: Props) {
  return (
    <picture>
      <source
        srcSet="/img/welcome@3x.webp 3x, 
          /img/welcome@2x.webp 2x, 
          /img/welcome.webp 1x"
        type="image/webp"
      />
      <source
        srcSet="/img/welcome@3x.png 3x, 
          /img/welcome@2x.png 2x, 
          /img/welcome.png 1x"
        type="image/png"
      />
      <img
        src="/img/welcome.png"
        alt="Welcome Image"
        className={classnames(["welcome-img"], ["welcome-img--tiny", tiny])}
      />
    </picture>
  );
}
