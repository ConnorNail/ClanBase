import { Notification, Icon } from "atomize";

export default function WarningNotification({ children, warning, setWarning }) {
    return (
        <Notification
            bg="cbGrey1"
            textColor="cbWhite"
            isOpen={warning}
            onClose={() => setWarning(false)}
            prefix={
                <Icon
                    name="Alert"
                    color="cbRed"
                    size="18px"
                    m={{ r: "0.5rem" }}
                />
            }
        >
            {children}
        </Notification>
    )
}