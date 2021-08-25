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