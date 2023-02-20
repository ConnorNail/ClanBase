// Small Size Dropdown
import React, { useState } from 'react';
import { Dropdown, Anchor, Div, Icon } from "atomize";
import Link from 'next/link';
import pageList from '../../functions/usePageList';

export default function MenuDropDown() {
    const [showDropdown, setShowDropdown] = useState(false)
    const pages = pageList()

    const menuList = (
        <Div p={{ x: "1rem", y: "0.5rem" }} bg="cbRed" shadow="4" rounded="0 0 5px 5px">
            <Link href="/" passHref legacyBehavior>
                <Anchor d="block" p={{ y: "0.5rem", x: "0.5rem" }} textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                    HOME
                </Anchor>
            </Link>
            {pages.map((list, index) => (
                <Link href={list.link} key={index} passHref legacyBehavior>
                    <Anchor d="block" p={{ y: "0.5rem", x: "0.5rem" }} textSize="subheader" textColor="cbWhite" hoverTextColor="cbBlue" style={{ whiteSpace: "nowrap" }}>
                        {list.name}
                    </Anchor>
                </Link>
            ))}
        </Div>
    );

    return (
        <Dropdown
            bg="transparent"
            focusBg="transparent"
            border="transparent"
            h="3rem"
            direction="bottomleft"
            isOpen={showDropdown}
            onClick={() => setShowDropdown(curentState => !curentState)}
            openSuffix={<Icon name="UpArrow" size="50px" color="cbWhite" />}
            closeSuffix={<Icon name="Menu" size="50px" color="cbWhite" />}
            menu={menuList}
        >
        </Dropdown>
    )
}