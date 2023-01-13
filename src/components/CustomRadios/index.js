// Styling Radiobox
import { Checkbox, Label } from "atomize";
import React, { useState } from 'react';

export default function CustomRadios({selectedValuePvE, setSelectedValuePvE, selectedValuePvP, setSelectedValuePvP}) {
    return (
        <>
            <Label textColor="cbWhite" p= "0.25rem" >
                <Checkbox
                    onChange={() => setSelectedValuePvE(!selectedValuePvE)}
                    checked={selectedValuePvE === true}
                    inactiveColor="cbGrey3"
                    activeColor="cbBlue"
                    size="22px"
                />
                PvE
            </Label>
            <Label textColor="cbWhite" p= "0.25rem" >
                <Checkbox
                    onChange={() => setSelectedValuePvP(!selectedValuePvP)}
                    checked={selectedValuePvP === true}
                    inactiveColor="cbGrey3"
                    activeColor="cbBlue"
                    size="22px"
                />
                PvP
            </Label>
        </>
    );
}