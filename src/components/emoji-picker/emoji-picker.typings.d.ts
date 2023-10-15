export type ValuesOf<T extends readonly any[]> = T[number];

export type EmojiCategory = ValuesOf<typeof categories>;

export type SelectedCategoryType = {
  categoryIndex: number;
  selectedCategory: EmojiCategory;
};
