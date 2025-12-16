'use client';

import { useState } from 'react';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

import { ContentEditable } from '@/components/editor/editor-ui/content-editable';
import { ToolbarPlugin } from './plugins/toolbar-plugin';
import { FontFormatToolbarPlugin } from './plugins/font-format-toolbar-plugin';

const placeholder = 'Start typing...';

export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <div className='relative'>
      {/* toolbar plugins */}
      <ToolbarPlugin>
        {({ blockType }) => (
          <div className='vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1'>
            <FontFormatToolbarPlugin />
          </div>
        )}
      </ToolbarPlugin>

      <div className='relative'>
        <RichTextPlugin
          contentEditable={
            <div className=''>
              <div className='' ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className='ContentEditable__root relative block h-72 min-h-72 min-h-full overflow-auto px-8 py-4 focus:outline-none'
                />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* editor plugins */}
      </div>
      {/* actions plugins */}
    </div>
  );
}
