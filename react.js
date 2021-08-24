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

const isReactNode = function(node) {
  for (const key in node) {
    if (key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber')) return true;
  }
  return false;
};

