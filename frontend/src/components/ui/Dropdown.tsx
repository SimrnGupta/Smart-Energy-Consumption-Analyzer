import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Check, ChevronDownIcon } from 'lucide-react';

interface VariableOption {
  label: string;
  value: string;
}

const Dropdown = ({ options, onOptionSelected } : { options : VariableOption[], onOptionSelected : (variable: string) => void}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger 
      className="flex bg-sky-100 text-gray-900 px-4 py-2 rounded-md cursor-pointer
      hover:bg-sky-200 border border-gray-950 cursor-pointer">
        Select Variable
        <ChevronDownIcon className="ml-2" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" className="bg-sky-100 border border-sky-100 rounded-md shadow-xl text-gray-700">
        {options.map((option: { value: string; label: string  }) => (
          <DropdownMenu.Item key={option.value} className="flex items-center px-4 py-2 border hover:bg-sky-300 cursor-pointer hover:text-white" onSelect={() => onOptionSelected(option.value)}>
            <span className="flex-grow">{option.label}</span>
            <DropdownMenu.ItemIndicator>
              <Check className="h-4 w-4 text-blue-500" />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
