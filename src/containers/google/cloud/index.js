//import {language} from '@google-cloud/language'
const language = window.require('@google-cloud/language');

const API_OBJECTS = {
    nlp: {
        v1: language.LanguageServiceClient
    },
}

export default class GoogleCloud{
    constructor() {
        this.scopes = [];
    }

    //Set api options and create api objects
    initialize = (requestedApis) => {
        for (let api in requestedApis){
            let apiOpts = requestedApis[api]

            if(typeof apiOpts.permission === 'string') apiOpts.permission = [apiOpts.permission]            //Turn string into array
            if(apiOpts.permission) this.scopes = apiOpts.permission.map(elem => this._createScopeURL(elem)) //add scope if it is defined

            this._setApiObject(api, apiOpts)
        }
    }
    
    //Sets the api member object if it is provided
    //Checks the objects provided by default if not
    //Alerts the user if no object can be found
    _setApiObject = (api, apiOpts) => {
        
        //Object supplied to constructor
        if(apiOpts.object){
            this[api] = new apiOpts.object()

        //No object supplied. Check if a default one is implemented
        } else if(API_OBJECTS[api]) {
            this[api] = new API_OBJECTS[api][apiOpts.version]()
        
        } else {
            console.error(`No support for ${api} api. Attach a constructor function to the api request.`)
        }
    }

    _createScopeURL(permission) {
        return 'https://www.googleapis.com/auth/' + permission
    }

}