import Drive from './drive'

const CLIENT_ID = "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com"
const CLIENT_SECRET = "HGl021T_LJQv23jZwX1gOghy"
const API_KEY = 'AIzaSyDfCxUs9LGP7ZHJJQBRo5ac2NdGgMuqvQg';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';


export default class Google{
    constructor() {
        this.google = undefined
        this.drive = new Drive()
    }

    initialize = (options) => {
        window.gapi.load('auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init(options)
                .then(res => {
                    if (res.isSignedIn.get()) {
                        this.handleSigninSuccess(res.currentUser.get())
                    }
                    this.signIn()
                    window.gapi.load('client', () => {})
                }, 
                err => alert(err))
            }                
        })

        /*window.gapi.load('drive', 'v2', () => {
            console.log("Drive loaded")
            console.log(window.gapi.client)
            this.drive.listFiles();
        })*/

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
