type TabProps = {
    text: string,
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export default function Tab(props: TabProps) {
    return (
        <div className="tab" onClick={props.onClick}>
            {props.text}
        </div>
    );
}
