import { JTMXResult } from './jtmx-result';
import escape from 'escape-html';

const emptyTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
} as const;

function JTMXRender(name, attrs) {
  attrs = attrs || {};

  const stack = [];
  let html = '';

  for (let i = arguments.length; i-- > 2; ) {
    stack.push(arguments[i]);
  }

  if (typeof name === 'function') {
    attrs.children = stack.reverse();

    return name(attrs);
  }

  if (name) {
    if (name === 'html') {
      html += '<!DOCTYPE html>';
    }

    html += '<' + name;
    if (attrs)
      for (let i in attrs) {
        if (attrs[i] !== false && attrs[i] != null) {
          html += ` ${escape(i)}="${escape(attrs[i])}"`;
        }
      }
    html += '>';
  }

  if (!emptyTags[name]) {
    while (stack.length) {
      const child = stack.pop();

      if (child) {
        if (Array.isArray(child)) {
          for (let i = child.length; i--; ) {
            stack.push(child[i]);
          }
        } else {
          html += child instanceof JTMXResult ? child : escape(child);
        }
      }
    }

    html += name ? `</${name}>` : '';
  }

  return new JTMXResult(html);
}

export default JTMXRender;
