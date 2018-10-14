import React, {Component} from 'react'
import Google from '../../containers/google';
import Authentication from './authentication'


export default class GoogleSignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            authenticationNeeded: false
        }

        this.google = new Google();
    }

    onCodeRecieved = (code) => {
        return new Promise((resolve, reject) => {
            this.google.authorizeWithCode(code)
            .then((token) => {
                this.google.storeToken(token, 'config/token.json')
                this.setState({authenticationNeeded: false})
                resolve()
            })
            .catch((err) => {
                console.error(err)
                reject();
            })
        })
    }

    componentDidMount() {
        const apis = {
            drive: {
              permission: ['file', 'appfolder'],
              version: 'v3',
            },
        }

        this.google.initializeWithToken(apis, 'config/token.json')
        .then(() => this.google.drive.listAllFolders())
        .then(res => console.log(res))
        .catch((err) => {
            console.log(err)
            this.google.initialize(apis)
            this.setState({authenticationNeeded: true})
        })
    }

    render() {
        if(this.state.authenticationNeeded){
            return <Authentication authUrl={this.google.generateAuthUrl()} onCodeReceived={this.onCodeRecieved}/>
        }
        return(
            <div>
                <p>Success!</p>
            </div>
        )
    }
}