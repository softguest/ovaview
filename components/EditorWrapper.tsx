'use client';

import { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

const EditorWrapper = ({ data, onChange }: { data: any; onChange: (data: any) => void }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const initEditor = async () => {
      const editor = new EditorJS({
        holder: 'editorjs',
        data,
        async onChange() {
          const content = await editor.save();
          onChange(content);
        },
        tools: {
          // add tools if needed
        },
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.isReady
          .then(() => {
            if (typeof editorRef.current?.destroy === 'function') {
              editorRef.current.destroy();
              editorRef.current = null;
            }
          })
          .catch((err) => console.error('Error during editor cleanup', err));
      }
    };
  }, []);

  return <div id="editorjs" className="min-h-[300px] border rounded p-4" />;
};

export default EditorWrapper;
