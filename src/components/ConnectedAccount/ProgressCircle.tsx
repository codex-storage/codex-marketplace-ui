import "./ProgressCircle.css";

type Props = {
  value: number;
};

export function ProgressCircle(_: Props) {
  return (
    <div className="progress-circle">
      <div></div>
    </div>
  );
}
