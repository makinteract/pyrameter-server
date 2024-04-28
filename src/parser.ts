const Parser = require('tree-sitter');
const Python = require('tree-sitter-pyrameter');
const { Query, QueryCursor } = Parser;

const parser = new Parser();
parser.setLanguage(Python);

export function parseCode(sourceCode: string) {
  const tree = parser.parse(sourceCode);
  // console.log(tree.rootNode.toString());
  // console.log('====');

  try {
    const query = new Query(Python, `((comment) @c)`);
    const matches = query.captures(tree.rootNode);
    // console.log(matches);
    return matches;

    // const query2 = new Query(Python, `((slider) @s)`);
    // const match2 = query2.captures(matches[0].node);
    // console.log(match2);
  } catch (error) {
    console.log(error);
  }
  return [];
}
