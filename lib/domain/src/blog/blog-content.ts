const maxBlogContentLength = 5000;

export const validateBlogContent = (content: string): string[] => {
  const trimmed = content.trim();
  const errors: string[] = [];

  if (trimmed.length < 1) {
    errors.push('content must contain at least 1 character');
  }

  if (trimmed.length > maxBlogContentLength) {
    errors.push(`content must be ${maxBlogContentLength} characters or less`);
  }

  return errors;
};

export const sanitizeBlogContent = (content: string): string => {
  const lowerContent = content.toLowerCase();
  let withoutScriptBlocks = '';
  let readFrom = 0;
  let scriptStart = lowerContent.indexOf('<script');

  while (scriptStart >= 0) {
    const afterTagName = scriptStart + '<script'.length;
    const nextChar = lowerContent[afterTagName];

    if (nextChar != null && !/[\s>/]/.test(nextChar)) {
      withoutScriptBlocks += content.slice(readFrom, afterTagName);
      readFrom = afterTagName;
      scriptStart = lowerContent.indexOf('<script', readFrom);
      continue;
    }

    withoutScriptBlocks += content.slice(readFrom, scriptStart);

    const scriptEnd = lowerContent.indexOf('</script>', afterTagName);
    if (scriptEnd < 0) {
      readFrom = content.length;
      break;
    }

    readFrom = scriptEnd + '</script>'.length;
    scriptStart = lowerContent.indexOf('<script', readFrom);
  }

  withoutScriptBlocks += content.slice(readFrom);

  const withoutEventHandlers = withoutScriptBlocks.replace(
    /\son[a-z][a-z0-9-]*\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi,
    '',
  );
  const withoutJavascriptUrls = withoutEventHandlers.replace(
    /\bjavascript\s*:/gi,
    '',
  );

  return withoutJavascriptUrls.trim();
};
