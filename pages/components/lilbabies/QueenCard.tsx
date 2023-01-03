import Queen from "../../classes/Queen";
import Button from "./Button";
import QueenPic from "./QueenPic";

type QueenCardProps = {
    queen: Queen,
    //onClick: React.MouseEventHandler<HTMLButtonElement>,
    //showX?: boolean
}

// TODO can we combine onclick and show to just show x button if onclick is passed in?
export default function QueenCard(props: QueenCardProps) {
    return (
        <div className="card">
            <div className="data-image">
                <QueenPic queen={props.queen} color="black"/>
            </div>
            <div className="data-header">{props.queen.getName()}</div>
            {/*<Button className="data-body" text="X" onClick={props.onClick} hide={!props.showX} />*/}
        </div>
    );
}
