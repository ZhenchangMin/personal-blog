const INLINE_CONTAINERS = new Set([
  'paragraph',
  'heading',
  'emphasis',
  'strong',
  'delete',
  'link',
  'linkReference',
]);

const HAN_TO_LATIN_OR_NUMBER = /(\p{Script=Han})([\p{Script=Latin}\p{Number}])/gu;
const LATIN_OR_NUMBER_TO_HAN = /([\p{Script=Latin}\p{Number}])(\p{Script=Han})/gu;
const HAN = /\p{Script=Han}/u;
const LATIN_OR_NUMBER = /[\p{Script=Latin}\p{Number}]/u;

function spaceText(value) {
  return String(value ?? '')
    .replace(HAN_TO_LATIN_OR_NUMBER, '$1 $2')
    .replace(LATIN_OR_NUMBER_TO_HAN, '$1 $2');
}

function firstVisibleCharacter(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') {
    return Array.from(String(node.value ?? ''))[0] ?? '';
  }
  if (!Array.isArray(node.children)) return '';
  for (const child of node.children) {
    const character = firstVisibleCharacter(child);
    if (character) return character;
  }
  return '';
}

function lastVisibleCharacter(node) {
  if (!node) return '';
  if (node.type === 'text' || node.type === 'inlineCode') {
    const characters = Array.from(String(node.value ?? ''));
    return characters.at(-1) ?? '';
  }
  if (!Array.isArray(node.children)) return '';
  for (let index = node.children.length - 1; index >= 0; index -= 1) {
    const character = lastVisibleCharacter(node.children[index]);
    if (character) return character;
  }
  return '';
}

function needsSpace(left, right) {
  return (HAN.test(left) && LATIN_OR_NUMBER.test(right)) ||
    (LATIN_OR_NUMBER.test(left) && HAN.test(right));
}

function spaceAcrossInlineChildren(node) {
  if (!INLINE_CONTAINERS.has(node.type) || !Array.isArray(node.children)) return;

  const spaced = [];
  for (const child of node.children) {
    const previous = spaced.at(-1);
    if (previous && needsSpace(lastVisibleCharacter(previous), firstVisibleCharacter(child))) {
      spaced.push({ type: 'text', value: ' ' });
    }
    spaced.push(child);
  }
  node.children = spaced;
}

export default function remarkCjkSpacing() {
  return (tree) => {
    const walk = (node) => {
      if (!node) return;

      if (node.type === 'text') {
        node.value = spaceText(node.value);
        return;
      }

      // Literal/code nodes deliberately keep their source text untouched.
      if (node.type === 'code' || node.type === 'inlineCode' || node.type === 'html') return;
      if (!Array.isArray(node.children)) return;

      for (const child of node.children) walk(child);
      spaceAcrossInlineChildren(node);
    };

    walk(tree);
  };
}
