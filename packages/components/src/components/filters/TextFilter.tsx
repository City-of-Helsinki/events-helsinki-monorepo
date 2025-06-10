import { FilterButton } from '../filterButton';
import type { TextFilterType, FilterType } from '../filterButton';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: TextFilterType;
}

const TextFilter: React.FC<Props> = ({ onRemove, text, type = 'text' }) => (
  <FilterButton onRemove={onRemove} text={text} type={type} value={text} />
);

export default TextFilter;
