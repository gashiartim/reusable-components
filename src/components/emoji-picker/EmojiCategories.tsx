import { FunctionComponent } from 'react';
import { categories, categoriesIcons } from './emojis';
import { EmojiCategory } from './emoji-picker.typings';

interface Props {
  onCategoryClick: (index: number, category: EmojiCategory) => void;
}

const EmojiCategories: FunctionComponent<Props> = ({ onCategoryClick }) => (
  <ul className="flex justify-between pb-2 border-b border-gray-200">
    {categories.map((category, i) => (
      <li
        key={`icon-category-${i}`}
        className="p-1 transition-colors duration-100 ease-in-out rounded-md cursor-pointer hover:bg-gray-200"
        onClick={() => onCategoryClick(i, category)}
      >
        {categoriesIcons[`${category}`]}
      </li>
    ))}
  </ul>
);

export default EmojiCategories;
