import Base from './Base'
import Function from './Function'
import {Definition} from 'mdast'

class Tag extends Base {
    private readonly members: Record<string, Function>
    private child: Base | undefined
    private rawMd: string

    constructor(mdastContent: Definition, rawMd: string, tag?: Tag) {
        super(mdastContent, tag);
        this.child = undefined
        this.rawMd = rawMd
        this.members = {}
    }

    setChild(child: Base) {
        this.child = child
    }

    getChild(): Base | undefined {
        return this.child
    }

    getMdastContent(): Definition {
        return <Definition>this.mdastContent
    }

    isMemberDefined(memberName: string): boolean {
        return this.members[memberName] !== undefined
    }

    getMember(memberName: string): Function {
        return this.members[memberName]
    }

    addMember(memberName:string, memberFunction: Function): void {
        this.members[memberName] = memberFunction
    }

    getRawMd(): string {
        return this.rawMd
    }
}

export default Tag;
