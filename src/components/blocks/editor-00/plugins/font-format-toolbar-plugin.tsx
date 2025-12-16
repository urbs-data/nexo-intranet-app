'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Strikethrough, Code } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export function FontFormatToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat('bold'));
          setIsItalic(selection.hasFormat('italic'));
          setIsUnderline(selection.hasFormat('underline'));
          setIsStrikethrough(selection.hasFormat('strikethrough'));
          setIsCode(selection.hasFormat('code'));
        }
      });
    });
  }, [editor]);

  const formatText = (
    format: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code'
  ) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  return (
    <TooltipProvider>
      <div className='flex items-center gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant={isBold ? 'secondary' : 'ghost'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => formatText('bold')}
            >
              <Bold className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Negrita</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant={isItalic ? 'secondary' : 'ghost'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => formatText('italic')}
            >
              <Italic className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cursiva</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant={isUnderline ? 'secondary' : 'ghost'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => formatText('underline')}
            >
              <Underline className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Subrayado</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant={isStrikethrough ? 'secondary' : 'ghost'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => formatText('strikethrough')}
            >
              <Strikethrough className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tachado</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              variant={isCode ? 'secondary' : 'ghost'}
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => formatText('code')}
            >
              <Code className='h-4 w-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Código</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
