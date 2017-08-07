import css from 'css';

const excluded = ['>', '+', '~'];

export function process(style) {
  const ast = css.parse(style);
  const scoped = scope(ast);
  return css.stringify(scoped);
}

function scope(ast) {
  return Object.keys(ast).reduce((node, key) => {
    const rule = ast[key];
    if ('selectors' == key) {
      node[key] = rule.map(selector =>
        selector.split(/\s+/).map(token =>
          excluded.includes(token)
          ? token
          : token.replace(/^(.*?)(:|$)(.*)?/, '$1.MARK$2$3')
        ).join(' '));
    } else if (Array.isArray(rule) || rule instanceof Object) {
      node[key] = scope(rule);
    } else {
      node[key] = rule;
    }
    return node;
  }, Array.isArray(ast) ? [] : {});
}
