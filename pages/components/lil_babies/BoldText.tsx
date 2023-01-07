type BoldTextProps = {
    text: string
}

export default function BoldText(props: BoldTextProps) {
    return (
        <p><b>{props.text}</b></p>
    );
}
