// Small Size Dropdown
import React, { useState } from 'react';
import { Dropdown, Anchor, Div, Icon } from "atomize";
import Link from 'next/link';
import pageList from '../pageList'

const menuList = (
    <Div p={{ x: "1rem", y: "0.5rem" }} bg="brand900" shadow="4">
        {pageList.map((list, index) => (
            <Link href={list.link} key={index}>
                <Anchor d="block" p={{ y: "0.5rem", x: "0.5rem" }} textSize="subheader" textColor="gray100" hoverTextColor="gray400">
                    {list.name}
                </Anchor>
            </Link>
        ))}
    </Div>
);

class MenuDropDown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
        };
    }

    render() {
        const { showDropdown } = this.state;

        return (
            <Dropdown
                bg="transparent"
                focusBg="transparent"
                border="transparent"
                h="5rem"
                direction="bottomright"
                isOpen={showDropdown}
                onClick={() =>
                    this.setState({ showDropdown: !showDropdown })
                }
                openSuffix={<Icon name="UpArrow" size="80px" color="gray100" />}
                closeSuffix={<Icon name="Menu" size="80px" color="gray100" />}
                menu={menuList}
            >
            </Dropdown>
        );
    }
}

export default MenuDropDown;