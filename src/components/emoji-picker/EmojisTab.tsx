import { FunctionComponent } from 'react';
import { Emoji } from './emojis';
import EmojiComponent from './EmojiComponent';

interface Props {
  emojis: Emoji[];
  selectedSkinTone: number;
  handleEmojiClick: (emoji: Emoji) => void;
}

const EmojisTab: FunctionComponent<Props> = ({
  emojis,
  selectedSkinTone,
  handleEmojiClick,
}) => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-9 py-2 overflow-y-auto gap-x-5 gap-y-[10px] max-h-60 md:w-[350px]">
      {emojis?.map((emoji) => (
        <button
          key={`emoji-${emoji.id}`}
          onClick={() => handleEmojiClick(emoji)}
          aria-label={emoji.keywords?.join(' ')}
          className="w-5 h-5 transition-colors duration-100 ease-in-out rounded-md focus:outline-none focus:ring focus:border-gray-100 hover:bg-gray-100"
        >
          <EmojiComponent emoji={emoji} skinTone={selectedSkinTone} />
        </button>
      ))}
    </div>
  );
};

export default EmojisTab;
