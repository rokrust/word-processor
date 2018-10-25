export default class QuillIndexing {
    constructor(quillRef) {
        this.quill = quillRef
        this.seperationCharacters = [];
    }

    getAllWordRanges = () => {
        let currentWord = {index: -1, length: 0}
        let nextWord = this.getWordRange(0)
        let ranges = []
        
        while(currentWord.index !== nextWord.index) {
            if(nextWord.length !== -1) ranges.push(nextWord)
            currentWord = nextWord
            nextWord = this.getNextWordRange(currentWord.index)
        }

        return ranges
    }

    addPrevWordToSelection = (currentSelection) => {
        let firstWord = this.getWordRange(currentSelection.index)
        let end = this.getEndIndex(currentSelection)
        let lastWord = this.getWordRange(end ? end - 1 : end)

        //Set prev word based on if a whole word has been selected or not
        let nextWord = firstWord.index !== currentSelection.index ? firstWord : this.getPrevWordRange(currentSelection.index)

        if(nextWord.length === -1) nextWord = this.getSepRange(nextWord.index)

        this.quill.setSelection({
            index: nextWord.index,
            length: this.getEndIndex(lastWord) - nextWord.index
        })
    }

    addNextWordToSelection = (currentSelection) => {
        let firstWord = this.getWordRange(currentSelection.index)
        let end = this.getEndIndex(currentSelection)
        let lastWord = this.getWordRange(end)   //Handles index of 0

        if(end === this.quill.getLength() - 1) return //Text is selected all the way to the end. Exit function

        //Set nextword based on if a whole word has been selected or not
        let nextWord = end !== this.getEndIndex(lastWord) ? lastWord : this.getNextWordRange(end - 1)

        this.quill.setSelection({
            index: firstWord.index,
            length: this.getEndIndex(nextWord) - firstWord.index
        })

    }

    removeFirstWordFromSelection = (currentSelection) => {
        let secondWord = this.getNextWordRange(currentSelection.index)

        this.quill.setSelection({
            index: secondWord.index,
            length: this.getEndIndex(currentSelection) - secondWord.index
        })
    }

    removeLastWordFromSelection = (currentSelection) => {
        let lastWord = this.getWordRange(this.getEndIndex(currentSelection) - 1)
        let secondLastWord = this.getPrevWordRange(this.getEndIndex(lastWord) - 1)

        this.quill.setSelection({
            index: currentSelection.index,
            length: this.getEndIndex(secondLastWord) - currentSelection.index
        })
    }

    //Get the selection range of the closest word right of marker
    getNextWordRange(index) {
        let thisWord = this.getWordRange(index)
        for(let i = this.getEndIndex(thisWord); i < this.quill.getLength(); i++){
            var currChar = this.quill.getText(i, 1)
            
            //Next word reached
            if(!this._isSepChar(currChar)) {
                return this.getWordRange(i)
            }
        }

        //End of text
        return {index, length: this.quill.getLength() - index}//this.getWordRange(this.quill.getLength() - 1)
    }

    //Get the selection range of the closest word left of selection
    getPrevWordRange(index) {
        let thisWord = this.getWordRange(index)
        for(let i = thisWord.index - 1; i > -1; i--){
            var currChar = this.quill.getText(i, 1)

            //Prev word reached
            if(!this._isSepChar(currChar)) {
                return this.getWordRange(i)
            }
        }

        //Start of text
        return this.getWordRange(0)
    }

    //Get the end of selection as an index
    getEndIndex(range){
        return range.index + range.length
    }

    _isSepChar(char) {
        return /[^a-zA-Z0-9|^$]/.test(char) || char === ''
    }

    //Get the range of the word with a character at $index
    getWordRange(index){
        let selection = {index}

        //Find start index
        for(let i = 0; true; i++){
            let char = this.quill.getText(index-i, 1)
            if(this._isSepChar(char)){
                selection.index = index - i + 1
                break;
            }
        }

        //Find end index
        for(let i = 0; true; i++){
            let char = this.quill.getText(index+i, 1)
            if(this._isSepChar(char)){
                selection.length = index - selection.index + i
                break;
            }
        }

        return selection
    }

    //Get the selection range of a series of separation chars
    getSepRange(index) {
        let selection = {index: 0, length: 0}
        //Find start index
        for(let i = 0; i < index + 1; i++){
            let char = this.quill.getText(index-i, 1)
            if(!this._isSepChar(char)){
                selection.index = index - i + 1
                break;
            }
        }

        //Find end index
        for(let i = 0; this.quill.getLength(); i++){
            let char = this.quill.getText(index+i, 1)
            if(!this._isSepChar(char)){
                selection.length = index - selection.index + i
                break;
            }
        }

        return selection
    }

    //Selects the word at $index
    selectWordByIndex = (index) => {
        let selection = this.getWordRange(index)
        this.quill.setSelection(selection)
    }

    selectWordAtCursor = () => {
        let cursorPos = this.quill.getSelection()
        this.selectWordByIndex(cursorPos)
    }

    isCursor = (selection) => {
        if(!selection) selection = this.quill.getSelection()
        return !this.isSelection(selection)
    }

    //Check if the user has selected a piece of text or not
    isSelection = (selection) => {
        if(!selection) selection = this.quill.getSelection()
        return selection.length > 0
    }
}