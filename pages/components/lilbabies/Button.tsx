type ButtonProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    hide?: boolean
}

export default function Button(props: ButtonProps) {
    if (props.hide) {
        return null;
    } else {
        return <button onClick={props.onClick}>{props.text}</button>;
    }
}
