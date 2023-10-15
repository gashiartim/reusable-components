import { FunctionComponent } from 'react';
import { Emoji, categories } from './emojis';

import EmojisTab from './EmojisTab';
import AllEmojisTab from './AllEmojisTab';

interface Props {
  categoryIndex: number;
  emojis: Emoji[][];
  selectedSkinTone: number;
  handleEmojiClick: (emoji: Emoji) => void;
}

const EmojiList: FunctionComponent<Props> = ({
  categoryIndex,
  emojis,
  selectedSkinTone,
  handleEmojiClick,
}) => {
  const searchTab = categoryIndex === 0;

  return (
    <div className="p-2">
      {!searchTab && (
        <div className="pb-[9px] text-sm font-medium">
          {categories[categoryIndex]}
        </div>
      )}
      {searchTab ? (
        <AllEmojisTab
          emojis={emojis}
          selectedCategory={categoryIndex}
          selectedSkinTone={selectedSkinTone}
          handleEmojiClick={handleEmojiClick}
        />
      ) : (
        <EmojisTab
          emojis={emojis[categoryIndex - 1]}
          selectedSkinTone={selectedSkinTone}
          handleEmojiClick={handleEmojiClick}
        />
      )}
    </div>
  );
};

export default EmojiList;
