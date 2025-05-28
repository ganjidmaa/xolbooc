import { Popover } from "react-bootstrap"

export const popOverlay = (text: string) => {
    return (
        <Popover id="popover-basic">
            <Popover.Body>
                <span>{text}</span>
            </Popover.Body>
        </Popover>
    )
}