import logger from '@/utils/log';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Emoji } from './emojis-old';
import useEmojiPicker from '@/contexts/emoji-picker';
import EmojiElement from './EmojiElement';

const getEmojiId = (emoji: Emoji, skinTone: number) => {
  if (skinTone > 0 && emoji.skins && emoji.skins.length >= skinTone) {
    return emoji.skins[skinTone - 1];
  }

  return emoji.id;
};

export default function EmojiButton(emoji: Emoji) {
  logger.render('EmojiButton');

  const picker = useEmojiPicker();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <EmojiElement
            id={getEmojiId(emoji, picker.skinTone)}
            onClick={() => picker.onSelect(emoji)}
            style={{ padding: '5px' }}
          />
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{emoji.code}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
