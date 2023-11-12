import * as React from 'react';
import logger from '@/utils/log';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  id: string;
}

const EmojiElement = React.forwardRef<HTMLImageElement, Props>((props, ref) => (
  <img src={`https://static.neuronapp.io/emojis/${props.id}.svg`} {...props} />
));

export default EmojiElement;
