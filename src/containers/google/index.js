import Drive from './drive'

var config = require('../../config')

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

        for (let api in requestedApis){
            let apiOpts = requestedApis[api]

            this.scopes += this._createScopeURL(api, apiOpts.permission) + ' '
            this.apiURLs.push(this._createApiDiscoveryUrl(api, apiOpts.version))
            this._setApiObject(api, apiOpts.object)
        }
        
        this.scopes = this.scopes.slice(0, -1)
    }   

    initialize = () => {
        window.gapi.load('client:auth2', () => {
            if (!window.gapi.auth2.getAuthInstance()) {
                window.gapi.auth2.init({
                    scope: this.scopes,
                    client_id: config.CLIENT_ID
                })
                .then(res => {
                    this.google = res
                    this._initClient()
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
            apiKey: config.API_KEY,
            discoveryDocs: this.apiURLs,
            clientId: config.CLIENT_ID,
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
