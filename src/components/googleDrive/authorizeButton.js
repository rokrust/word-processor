import GoogleLogin from 'react-google-login';
import React, {Component} from 'react'

const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';

export default class GoogleDriveAuthorizeButton extends Component {
    constructor(props){
        super(props);

        this.clientId = "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com";
        this.clientSecret = "HGl021T_LJQv23jZwX1gOghy";
        this.apiKey = 'AIzaSyDfCxUs9LGP7ZHJJQBRo5ac2NdGgMuqvQg';
    }


    renderAuthorizeButton = (onClick) => {
        return (
            <button onClick={onClick.onClick} style={this.props.style}>
                Authorize drive
            </button>
        );
    }

    onSuccess = (response) => {
        console.log(response.googleId)
        console.log(response.tokenId)
        console.log(response.accessToken)
        console.log(response.tokenObj)
        console.log(response.profileObj)
    }

    onFailure = (response) => { alert("Authorization failed", response)}
      
    upload = async (file) => {
        await this.drive.files.create({
            requestBody: {
                name: 'Test',
                mimeType: 'text/plain'
            },
            media: {
                mimeType: 'text/plain',
                body: 'text/plain'
            }
        })
    }

    download = () => {}

    render() {
        return (
            <GoogleLogin 
                clientId={this.clientId}
                buttonText="Authorize google drive"
                onSuccess={this.onSuccess} 
                onFailure={this.onFailure}
                scope={DRIVE_SCOPE}
                render={this.renderAuthorizeButton}
            />
        )
    }
}