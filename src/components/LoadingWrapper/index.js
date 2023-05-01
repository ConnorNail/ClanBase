import { Div, Icon } from "atomize";

export default function LoadingWrapper({
    children,
    isLoading,
    iconName = "Loading3",
    size = "20px",
    color = "cbGrey2",
    d = "block",
    justify="center",
    p="0"
}) {
    return (
        <>
            {isLoading ? (
                <Div d={d} justify={justify} p={p}>
                    <Icon name={iconName} size={size} color={color} />
                </Div>
            ) : (
                children
            )}
        </>
    );
}