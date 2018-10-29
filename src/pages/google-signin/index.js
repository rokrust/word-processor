import React, {Component} from 'react'
import Google from '../../containers/google';
import Authentication from './authentication'
const language = window.require('@google-cloud/language')



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
              permission: ['drive.file', 'drive.appfolder'],
              version: 'v3',
            },
            nlp: {
                
                permission: 'cloud-language',
                version: 'v1',
                object: language.LanguageServiceClient,
                auth: 'service account'
            }
        }
        this.google.initializeWithToken(apis, 'config/token.json')
        .then(res => console.log(res))
        .catch((err) => {
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