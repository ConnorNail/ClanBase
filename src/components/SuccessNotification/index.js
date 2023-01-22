import { Notification, Icon } from "atomize";

export default function SuccessNotification({ children, success, setSuccess }) {
    return (
        <Notification
            bg="cbGrey1"
            textColor="cbWhite"
            isOpen={success}
            onClose={() => setSuccess(false)}
            prefix={
                <Icon
                    name="Success"
                    color="cbGreen"
                    size="18px"
                    m={{ r: "0.5rem" }}
                />
            }
        >
            {children}
        </Notification>
    )
}