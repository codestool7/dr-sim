import Queen from "../../classes/Queen";
import Button from "./Button";
import QueenPic from "./QueenPic";

type QueenCardProps = {
    queen: Queen,
    onSelect?: React.MouseEventHandler<HTMLDivElement>,
    onRemove?: React.MouseEventHandler<HTMLButtonElement>
}

// if onSelect is passed in we call that if clicked anywhere on the card and don't render X button
// if onRemove is passed in we render X button and call it if X is clicked
// should only have one!
export default function QueenCard(props: QueenCardProps) {
    return (
        <div className="card" onClick={props.onSelect}>
            <div>
                <QueenPic queen={props.queen} color="black"/>
            </div>
            <div>{props.queen.getName()}</div>
            {props.onRemove && <Button text="X" onClick={props.onRemove} />}
        </div>
    );
}
