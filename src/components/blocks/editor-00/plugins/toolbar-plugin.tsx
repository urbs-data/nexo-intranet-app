'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useEffect, useState, ReactNode } from 'react';

interface ToolbarPluginProps {
  children: (props: { blockType: string }) => ReactNode;
}

export function ToolbarPlugin({ children }: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState('paragraph');

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          const element =
            anchorNode.getKey() === 'root'
              ? anchorNode
              : anchorNode.getTopLevelElementOrThrow();
          const elementKey = element.getKey();
          const elementDOM = editor.getElementByKey(elementKey);
          if (elementDOM !== null) {
            const type = element.getType();
            setBlockType(type);
          }
        }
      });
    });
  }, [editor]);

  return <>{children({ blockType })}</>;
}
