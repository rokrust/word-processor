import DriveV3 from './drive'
import NLP from './nlp'
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


const API_OBJECTS = {
    drive: {
        v3: DriveV3
    },
    NLP : {
        v1: NLP
    }
}

export default class Google{
    constructor() {
        this.scopes = [];

        this.oauth2Client = new google.auth.OAuth2(
            config.CLIENT_ID,
            config.CLIENT_SECRET,
            config.REDIRECT_URI
        );

    }


    //Initializes the google object with a stored token
    //Returns: a promise that fails if no token is found
    //Input: 
    //  requestedApis: object containing apis to be used
    //  tokenPath: path to token json file
    initializeWithToken = (requestedApis, tokenPath) => {
        return new Promise((resolve, reject) => {
            console.log("Reading stored token")
            this._readStoredToken(tokenPath)
            .then(token => {
                console.log("File found")
                this.oauth2Client.setCredentials(token)
                console.log("Credentials set")

                this.initialize(requestedApis)
                console.log("API's loaded")

                resolve()
            })
            .catch(err => {
                console.warn(`Could not find a token at "${tokenPath}".`)
                reject(err)
            })
        })
    }


    //Set api options and create api objects
    initialize = (requestedApis) => {
        console.log("Requesting apis")
        for (let api in requestedApis){
            let apiOpts = requestedApis[api]

            if(typeof apiOpts.permission === 'string') apiOpts.permission = [apiOpts.permission]            //Turn string into array
            if(apiOpts.permission) this.scopes = apiOpts.permission.map(elem => this._createScopeURL(elem)) //add scope if it is defined

            this._setApiObject(api, apiOpts)
        }
        console.log(this.scopes)
    }


    //Returns: an url string for accessing authCode
    generateAuthUrl = () => {
        console.log(this.scopes)
        let link = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scopes.join(' '),
        });

        
        return link
    }
    
    //Authorizes the user by generating a token from the authcode
    //Returns: promise, resolve(token)
    authorizeWithCode(authCode) {
        return new Promise((resolve, reject) => {
            this.oauth2Client.getToken(authCode, (err, token) => {
                if(err) reject(err)
                else {
                    this.oauth2Client.setCredentials(token)
                    resolve(token)
                }
            })
        })    
    }


    _readStoredToken(tokenPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(tokenPath, (err, token) => {
                if(err) reject(err)
                else resolve(JSON.parse(token))
            })
        })
    }

    storeToken(token, tokenPath) {
        console.log(token)
        console.log(tokenPath)
        
        fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', tokenPath);
        });
    }

    //Sets the api member object if it is provided
    //Checks the objects provided by default if not
    //Alerts the user if no object can be found
    _setApiObject = (api, apiOpts) => {
        //Set authorization method. Oauth2 is default
        let auth = apiOpts.auth || this.oauth2Client;

        //Create the object for the given api with oauth
        let apiObj;
        if(auth !== 'service account'){
            apiObj = google[api]({version: apiOpts.version, auth})
        }
        
        //Object supplied to constructor
        if(apiOpts.object){
            this[api] = new apiOpts.object(apiObj)

        //No object supplied. Check if a default one is implemented
        } else if(API_OBJECTS[api]) {
            this[api] = new API_OBJECTS[api][apiOpts.version](apiObj)
        
        } else {
            console.error(`No support for ${api} api. Attach a constructor function to the api request.`)
        }
    }

    _createScopeURL(permission) {
        return 'https://www.googleapis.com/auth/' + permission
    }

}
