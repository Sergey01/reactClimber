const VERBOSE = true;

const getReactRoots = function(startNode = document) {
  const reactRoots = [];
  startNode.querySelectorAll('*').forEach(node => {
  for (const key in node) {
    if (key.startsWith('_reactRootContainer')) {
      reactRoots.push(node);
      break;
      }
    }
  });
  if (reactRoots.length > 0) return reactRoots;
};

const isReactNode = function(node, reactID) {
  if (reactID) {
    if (('__reactInternalInstance$' + reactID) in node || ('__reactFiber$' + reactID) in node) return true;
  }
  for (const key in node) {
    if (key.startsWith('__reactInternalInstance$') || key.startsWith('__reactFiber$')) return true;
  }
  return false;
};

const getReactID = function(node) {
  for (const key in node)
    if (key.startsWith('__react') && key.includes('$')) {
      return key.split('$')[1]
    }
};

class FiberNode {
  // thanks to Max Koretskyi
  // https://indepth.dev/posts/1007/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-to-walk-the-components-tree#linked-list-traversal
  constructor(instance) {
    this.instance = instance;
    this.child = instance.child;
    this.sibling = instance.sibling;
    this.return = instance.return;
    this.rendersElement = instance.elementType ? true : false;
    this.name = instance.type.displayName
  }
};

const getHostRoot = function(reactRootNode) {
  const fiberRoot = reactRootNode._reactRootContainer._internalRoot;
  const hostRoot = fiberRoot.current; // head of the Fiber tree (fiberRoot is backreferenced via current.stateNode)
  return new FiberNode(hostRoot);
};

const climbFiber = function(fiberNode) {
  if (VERBOSE) console.log(`traversing ${fiberNode.name}`);
  
  if (fiberNode.sibling) {
    if (VERBOSE) console.log(`sibling node of ${fiberNode.name} found`);
    climbFiber(new FiberNode(fiberNode.sibling));
  };
  
  if (fiberNode.child) {
    if (VERBOSE) console.log(`child node of ${fiberNode.name} found`);
    climbFiber(new FiberNode(fiberNode.child));
  };

  return fiberNode;
};