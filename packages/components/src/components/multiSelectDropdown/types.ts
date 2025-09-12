import type { Option } from '../../types/types';

export interface MultiselectDropdownProps {
  checkboxName: string;
  icon: React.ReactElement;
  inputPlaceholder?: string;
  inputValue?: string;
  name: string;
  onChange: (values: string[]) => void;
  options: Option[];
  fixedOptions?: Option[];
  renderOptionText?: (optionValue: string) => React.ReactChild;
  selectAllText?: string;
  setInputValue?: (newVal: string) => void;
  showSearch?: boolean;
  showSelectAll?: boolean;
  title: string;
  value: string[];
  className?: string;
  helpText?: string;
  filterByInput?: boolean;
}
