import { Checkbox, Label } from "atomize";

export default function CustomCheckbox({ children, toggleState, setToggleState }) {

    return (
        <Label align="center" textColor="cbWhite" textSize="subheader" m={{ b: "0.5rem" }}>
            <Checkbox
                activeColor="cbBlue"
                inactiveColor="cbGrey1"
                size="25px"
                onChange={() => setToggleState(!toggleState)}
                checked={toggleState}
            />
            {children}
        </Label>
    )
}