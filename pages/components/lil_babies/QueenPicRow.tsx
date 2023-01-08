import Queen from "../../classes/competitors/Queen";
import QueenPic from "./QueenPic";

type QueenPicRowProps = {
    queens: Array<Queen>,
    color?: string
}

export default function QueenPicRow(props: QueenPicRowProps) {
    return (
        <div>
            {props.queens.map(queen => (
                <QueenPic queen={queen} key={queen.name + ' queen pic row queen pic'} color={props.color}/>
            ))}
        </div>
    );
}
