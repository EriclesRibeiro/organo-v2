import * as ReactSelect from '@radix-ui/react-select';
import { IoIosArrowDown } from "react-icons/io"

type TSelect = {
    data?: any[]
    selectedValue?: string
    selectKey: string
    handleSelectedValue: (value: string) => void
}

const Select = ({
    handleSelectedValue,
    data,
    selectedValue,
    selectKey }: TSelect) => {

    function handleChangeSelection(value: string) {
        handleSelectedValue(value)
    }

    return (
        <ReactSelect.Root
            value={selectedValue}
            onValueChange={(newValue) => handleChangeSelection(newValue)}>
            <ReactSelect.Trigger className='flex items-center justify-between w-52 h-12 rounded-xl mb-2 bg-transparent border border-or-gray px-4 py-2 text-or-snow outline-none'>
                <ReactSelect.Value className='text-white'>
                    {data?.find((item) => item.id === selectedValue)[selectKey]}
                </ReactSelect.Value>
                <ReactSelect.Icon>
                    <IoIosArrowDown />
                </ReactSelect.Icon>
            </ReactSelect.Trigger>
            <ReactSelect.Content className='rounded-xl z-10 bg-or-dark-saturated shadow-md shadow-or-dark px-4 py-1 w-48'>
                {data?.map((item) => (
                    <ReactSelect.Item
                        className='text-sm text-or-snow outline-none py-1 hover:text-or-lime transition cursor-pointer'
                        key={item.id}
                        value={item.id}>{item[selectKey]}</ReactSelect.Item>
                ))}
            </ReactSelect.Content>
        </ReactSelect.Root>
    )
}

export default Select