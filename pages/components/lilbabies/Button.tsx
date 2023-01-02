type ButtonProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: ButtonProps) {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    );
}
