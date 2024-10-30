import "./BackgroundImage.css";

export function BackgroundImage() {
  return (
    <picture>
      <source
        srcSet="/img/onboarding@4x.webp 4x, 
          /img/onboarding@3x.webp 3x, 
          /img/onboarding@2x.webp 2x, 
          /img/onboarding@1.5x.webp 1.5x, 
          /img/onboarding.webp 1x"
        sizes="(max-width: 600px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
        type="image/webp"
      />
      <source
        srcSet="/img/onboarding@4x.png 4x, 
          /img/onboarding@3x.png 3x, 
          /img/onboarding@2x.png 2x, 
          /img/onboarding@1.5x.png 1.5x, 
          /img/onboarding.png 1x"
        sizes="(max-width: 600px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
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
