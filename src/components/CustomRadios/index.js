// Styling Radiobox
import { Radiobox, Label } from "atomize";
import React, { useState } from 'react';

export default function CustomRadios({selectedValue, setSelectedValue }) {
    return (
        <>
            <Label textColor="cbWhite" p= "0.25rem" >
                <Radiobox
                    onChange={() => setSelectedValue("PvE")}
                    checked={selectedValue == 'PvE'}
                    inactiveColor="cbGrey3"
                    activeColor="cbBlue"
                    size="22px"
                />
                PvE
            </Label>
            <Label textColor="cbWhite" p= "0.25rem" >
                <Radiobox
                    onChange={() => setSelectedValue("PvP")}
                    checked={selectedValue == 'PvP'}
                    inactiveColor="cbGrey3"
                    activeColor="cbBlue"
                    size="22px"
                />
                PvP
            </Label>
        </>
    );
}