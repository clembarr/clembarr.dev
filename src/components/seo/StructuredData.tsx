import { useEffect } from 'react';

type StructuredDataProps = {
  schema: object | object[];
};

/**
 * @component StructuredData
 * @description Injects JSON-LD structured data into the page `<head>` as `<script type="application/ld+json">` tags.
 * Accepts a single schema object or an array of schemas. Cleans up injected scripts on unmount.
 * @param schema - A Schema.org object or array of objects to serialize as JSON-LD.
 */
const StructuredData = ({ schema }: StructuredDataProps) => {
  useEffect(() => {
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((s, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [schema]);

  return null;
};

export default StructuredData;
