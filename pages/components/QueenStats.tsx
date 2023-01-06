import React from 'react';
import Queen from '../classes/Queen';
import { sortQueensByAttribute, sortQueensByAttributeReverse, sortQueensByName, sortQueensByNameReverse } from '../utils/utils';
import Header from './lilbabies/Header';
import QueenStatRow from './lilbabies/QueenStatRow';

type QueenStatsProps = {
    queens: Array<Queen>
}

type QueenStatsState = {
    queens: Array<Queen>,
    sortBy: string,
    sortDesc: boolean
}

export default class QueenStats extends React.Component<QueenStatsProps, QueenStatsState> {
    constructor(props: QueenStatsProps) {
        super(props);
        this.state = {queens: props.queens, sortBy: "name", sortDesc: true};
    }

    sortQueens = (attribute: string) => {
        let queens = this.state.queens;
        let sortBy = this.state.sortBy;
        let sortDesc = this.state.sortDesc;
        if (attribute == sortBy) {
            sortDesc = !sortDesc;
        } else {
            sortBy = attribute;
            sortDesc = true;
        }
        if (sortBy == 'name') {
            if (sortDesc) {
                queens = sortQueensByName(queens);
            } else {
                queens = sortQueensByNameReverse(queens);
            }
        } else {
            if (sortDesc) {
                queens = sortQueensByAttribute(queens, sortBy);
            } else {
                queens = sortQueensByAttributeReverse(queens, sortBy);
            }
        }
        this.setState({queens: queens, sortBy: sortBy, sortDesc: sortDesc});
    }

    render() {
        return <div>
            <Header
                text="Queen Stats"
            />
            <div className="mainPart" id="MainBlock">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => this.sortQueens("name")}>Name</th>
                            <th onClick={() => this.sortQueens("actingStat")}>Acting</th>
                            <th onClick={() => this.sortQueens("comedyStat")}>Comedy</th>
                            <th onClick={() => this.sortQueens("danceStat")}>Dance</th>
                            <th onClick={() => this.sortQueens("designStat")}>Design</th>
                            <th onClick={() => this.sortQueens("improvStat")}>Improv</th>
                            <th onClick={() => this.sortQueens("runwayStat")}>Runway</th>
                            <th onClick={() => this.sortQueens("lipsyncStat")}>Lipsync</th>
                            <th onClick={() => this.sortQueens("totalStat")}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.queens.map(queen => (
                            <QueenStatRow queen={queen} key={queen.getName()}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>;
    }
}
