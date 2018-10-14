import React, {Component} from 'react'
import styled from 'styled-components'

export default class Authentication extends Component {
    constructor(props) {
        super(props);
    }

    //Link click handler
    onClick = () => {
        this.authWindow = window.open(this.props.authUrl)
    }

    onCodePasted = (event) => {
        let code = event.target.value;
        console.log(code)
        this.props.onCodeReceived(code)
        .then(this.authWindow.close)
    }

    render(){
        return(
            <div>
                <AuthText>
                    Authentication needed. 
                    Please click this <AuthLink onClick={this.onClick}>link</AuthLink>
                </AuthText><br/>
                <AuthText>
                    Then paste it in here<input onChange={this.onCodePasted} style={{marginLeft: "0.5em"}}/>
                </AuthText>
            </div>
        )
    }
}

const AuthText = styled.p`
    display: inline;
`;

const AuthLink = styled.a`
    cursor: pointer;
    color: blue;
    text-decoration: underline;
`;