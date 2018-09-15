//Ordne credentials
    //https://console.developers.google.com/apis/credentials/wizard?project=genetic-image-segmentation
//Google permission scope
    //https://developers.google.com/drive/api/v2/about-auth
//API documentation
    //https://developers.google.com/identity/sign-in/web/reference#googleauthsignin
//Have to run <script src='https://apis.google.com/js/client:platform.js' />

//https://hackernoon.com/tutorial-how-to-make-http-requests-in-react-part-1-f7afa3cd0cc8

const CLIENT_ID = "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com"
const CLIENT_SECRET = "HGl021T_LJQv23jZwX1gOghy"
const API_KEY = 'AIzaSyDfCxUs9LGP7ZHJJQBRo5ac2NdGgMuqvQg';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';


export default class GoogleLogin{
  constructor() {
    this.google = undefined
  }

    initialize = (options) => {
        window.gapi.load('auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init(options)
                .then(res => {
                    if (res.isSignedIn.get()) {
                        this.handleSigninSuccess(res.currentUser.get())
                    }
                }, 
                err => alert(err))
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
            auth2.disconnect()
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