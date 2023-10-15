import { FunctionComponent, useCallback, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Emoji, categories, emojis } from './emojis';
import { Icon } from '../ui/icon';
import { EmojiCategory, SelectedCategoryType } from './emoji-picker.typings';
import EmojiCategories from './EmojiCategories';
import EmojiList from './EmojiList';
import SkinToneSelector from './SkinToneSelector';

interface Props {
  onSelect: (emoji: string) => void;
}

const EmojiPicker: FunctionComponent<Props> = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType>({
      categoryIndex: 0,
      selectedCategory: categories[0],
    });

  const [selectedSkinTone, setSelectedSkinTone] = useState<number>(0);

  const handleCategoryClick = useCallback(
    (index: number, category: EmojiCategory) => {
      setSelectedCategory({
        categoryIndex: index,
        selectedCategory: category,
      });
    },
    [],
  );

  const handleSelectSkinTone = (skinTone: number) => {
    setSelectedSkinTone(skinTone);
  };

  const handleEmojiClick = (emoji: Emoji) => {
    onSelect(emoji.id);
  };

  return (
    <div className="pb-2 text-black bg-white">
      <div className="p-2 pb-0">
        <EmojiCategories onCategoryClick={handleCategoryClick} />
      </div>
      <EmojiList
        categoryIndex={selectedCategory.categoryIndex}
        emojis={emojis}
        selectedSkinTone={selectedSkinTone}
        handleEmojiClick={handleEmojiClick}
      />
      <SkinToneSelector
        selectSkinTone={handleSelectSkinTone}
        selectedSkinTone={selectedSkinTone}
      />
    </div>
  );
};

export default EmojiPicker;
