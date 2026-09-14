function isWhitespaceText(node) {
  return node?.type === 'text' && String(node.value ?? '').trim() === '';
}

function hasMeaningfulContent(children) {
  return children.some((child) => !isWhitespaceText(child));
}

function asParagraph(source, children) {
  return {
    ...source,
    children,
    data: source.data ? { ...source.data } : undefined,
  };
}

function asFigure(image, caption) {
  caption.data = {
    ...(caption.data ?? {}),
    hName: 'figcaption',
  };

  return {
    type: 'paragraph',
    children: [image, caption],
    data: {
      hName: 'figure',
      hProperties: { className: ['article-figure'] },
    },
    position: image.position && caption.position
      ? { start: image.position.start, end: caption.position.end }
      : undefined,
  };
}

function splitCaptionedImages(paragraph) {
  if (paragraph.data?.hName === 'figure') return [paragraph];

  const children = paragraph.children ?? [];
  const output = [];
  let buffer = [];
  let transformed = false;

  const flushBuffer = () => {
    if (hasMeaningfulContent(buffer)) output.push(asParagraph(paragraph, buffer));
    buffer = [];
  };

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];

    if (child.type === 'image') {
      let cursor = i + 1;
      let sawLineBreak = false;

      while (cursor < children.length && isWhitespaceText(children[cursor])) {
        if (String(children[cursor].value ?? '').includes('\n')) sawLineBreak = true;
        cursor += 1;
      }

      const caption = children[cursor];
      if (
        sawLineBreak &&
        caption?.type === 'inlineCode' &&
        !String(caption.value ?? '').includes('\n')
      ) {
        flushBuffer();
        output.push(asFigure(child, caption));
        transformed = true;
        i = cursor;
        continue;
      }
    }

    buffer.push(child);
  }

  flushBuffer();
  return transformed ? output : [paragraph];
}

export default function remarkImageCaptions() {
  return (tree) => {
    const walk = (node) => {
      if (!Array.isArray(node.children)) return;

      const nextChildren = [];
      for (const child of node.children) {
        if (child.type === 'paragraph') {
          nextChildren.push(...splitCaptionedImages(child));
        } else {
          nextChildren.push(child);
        }
      }
      node.children = nextChildren;

      for (const child of node.children) walk(child);
    };

    walk(tree);
  };
}
