import { ButtonIcon } from "@codex-storage/marketplace-ui-components";
import "./CardNumbers.css";
import { Check, CircleX, Pencil } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { classnames } from "../../utils/classnames";

type Props = {
  title: string;
  data: string;
  onChange: (value: string) => void;
  onValidation?: (value: string) => string;
  className?: string;

  /**
   * If true, the caret will be set at the end of the input
   * Default is true
   */
  repositionCaret?: boolean;

  helper: string;
};

export function CardNumbers({
  title,
  data,
  onValidation,
  onChange,
  helper,
  className = "",
  repositionCaret = true,
}: Props) {
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLParagraphElement>(null);

  const replaceCaret = useCallback(
    (el: HTMLElement) => {
      if (!repositionCaret) {
        return;
      }

      // Place the caret at the end of the element
      const target = document.createTextNode("");
      el.appendChild(target);
      // do not move caret if element was not focused
      const isTargetFocused = document.activeElement === el;
      if (target !== null && target.nodeValue !== null && isTargetFocused) {
        const sel = window.getSelection();
        if (sel !== null) {
          const range = document.createRange();
          range.setStart(target, target.nodeValue.length);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        if (el instanceof HTMLElement) el.focus();
      }
    },
    [repositionCaret]
  );

  const updateText = useCallback(
    (text: string | null) => {
      const current = ref.current;

      if (current && text) {
        current.textContent = text;
        replaceCaret(current);
      }
    },
    [replaceCaret, ref]
  );

  useEffect(() => {
    updateText(data);
    setIsDirty(false);
  }, [data, updateText]);

  const onEditingClick = () => {
    const current = ref.current;

    if (isDirty) {
      onChange?.(current?.textContent || "");
    } else if (current) {
      current.focus();
      replaceCaret(current);
    }
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.textContent;

    setIsDirty(text !== data);

    if (!text) {
      setError("A value is required");
      return;
    }

    if (text?.length > 10) {
      e.currentTarget.textContent = text.slice(0, 10);
      replaceCaret(e.currentTarget);
      setError("The value is too long");
      return;
    }

    updateText(text);

    const msg = onValidation?.(text);

    if (msg) {
      setError(msg);
      return;
    }

    setError("");
  };

  const onBlur = () => {
    if (error === "") {
      if (isDirty) {
        onChange?.(ref.current?.textContent || "");
      }
    } else {
      updateText(data);
    }

    setIsDirty(false);
    setError("");
  };

  const Icon = error
    ? () => <CircleX size={"1rem"} />
    : isDirty
      ? () => <Check size={"1rem"} />
      : () => <Pencil size={"1rem"} />;

  return (
    <div className={classnames(["cardNumber-container"], [className])}>
      <div
        className={classnames(["cardNumber"], ["cardNumber--error", !!error])}>
        <div className="cardNumber-dataContainer">
          <>
            <p
              ref={ref}
              className="cardNumber-data"
              onBlur={onBlur}
              onInput={onInput}
              contentEditable={true}
            />

            <ButtonIcon
              onClick={onEditingClick}
              variant="small"
              Icon={Icon}></ButtonIcon>
          </>
        </div>
        <div className="cardNumber-info">
          <b className="cardNumber-title">{title}</b>
        </div>
      </div>
      {error ? (
        <small className="cardNumber-errorText">{error}</small>
      ) : (
        <small className="cardNumber-helperText">{helper}</small>
      )}
    </div>
  );
}
