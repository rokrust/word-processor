import Drive from './drive'

const CLIENT_ID = "774881068724-a2n55qo2us5dmvt9621demginbgbbii7.apps.googleusercontent.com"
const API_KEY = 'AIzaSyDfCxUs9LGP7ZHJJQBRo5ac2NdGgMuqvQg';
//const CLIENT_SECRET = "HGl021T_LJQv23jZwX1gOghy"


//List of scopes
    //https://developers.google.com/identity/protocols/googlescopes
//Discovery URI
    //https://developers.google.com/discovery/v1/reference/

const API_OBJECTS = {
    drive: Drive
}

export default class Google{
    constructor(requestedApis) {
        this.apiURLs = [];
        this.scopes = ""

        for (let key in requestedApis){
            let currentApi = requestedApis[key]

            this.scopes += this._createScopeURL(key, currentApi.permission) + ' '
            this.apiURLs.push(this._createApiDiscoveryUrl(key, currentApi.version))
            this._setApiObject(key, currentApi.object)
        }
        
        this.scopes = this.scopes.slice(0, -1)
    }   

    initialize = () => {
        window.gapi.load('client:auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({
                    scope: this.scopes,
                    client_id: CLIENT_ID
                })
                .then(res => {
                    this.google = res
                    this._initClient().then(() => this.drive.listFiles())        
                }, 
                err => alert(err))
            }                
        })
    }

    _createApiDiscoveryUrl(api, version) {
        return 'https://www.googleapis.com/discovery/v1/apis/' + api + '/' + version + '/rest'
    }

    _createScopeURL(api, permission) {
        let scopeLink = 'https://www.googleapis.com/auth/' + api
        return permission ? scopeLink + '.' + permission : scopeLink
    }
    
    //Sets the api member object if it is provided
    //Checks the objects provided by default if not
    //Alerts the user if no object can be found
    _setApiObject = (api, apiObject) => {
        if(apiObject){
            this[api] = new apiObject()
            return
        } else if(API_OBJECTS[api]) {
            this[api] = new API_OBJECTS[api]()
        } else {
            alert("No object attached to api " + api)
        }
    }

    _initClient() {
        return window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: this.apiURLs,
            clientId: CLIENT_ID,
            scope: this.scopes
        })
    }

    signIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn()
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
}
