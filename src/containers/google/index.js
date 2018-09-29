import Drive from './drive'
//import { OAuth2Client } from 'google-auth-library';
//var config = require('../../config')
//const readline = window.require('readline')
const fs = window.require('fs')
const config = window.require('dotenv').config().parsed
const {google} = window.require('googleapis')

//List of scopes
    //https://developers.google.com/identity/protocols/googlescopes
//Discovery URI
    //https://developers.google.com/discovery/v1/reference/


const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'

const API_OBJECTS = {
    drive: Drive
}

export default class Google{
    constructor(requestedApis) {
        this.apiURLs = [];
        this.scopes = [];
        this.token_path = "config/token.json";
        
        for (let api in requestedApis){
            let apiOpts = requestedApis[api]

            this.scopes.push(this._createScopeURL(api, apiOpts.permission))
            this.apiURLs.push(this._createApiDiscoveryUrl(api, apiOpts.version))
            this._setApiObject(api, apiOpts.object, this.oauth2Client)
        }
        this.scopes = this.scopes.join(' ')


        this.oauth2Client = new google.auth.OAuth2(
            config.CLIENT_ID,
            config.CLIENT_SECRET,
            config.REDIRECT_URI
        );
    }   

    initialize = () => {
        console.log(this.generateAuthUrl())
    }

    _authorize(credentials, callback) {
        /*const {client_secret, client_id, redirect_uris} = credentials.installed;

        this.oAuth2Client.setCredentials(JSON.parse(token));
        callback(this.OAuth2Client)*/
    }

    generateAuthUrl() {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes,
        });
    }
    
    setCredentials(code) {
        //return new Promise(
            //(resolve, reject) => {
            this.oauth2Client.getToken(code, (err, token) => {
                if(err) return console.error('Error retrieving access token', err)
                this.oauth2Client.setCredentials(token)
                console.log(token)
                //resolve(token)
                this.listFiles()
            })
        //})    
    }

    _storeToken(token) {
        fs.writeFile(this.token_path, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', this.token_path);
        });
    }
    
    //Sets the api member object if it is provided
    //Checks the objects provided by default if not
    //Alerts the user if no object can be found
    _setApiObject = (api, apiObject, auth) => {
        if(apiObject){
            this[api] = new apiObject(auth)
            return
        } else if(API_OBJECTS[api]) {
            this[api] = new API_OBJECTS[api](auth)
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

    listFiles() {
        const drive = google.drive({version: 'v3', auth: this.oauth2Client});
        drive.files.list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const files = res.data.files;
            if (files.length) {
                console.log('Files:');
                files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
            } else {
                console.log('No files found.');
            }
        });
    }

    _createApiDiscoveryUrl(api, version) {
        return 'https://www.googleapis.com/discovery/v1/apis/' + api + '/' + version + '/rest'
    }

    _createScopeURL(api, permission) {
        let scopeLink = 'https://www.googleapis.com/auth/' + api
        return permission ? scopeLink + '.' + permission : scopeLink
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
