'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { FieldValues, FieldPath } from 'react-hook-form';
import { BaseFormFieldProps } from '@/types/base-form';
import { Editor } from '@/components/blocks/editor-00/editor';
import { SerializedEditorState } from 'lexical';

interface FormRichTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends BaseFormFieldProps<TFieldValues, TName> {
  placeholder?: string;
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

// Convertir el string del campo a SerializedEditorState
const parseEditorState = (value: string | undefined): SerializedEditorState => {
  if (!value || value.trim() === '') {
    return emptyEditorState;
  }
  try {
    const parsed = JSON.parse(value) as SerializedEditorState;
    // Verificar que el estado parseado tenga al menos un párrafo
    if (
      parsed?.root?.children &&
      Array.isArray(parsed.root.children) &&
      parsed.root.children.length > 0
    ) {
      return parsed;
    }
    return emptyEditorState;
  } catch {
    return emptyEditorState;
  }
};

// Componente interno que maneja el estado del editor
function RichTextEditor({
  value,
  onChange,
  disabled
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  // Estado inicial basado en el valor del campo
  const initialEditorState = useMemo(
    () => parseEditorState(value),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Estado local para el editor
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialEditorState);

  // Sincronizar cuando cambia el valor del campo externamente
  useEffect(() => {
    const parsed = parseEditorState(value);
    setEditorState(parsed);
  }, [value]);

  const handleChange = (newState: SerializedEditorState) => {
    setEditorState(newState);
    // Convertir SerializedEditorState a string JSON para guardar en la BD
    const jsonString = JSON.stringify(newState);
    onChange(jsonString);
  };

  return (
    <div className={disabled ? 'pointer-events-none opacity-50' : ''}>
      <Editor
        editorSerializedState={editorState}
        onSerializedChange={handleChange}
      />
    </div>
  );
}

function FormRichText<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  required,
  disabled,
  className
}: FormRichTextProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className='ml-1 text-red-500'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RichTextEditor
              value={field.value}
              onChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormRichText };
