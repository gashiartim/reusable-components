import { CSSProperties, ChangeEvent, FunctionComponent, useState } from 'react';
import { Emoji } from './emojis';
import { List, AutoSizer } from 'react-virtualized';
import { EmojiCategory } from './emoji-picker.typings';
import { useDebounce } from '@/hooks/useDebounce';
import EmojiComponent from './EmojiComponent';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface Props {
  emojis: Emoji[][];
  selectedCategory: EmojiCategory;
  selectedSkinTone: number;
  handleEmojiClick: (emoji: Emoji) => void;
}

const AllEmojisTab: FunctionComponent<Props> = ({
  emojis,
  selectedSkinTone,
  handleEmojiClick,
}) => {
  const [search, setSearch] = useState<string>('');

  const debouncedSearchTerm = useDebounce(search, 500);

  const { mobile } = useWindowWidth();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const allEmojis = emojis.flat();

  const filteredEmojis = allEmojis.filter(
    (emoji) =>
      emoji.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      ),
  );

  const rowHeight = 30;
  const emojiPerRow = mobile ? 6 : 9; //9 for larger devices
  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
  }) => {
    const emojisToRender = filteredEmojis.slice(
      index * emojiPerRow,
      index * emojiPerRow + emojiPerRow,
    );

    return (
      <div
        key={key}
        style={style}
        className="grid justify-center w-full grid-cols-6 py-2 md:grid-cols-9 gap-x-5 gap-y-2"
      >
        {emojisToRender.map((emoji) => (
          <button
            key={`emoji-${emoji.id}`}
            onClick={() => handleEmojiClick(emoji)}
            aria-label={emoji.keywords?.join(' ')}
            className="w-5 h-5 transition-colors duration-100 ease-in-out rounded-md focus:outline-none focus:ring ring-gray-100 focus:border-gray-100 hover:bg-gray-100"
          >
            <EmojiComponent emoji={emoji} skinTone={selectedSkinTone} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-2 text-xs bg-transparent border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
      />
      <div className="min-h-[235px] w-full md:w-[350px]">
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                width={width}
                height={height}
                rowCount={Math.ceil(filteredEmojis.length / emojiPerRow)}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
                className="py-1 md:py-2"
              />
            );
          }}
        </AutoSizer>
      </div>
    </div>
  );
};

export default AllEmojisTab;
