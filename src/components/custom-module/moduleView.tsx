'use client';

import { useImageQuality } from '@/common/context/imageQualityCotext';
import grapesjs, { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { useEffect, useState } from 'react';

interface ModuleViewProps {
  data: string;
  translations: Record<string, string>;
  language: string;
}

const ModuleView = ({ data, translations, language }: ModuleViewProps) => {
  let editor: Editor;

  const { quality } = useImageQuality();

  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');

  const translateModule = (data?: string | null) => {
    if (!data) return;

    Object.keys(translations).forEach((key: string) => {
      data = data?.replace(new RegExp(`{{${key}}}`, 'g'), translations[key]);
    });

    return data;
  };

  useEffect(() => {
    try {
      editor = grapesjs.init({
        container: document?.createElement('div'),
        storageManager: false,
      });

      editor.loadProjectData(data ? JSON.parse(translateModule(data)!) : {});

      setHtml(editor.getHtml());
      setCss(editor.getCss() || '');
    } catch (error) {
      console.warn("GrapesJS couldn't be initialized", error);
    }
  }, [data]);

  if (quality < 25) {
    return null;
  }

  if (html) {
    return (
      <div dir={language === 'AR' ? 'rtl' : 'ltr'} className='my-10'>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
        />
        <style>{css}</style>

        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  return null;
};

export default ModuleView;
