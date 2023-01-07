type NormalTextProps = {
    text: string
}

export default function NormalText(props: NormalTextProps) {
    return (
        <p>{props.text}</p>
    );
}
