import { Quill } from 'react-quill'
let Inline = Quill.import('blots/inline')

/*class Base extends Inline() {
    constructor(name, attributes, listeners){
        super()
        this.name = name

        this.node = super.create()
        node.setAttribute()
    }
    
    static create(path, ) {
        let node = super.create()

        for(let i = 0; i < arguments.length() - 1; i++){
            node.setAttribute()
        }

        node.addEventListener('click', e => console.log("Clicked text"))
        node.addEventListener('contextmenu', e => console.log("Right clicked text"))
        node.addEventListener('mouseover', e => console.log("Mouseover text"))
        return node
    }

    static formats(node) {
        return node.getAttribute(this.name)
    }

    format(name, value) {
        if (name === this.name && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
      }
}
Clickable.blotName = 'clickable'
Clickable.tagName = 'clk'
*/


class Clickable extends Inline {
    static create(path, ) {
        let node = super.create()

        node.setAttribute('path', path)
        node.addEventListener('click', e => console.log("Clicked text"))
        node.addEventListener('contextmenu', e => console.log("Right clicked text"))
        node.addEventListener('mouseover', e => console.log("Mouseover text"))
        return node
    }

    static formats(node) {
        return node.getAttribute('clickable')
    }

    format(name, value) {
        if (name === 'clickable' && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
      }
}
Clickable.blotName = 'clickable'
Clickable.tagName = 'clk'

class LeftClickable extends Inline {
    static create(path, ) {
        let node = super.create()

        node.setAttribute('path', path)
        node.addEventListener('click', e => console.log("Clicked text"))
        return node
    }

    static formats(node) {
        return node.getAttribute('left-clickable')
    }

    format(name, value) {
        if (name === 'left-clickable' && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
      }
}
LeftClickable.blotName = 'left-clickable'
LeftClickable.tagName = 'lclk'

class RightClickable extends Inline {
    static create(path, ) {
        let node = super.create()

        node.setAttribute('path', path)
        node.addEventListener('contextmenu', e => console.log("Clicked text"))
        return node
    }

    static formats(node) {
        return node.getAttribute('right-clickable')
    }

    format(name, value) {
        if (name === 'right-clickable' && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
      }
}
RightClickable.blotName = 'right-clickable'
RightClickable.tagName = 'rclk'

class Hoverable extends Inline {
    static create(path, ) {
        let node = super.create()

        node.setAttribute('path', path)
        node.addEventListener('mouseover', e => console.log("Clicked text"))
        return node
    }

    static formats(node) {
        return node.getAttribute('hoverable')
    }

    format(name, value) {
        if (name === 'hoverable' && value) {
            this.domNode.setAttribute('path', value);
        } else {
            super.format(name, value);
        }
    }
    
    formats() {
        let formats = super.formats();
        formats['path'] = Clickable.formats(this.domNode);
        return formats;
    }
}
Hoverable.blotName = 'hoverable'
Hoverable.tagName = 'hov'

export { LeftClickable, RightClickable, Hoverable }
export default Clickable