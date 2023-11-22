type TreeNode = {
  value: string
}
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}

let a: TreeNode = {value: 'a'}
let b: LeafNode = {value: 'b', isLeaf: true}
let c: InnerNode = {value: 'c', children: [b]}

function mapNode<T extends TreeNode>(
  node: T,
  f: (value: string) => string
): T {
  return {
    ...node,
    value: f(node.value)
  }
}

let a1 = mapNode(a, _ => _.toUpperCase()) // %inferred-type: TreeNode
let b1 = mapNode(b, _ => _.toUpperCase()) // %inferred-type: LeafNode
let c1 = mapNode(c, _ => _.toUpperCase()) // %inferred-type: InnerNode

export {};
