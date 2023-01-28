import { Checkbox, Label, Div } from "atomize";

export default function CustomCheckbox({ children, toggleState, setToggleState }) {
    return (
        <Label align="center" textColor="cbWhite" textSize="subheader">
            <Div d="flex" align="center" m="0.5rem" style={{ lineHeight: "normal" }}>
                <Checkbox
                    activeColor="cbBlue"
                    inactiveColor="cbGrey1"
                    m={{ r: "0.75rem" }}
                    size="23px"
                    onChange={() => setToggleState((curentState) => !curentState)}
                    checked={toggleState}
                />
                {children}
            </Div>
        </Label>
    )
}