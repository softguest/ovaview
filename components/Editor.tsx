// components/Editor.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData, API } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './tools/Tool';

interface EditorProps {
  data: OutputData | null;
  onChange: (data: OutputData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = 'editorjs-container';

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holderId,
        data: data ?? { blocks: [] },
        autofocus: true,
        tools: EDITOR_JS_TOOLS,
        async onChange(api: API) {
          const output = await api.saver.save();
          onChange(output);
        },
      });

      editorRef.current = editor;
    }

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         if (editorRef.current) {
    //         const output = await editorRef.current.save();
    //         onChange(output);
    //         console.log("Autosaved");
    //         }
    //     }, 10000); // Autosave every 10 seconds

    //     return () => clearInterval(interval);
    //     }, []);

        

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data]); // Reinitialize if data changes

  return <div id={holderId} className="border p-4 rounded min-h-[300px]" />;
};

export default Editor;
