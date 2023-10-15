import { FunctionComponent } from "react";
import { Emoji } from "./emojis";

interface Props {
  emoji: Emoji;
  skinTone: number;
}

const EmojiComponent: FunctionComponent<Props> = ({ emoji, skinTone }) => {
  const imageSrc = `https://static.neuronapp.io/emojis/${
    emoji.skins && emoji.skins[skinTone - 1]
      ? emoji.skins[skinTone - 1]
      : emoji.id
  }.svg`;

  return (
    <img
      src={imageSrc}
      alt={`${emoji.keywords?.join(" ")}`}
      className="w-full h-full"
    />
  );
};

export default EmojiComponent;
