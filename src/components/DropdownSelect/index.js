import { Icon, Dropdown, Div, Textarea, Text, Anchor, Button } from "atomize";
import React, { useState } from 'react';

const DropdownSelect = ({ value, setValue, list, display }) => {
    const [open, setOpen] = useState(false)

    const menu = (list) => {
        if (list) {
            return (
                <>
                    {list.map((item, index) => (
                        <Anchor key={index} textColor="cbGrey2" hoverTextColor="cbBlue" textSize="paragraph" m={{ y: "0.5rem" }}
                            onClick={() => {
                                setValue(item)
                                setOpen(false)
                            }}>
                            {display(item)}
                        </Anchor>
                    ))}
                </>
            )
        } else {
            return null
        }
    }
    
    return (
        <Dropdown
            isOpen={open}
            onClick={() => setOpen(!open)}
            menu={
                <Div bg='cbGrey1' rounded="0 0 5px 5px" shadow="5" p={{ x: "1.5rem" }} m={{ t: "-0.25rem" }} d="flex" flexDir="column">
                    {menu(list)}
                </Div>
            }
            bg='cbGrey1'
            h="2rem"
            focusBg="cbGrey1"
            border="0px solid"
            textColor="cbWhite"
            textSize="paragraph"
            fontFamily="Primary"
            openSuffix={<Icon name="UpArrow" size="20px" color="cbBlue" />}
            closeSuffix={<Icon name="DownArrow" size="20px" color="cbBlue" />}
        >
            {display(value)}
        </Dropdown>
    )
}

export default DropdownSelect