'use client';

import { useMemo } from 'react';
import { Editor } from '@/components/blocks/editor-00/editor';
import { SerializedEditorState } from 'lexical';
import { cn } from '@/lib/utils';

interface FormRichTextReadonlyProps {
  value?: string | null;
  className?: string;
}

// Valor inicial vacío para el editor (debe tener al menos un párrafo)
const emptyEditorState: SerializedEditorState = {
  root: {
    children: [
      {
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1
      }
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1
  }
} as unknown as SerializedEditorState;

export function FormRichTextReadonly({
  value,
  className
}: FormRichTextReadonlyProps) {
  // Convertir el string del campo a SerializedEditorState
  const editorState = useMemo((): SerializedEditorState => {
    if (!value || value.trim() === '') {
      return emptyEditorState;
    }
    try {
      return JSON.parse(value) as SerializedEditorState;
    } catch {
      return emptyEditorState;
    }
  }, [value]);

  if (!value || value.trim() === '') {
    return (
      <div
        className={cn(
          'bg-muted/50 text-muted-foreground rounded-md border px-3 py-2 text-sm',
          className
        )}
      >
        -
      </div>
    );
  }

  return (
    <div className={cn('select-text', className)}>
      <div className='pointer-events-none opacity-20 [&_*]:pointer-events-none'>
        <Editor editorSerializedState={editorState} />
      </div>
    </div>
  );
}
