import {
  Cell,
  Row,
  SimpleText,
} from "@codex-storage/marketplace-ui-components";
import { PrettyBytes } from "../../utils/bytes";
import "./AvailabilityDiskRow.css";
import { classnames } from "../../utils/classnames";

type Props = {
  bytes: number;
};

export function AvailabilityDiskRow({ bytes }: Props) {
  return (
    <Row
      className={classnames(["availabilityDiskRow"])}
      cells={[
        <Cell className=" availabilityDiskRow-cell">
          <span></span>
        </Cell>,
        <Cell colSpan={6} className={classnames([" availabilityDiskRow-cell"])}>
          <div className={classnames(["availabilityDiskRow-cell-content"])}>
            <HardDrive />
            <div>
              <div>
                <b>Node</b>
              </div>
              <SimpleText size="small" variant="light">
                {PrettyBytes(bytes)} allocated for the node
              </SimpleText>
            </div>
          </div>
        </Cell>,
      ]}></Row>
  );
}

const HardDrive = () => (
  <svg
    width="30"
    viewBox="0 0 60 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M55 0H5C2.23858 0 0 2.23858 0 5V75C0 77.7614 2.23858 80 5 80H55C57.7614 80 60 77.7614 60 75V5C60 2.23858 57.7614 0 55 0Z"
      fill="#46484C"
    />
    <path
      d="M30 60C43.8071 60 55 48.8071 55 35C55 21.1929 43.8071 10 30 10C16.1929 10 5 21.1929 5 35C5 48.8071 16.1929 60 30 60Z"
      fill="#9494D1"
    />
    <path
      d="M7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10Z"
      fill="#95989D"
    />
    <path
      d="M52.5 10C53.8807 10 55 8.88071 55 7.5C55 6.11929 53.8807 5 52.5 5C51.1193 5 50 6.11929 50 7.5C50 8.88071 51.1193 10 52.5 10Z"
      fill="#95989D"
    />
    <path
      d="M52.5 75C53.8807 75 55 73.8807 55 72.5C55 71.1193 53.8807 70 52.5 70C51.1193 70 50 71.1193 50 72.5C50 73.8807 51.1193 75 52.5 75Z"
      fill="#95989D"
    />
    <path
      d="M30 40C32.7614 40 35 37.7614 35 35C35 32.2386 32.7614 30 30 30C27.2386 30 25 32.2386 25 35C25 37.7614 27.2386 40 30 40Z"
      fill="#46484C"
    />
    <path
      d="M28.0697 41.4744C29.1749 42.165 29.4965 43.8048 28.8334 45.3439L19.8787 68.3287C19.7944 68.5884 19.6948 68.8452 19.5795 69.0978L19.4531 69.4169L19.4313 69.4035C19.3383 69.5843 19.2371 69.7626 19.1275 69.938C16.9697 73.3912 12.3729 74.4111 8.86014 72.2161C5.34741 70.0211 4.24902 65.4424 6.40681 61.9892C6.51642 61.8138 6.63231 61.6447 6.75405 61.4819L6.7324 61.4681L6.94941 61.2322C7.13484 61.0056 7.33205 60.7926 7.53964 60.5934L24.2571 42.4843C25.3497 41.2136 26.9645 40.7838 28.0697 41.4744Z"
      fill="#CDCED0"
    />
  </svg>
);
