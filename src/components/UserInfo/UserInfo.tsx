import { ChangeEvent, useState } from "react";
import "./UserInfo.css";
import { OnBoardingUtils } from "../../utils/onboarding";
import { Input } from "@codex-storage/marketplace-ui-components";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";

type Props = {
  onNameChange?: (value: string) => void;
};

export function UserInfo({ onNameChange }: Props) {
  const [displayName, setDisplayName] = useState(
    OnBoardingUtils.getDisplayName()
  );
  const [emoji, setEmoji] = useState(OnBoardingUtils.getEmoji());
  const [areEmojiVisible, setAreEmojiVisible] = useState(false);

  const onDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    OnBoardingUtils.setDisplayName(value);
    setDisplayName(value);
    onNameChange?.(value);
  };

  const onDisplayEmoji = () => setAreEmojiVisible(!areEmojiVisible);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setEmoji(emojiData.emoji);
    OnBoardingUtils.setEmoji(emojiData.emoji);
    setAreEmojiVisible(false);
  };

  return (
    <div className="user-info">
      <div className="emoji">
        {areEmojiVisible && (
          <EmojiPicker
            width={"auto"}
            emojiStyle={EmojiStyle.NATIVE}
            theme={Theme.DARK}
            lazyLoadEmojis={true}
            onEmojiClick={onEmojiClick}
            categories={
              [
                "smileys_people",
                "animals_nature",
                "food_drink",
                "travel_places",
                "activities",
                "objects",
                "symbols",
                "flags",
              ] as any
            }
          />
        )}
        <div>
          <Input
            onChange={onDisplayNameChange}
            onClick={onDisplayEmoji}
            label="Account Emoji"
            readOnly={true}
            id="emoji"
            value={emoji}></Input>
        </div>
      </div>

      <div>
        <Input
          onChange={onDisplayNameChange}
          label="Preferred name"
          id="displayName"
          value={displayName}></Input>
      </div>
    </div>
  );
}
