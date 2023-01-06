import Queen from "../../classes/Queen";

type QueenStatRowProps = {
    queen: Queen
}

export default function QueenStatRow(props: QueenStatRowProps) {
    return (
        <tr>
            <td>{props.queen.getName()}</td>
            <td>{props.queen.getActingStat()}</td>
            <td>{props.queen.getComedyStat()}</td>
            <td>{props.queen.getDanceStat()}</td>
            <td>{props.queen.getDesignStat()}</td>
            <td>{props.queen.getImprovStat()}</td>
            <td>{props.queen.getRunwayStat()}</td>
            <td>{props.queen.getLipSyncStat()}</td>
        </tr>
    );
}
