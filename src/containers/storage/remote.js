import React, {Component} from 'react';
import PropTypes from 'prop-types'
const fs = require('fs');



//Hvorfor gapi 
    //https://github.com/google/google-api-nodejs-client/issues/1027
    //https://stackoverflow.com/questions/48800491/error-using-create-react-app-with-googleapis

//Ordne credentials
    //https://console.developers.google.com/apis/credentials/wizard?project=genetic-image-segmentation

//Google permission scope
    //https://developers.google.com/drive/api/v2/about-auth
const CLIENT_ID = "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com"
const CLIENT_SECRET = "HGl021T_LJQv23jZwX1gOghy"
const API_KEY = 'AIzaSyDfCxUs9LGP7ZHJJQBRo5ac2NdGgMuqvQg';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
//Have to run <script src='https://apis.google.com/js/client:platform.js' />



export default class GoogleLogin extends Component {
  constructor(props) {
    super(props)    
    this.google = undefined

  }

    componentDidMount() {
        /*const {
            clientId,
            cookiePolicy,
            loginHint,
            hostedDomain,
            isSignedIn,
            fetchBasicProfile,
            redirectUri,
            discoveryDocs,
            onFailure,
            uxMode,
            scope,
            accessType,
            responseType,
            jsSrc
        } = this.props;*/

        /*this.params = {
            client_id: this.props.clientId,
            cookie_policy: this.props.cookiePolicy,
            login_hint: this.props.loginHint,
            hosted_domain: this.props.hostedDomain,
            fetch_basic_profile: this.props.fetchBasicProfile,
            ux_mode: this.props.uxMode,
            redirect_uri: this.props.redirectUri,
            scope: this.props.scope,
            access_type: this.props.accessType
        }
        console.log(window)*/
        this.loadOauth2();
    }

    loadOauth2 = (options) => {
        console.log(window)
        window.gapi.load('auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init(options)
                .then(res => {
                    if (res.isSignedIn.get()) {
                        this.handleSigninSuccess(res.currentUser.get())
                    }
                    //this.signIn()
                }, 
                err => this.props.onFailure(err))
            }                
        })
    }
  
    signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn().then(res => this.handleSigninSuccess(res), err => alert(err))
    }

    signInOffline = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.grantOfflineAccess().then(res => this.google = res, err => alert(err))
    }

    signOut() {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
          auth2.signOut().then(() => console.log("Logged out of google"))
        }
        else { console.log("Auth not defined") }
    }

    handleSigninSuccess(res) {
        const basicProfile = res.getBasicProfile()
        const authResponse = res.getAuthResponse()
        res.googleId = basicProfile.getId()
        res.tokenObj = authResponse
        res.tokenId = authResponse.id_token
        res.accessToken = authResponse.access_token
        res.profileObj = {
            googleId: basicProfile.getId(),
            imageUrl: basicProfile.getImageUrl(),
            email: basicProfile.getEmail(),
            name: basicProfile.getName(),
            givenName: basicProfile.getGivenName(),
            familyName: basicProfile.getFamilyName()
        }
        
        this.google = res
    }
}

GoogleLogin.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onFailure: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    scope: PropTypes.string,
    className: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string,
    loginHint: PropTypes.string,
    hostedDomain: PropTypes.string,
    fetchBasicProfile: PropTypes.bool,
    prompt: PropTypes.string,
    tag: PropTypes.string,
    autoLoad: PropTypes.bool,
    disabled: PropTypes.bool,
    discoveryDocs: PropTypes.array,
    uxMode: PropTypes.string,
    isSignedIn: PropTypes.bool,
    responseType: PropTypes.string,
    type: PropTypes.string,
    accessType: PropTypes.string,
}

GoogleLogin.defaultProps = {
    type: 'button',
    tag: 'button',
    scope: 'profile email',
    accessType: 'online',
    prompt: '',
    cookiePolicy: 'single_host_origin',
    fetchBasicProfile: true,
    isSignedIn: false,
    uxMode: 'popup',
}