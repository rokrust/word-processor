import React, {Component} from 'react'
import Editor from './../../components/editor'
import styled from 'styled-components'

export default class Main extends Component{
    constructor(){
        super()    
    }

    render() {
        return (
            <MainWrapper>
                <Editor/>
            </MainWrapper>
        );
    }
}

const MainWrapper = styled.div`
    position: absolute; 
    height: 100%; 
    width: 100%;
`;
