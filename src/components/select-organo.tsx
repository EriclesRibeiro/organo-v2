import * as Select from '@radix-ui/react-select';
import { IoIosArrowDown } from "react-icons/io"
import { useState } from 'react';

import { TOrganoOverview } from '../@types/TOrgano';

type TOrganoOverviewId = {
    id: string;
}

type TOrganoOverviewWithId = TOrganoOverviewId & TOrganoOverview;

interface ISelectOrganoProps {
    data: TOrganoOverviewWithId[]
    selectedValue?: string
    handleSelectedValue: (value: string) => void
}

export function SelectOrgano({ data, selectedValue, handleSelectedValue }: ISelectOrganoProps) {

    // const [selectedValue, setSelectedValue] = useState(data[0].id); // Supondo que haja um valor inicial
    const handleChangeSelection = (value: string) => {
        handleSelectedValue(value)
    }

    return (
        <Select.Root value={selectedValue} onValueChange={(newValue) => handleChangeSelection(newValue)}>
            <Select.Trigger className='flex items-center justify-between w-52 h-12 rounded-xl mb-2 bg-transparent border border-or-dark-saturated px-4 py-2 text-or-snow outline-none'>
                <Select.Value className='text-white'>
                    {data.find((item) => item.id === selectedValue)?.title}
                </Select.Value>
                <Select.Icon>
                    <IoIosArrowDown />
                </Select.Icon>
            </Select.Trigger>
            <Select.Content className='rounded-xl z-10 bg-or-dark-saturated shadow-md shadow-or-dark px-4 py-1 w-48'>
                {data.map((item) => (
                    <Select.Item className='text-sm text-or-snow outline-none py-1 hover:text-or-lime transition cursor-pointer' key={item.id} value={item.id}>{item.title}</Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
}
