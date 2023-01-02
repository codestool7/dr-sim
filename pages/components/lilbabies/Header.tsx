type HeaderProps = {
    text: string
}

export default function Header(props: HeaderProps) {
    return (
        <div className="dMainTitle">
            <h1 id="MainTitle">{props.text}</h1>
        </div>
    );
}
