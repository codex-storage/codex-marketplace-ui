import "./BackgroundImage.css";

export function BackgroundImage() {
  return (
    <picture>
      <source
        srcSet="/img/onboarding@3x.webp 3x, 
          /img/onboarding@2x.webp 2x, 
          /img/onboarding.webp 1x"
        type="image/webp"
      />
      <source
        srcSet="/img/onboarding@3x.png 3x, 
          /img/onboarding@2x.png 2x, 
          /img/onboarding.png 1x"
        type="image/png"
      />
      <img
        src="/img/onboarding.png"
        alt="Background Image"
        className="background-img"
      />
    </picture>
  );
}
