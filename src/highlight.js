let markers = [];

export function highlightAll(cm, nodes) {
  const doc = cm.getDoc();
  removeHighlights();
  markers = nodes.map((node, i) => {
    const start = doc.posFromIndex(node.loc.start.offset);
    const end = doc.posFromIndex(node.loc.end.offset);
    return doc.markText(start, end, {
      className: `cm-nodeFound cm-nodeFound-${i}`
    });
  });
}

export function removeHighlights() {
  markers.forEach(marker => marker.clear());
}