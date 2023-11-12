import { memo } from 'react';

import {
  VariableSizeList,
  FixedSizeGrid,
  GridChildComponentProps,
  ListChildComponentProps,
  areEqual,
} from 'react-window';

import logger from '@/utils/log';
import { emojis, categories, Emoji } from './emojis-old';
import EmojiButton from './EmojiButton';
import { Input } from '../ui/input';
import { EmojiPickerContext } from '@/contexts/emoji-picker';

interface Props {
  onSelect: (emoji: Emoji) => void;
}

const SIZE = 35;
const EMOJIS_PER_ROW = 10;

const rowHeight = (group: Emoji[]) => rowCount(group) * SIZE;

const rowCount = (group: Emoji[]) => Math.ceil(group.length / EMOJIS_PER_ROW);

const EmojiGroup = memo((props: ListChildComponentProps) => {
  const emojiGroup = emojis[props.index];

  const EmojiCell = memo(
    ({ rowIndex, columnIndex, style }: GridChildComponentProps<Emoji>) => {
      const index = rowIndex * EMOJIS_PER_ROW + columnIndex;
      if (index >= emojiGroup.length) {
        return null;
      }

      return (
        <span style={style} className="hover:bg-gray-100 cursor-pointer">
          <EmojiButton {...emojiGroup[index]} />
        </span>
      );
    },
    areEqual,
  );

  return (
    <div style={props.style}>
      <span className="text-sm font-semibold text-foreground/70">
        {categories[props.index]}
      </span>
      <div className="mt-2">
        <FixedSizeGrid<Emoji>
          columnCount={EMOJIS_PER_ROW}
          columnWidth={SIZE}
          height={rowHeight(emojiGroup)}
          rowCount={rowCount(emojiGroup)}
          rowHeight={SIZE}
          width={EMOJIS_PER_ROW * SIZE}
        >
          {EmojiCell}
        </FixedSizeGrid>
      </div>
    </div>
  );
}, areEqual);

export default function EmojiPicker(props: Props) {
  logger.render('EmojiPicker');

  return (
    <EmojiPickerContext.Provider
      value={{
        skinTone: 0,
        onSelect: props.onSelect,
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Input className="h-8" placeholder="Search emojis" />
          <span className="h-8 w-8 p-1 border rounded shadow-sm cursor-pointer">
            <EmojiButton id="01h37jbxq11hpcnw1mdfgmm70vem" code="test" />
          </span>
        </div>
        <VariableSizeList
          height={300}
          itemCount={emojis.length}
          itemSize={(index) => rowHeight(emojis[index]) + 40}
          width="100%"
        >
          {EmojiGroup}
        </VariableSizeList>
      </div>
    </EmojiPickerContext.Provider>
  );
}
