import React from 'react';
import Helmet from 'react-helmet';

const CodeBlock = ({
  content: {
    code: { code, language },
  },
}) => (
  <>
    {language === 'html' && <div dangerouslySetInnerHTML={{ __html: code }} />}
    {language === 'css' && (
      <Helmet>
        <style>{code}</style>
      </Helmet>
    )}
    {language === 'javascript' && (
      <Helmet>
        <script>{code}</script>
      </Helmet>
    )}
  </>
);

export default CodeBlock;
