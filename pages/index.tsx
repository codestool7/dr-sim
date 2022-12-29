import React from 'react';
import Sim from './components/Sim';
import Result from './components/Result';
import ToTop from './components/ToTop';

export default class Index extends React.Component {
    render() {
        return (
            <div>
                <Sim />
                <Result />
                <ToTop />
            </div>
        );
    }
}
