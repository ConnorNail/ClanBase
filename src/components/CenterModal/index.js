// Aligned Centered
import { Div, Button, Modal, Icon, Text } from "atomize";

export default function CenterModal({ children, isOpen, onClose, onSubmit }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} align="center" rounded="md" bg="cbGrey1">
            <Icon
                name="Cross"
                pos="absolute"
                top="1rem"
                right="1rem"
                size="16px"
                color="cbGrey3"
                onClick={onClose}
                cursor="pointer"
            />
            <Div d="flex" m={{ b: "4rem" }}>
                <Icon
                    name="AlertSolid"
                    color="cbBlue"
                    m={{ t: "0.35rem", r: "0.5rem" }}
                />
                <Text p={{ l: "0.5rem", t: "0.25rem" }} textSize="subheader" textColor="cbGrey3">
                    {children}
                </Text>
            </Div>
            <Div d="flex" justify="flex-end">
                <Button
                    onClick={onClose}
                    bg="cbGrey3"
                    textColor="cbGrey1"
                    m={{ r: "1rem" }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onSubmit}
                    bg="cbBlue"
                    textColor="cbGrey1"
                >
                    Yes, Submit
                </Button>
            </Div>
        </Modal>
    );
}