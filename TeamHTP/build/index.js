import fs from 'fs';
import { startRepl } from './Repl';
import { wrap, Tag } from './Types';
import Runtime from './Runtime';
import { mdastToMd, mdToMdast } from './Markdown';
const srcPath = process.argv[2];
console.log(srcPath);
const src = fs.readFileSync(srcPath).toString();
const runtime = new Runtime();
const docTree = mdToMdast(src);
let lastTag = undefined;
for (const child of docTree.children) {
    const wrappedObject = wrap(runtime, child, lastTag);
    if (wrappedObject instanceof Tag) {
        lastTag = wrappedObject;
    }
    else {
        lastTag = undefined;
    }
}
const list = runtime.getTag('TodoList').getChild();
const updatedListItem = list.checkItem('**kick ass**');
if (updatedListItem !== undefined) {
    console.log(list.getMdastContent().position);
    console.log(mdastToMd(updatedListItem));
}
startRepl((input) => {
    console.log(input);
}).catch(console.log);
