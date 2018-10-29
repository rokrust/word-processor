import React, {Component} from 'react'
import Editor from './../../components/editor'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default class Main extends Component{
    constructor(){
        super()    
    }

    render() {
        return (
            <MainWrapper>
                <Link to="/googleSignIn" >
                    <button>
                        Google
                    </button>
                </Link>
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
