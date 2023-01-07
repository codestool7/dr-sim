import Queen from "../../classes/competitors/Queen";

type QueenStatRowProps = {
    queen: Queen
}

export default function QueenStatRow(props: QueenStatRowProps) {
    return (
        <tr>
            <td>{props.queen.name}</td>
            <td>{props.queen.actingStat}</td>
            <td>{props.queen.comedyStat}</td>
            <td>{props.queen.danceStat}</td>
            <td>{props.queen.designStat}</td>
            <td>{props.queen.improvStat}</td>
            <td>{props.queen.runwayStat}</td>
            <td>{props.queen.lipsyncStat}</td>
            <td>{props.queen.totalStat}</td>
        </tr>
    );
}
