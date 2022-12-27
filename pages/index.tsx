import { useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import Result from './components/Result';
import ToTop from './components/ToTop';

export default function HomePage() {
    return (
        <div>
            <Header />
            <Body />
            <Result />
            <ToTop />
        </div>
    );
}