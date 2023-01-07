type BigTextProps = {
    text: string,
    noBreak?: boolean
}

export default function BigText(props: BigTextProps) {
    if (props.noBreak) {
        return <big>{props.text}</big>;
    } else {
        return <p><big>{props.text}</big></p>;
    }
}
