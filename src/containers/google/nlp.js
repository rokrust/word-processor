const language = window.require('@google-cloud/language')

export default class NLP {
    constructor() {
        this.client = new language.LanguageServiceClient()
    }

    analyzeSentiment(document) {
        return this.client.analyzeSentiment({document})
    }

}