import { useEffect, useState } from "react";
// import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import MDData from './mdData'
export default function App() {
    // Stores the current Markdown content.
    const [markdown, setMarkdown] = useState(MDData);

    // Creates a new editor instance.
    const editor = useBlockNote({
        // Makes the editor non-editable.
        editable: true
    })

    useEffect(() => {
        if (editor) {
            // Whenever the current Markdown content changes, converts it to an array
            // of Block objects and replaces the editor's content with them.
            const getBlocks = async () => {
                const blocks = await editor.markdownToBlocks(markdown);
                editor.replaceBlocks(editor.topLevelBlocks, blocks);
            };
            getBlocks();
        }
    }, [editor, markdown]);

    useEffect(() => {
        if (editor) {
            // Whenever the editor's content changes, converts it to Markdown and
            // updates the current Markdown content.
            const getMarkdown = async () => {
                const markdown = await editor.blocksToMarkdown(
                    editor.topLevelBlocks
                );
                console.log(markdown)
                // setMarkdown(markdown); save updated markdown to  state setMarkdown(markdown)
            };
            getMarkdown();
        }
    })

    // Renders a text area for you to write/paste Markdown in, and the editor
    // instance below, which displays the current Markdown as blocks.
    return (
        <div>

            <BlockNoteView editor={editor} />
        </div>
    );
}