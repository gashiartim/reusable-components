import { FunctionComponent } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Icon } from '../ui/icon';
import EmojiPicker from '.';
import Picker from '../picker';
import { categories, emojis } from './emojis';
import SkinToneSelector from './SkinToneSelector';

interface Props {
  onSelect: (emoji: any) => void;
  onToggle?: () => void;
  open?: boolean;
}

const EmojiPickerPopover: FunctionComponent<Props> = ({
  onSelect,
  onToggle,
  open,
}) => {
  return (
    <Popover onOpenChange={onToggle} open={open}>
      <PopoverTrigger asChild>
        <Icon name="emoji-sticker-line" />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-max" align="end">
        {/* <EmojiPicker onSelect={onSelect} /> */}
        <Picker
          categories={categories as any as string[]}
          items={emojis}
          onSelect={onSelect}
          type="emoji"
        >
          <SkinToneSelector />
        </Picker>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPickerPopover;
