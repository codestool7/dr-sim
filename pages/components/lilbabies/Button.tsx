type ButtonProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    className?: string,
    hide?: boolean
}

export default function Button(props: ButtonProps) {
    if (props.hide) {
        return null;
    } else {
        return <button onClick={props.onClick} className={props.className}>{props.text}</button>;
    }
}
