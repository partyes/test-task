function drawNestedSetsTree(data, node) {
	const sets = data ? data.slice().sort(({left: l1}, {left: l2}) => l1 - l2 ) : [];

	function traverse(current, previous) {
		if (!sets[current]) {
			return;
		}

		if (undefined === previous) {
			const ul = document.createElement('ul');
			node.appendChild(ul);

			const li = document.createElement('li');
			li.textContent = sets[current].title;
			ul.appendChild(li);

			sets[current].node = li;

			traverse(current + 1, current);

		} else if (isChildrenOf(sets[current], sets[previous])) {
			const ul = document.createElement('ul');
			sets[previous].node.appendChild(ul);

			const li = document.createElement('li');
			li.textContent = sets[current].title;
			ul.appendChild(li);

			sets[current].node = li;

			traverse(current + 1, current);				

		} else if (isSiblings(sets[previous], sets[current])) {
			const li = document.createElement('li');
			li.textContent = sets[current].title;
			sets[previous].node.parentNode.appendChild(li);

			sets[current].node  = li;

			traverse(current + 1, current);
			
		} else {
			traverse(current, previous - 1);
		}
	}

	traverse(0);

	function isChildrenOf(child, parent) {
		return parent.left + 1 === child.left;
	}

	function isSiblings(prev, cur) {
		return prev.right + 1 === cur.left;
	}
}

if (typeof module !== 'undefined') {
  module.exports = drawNestedSetsTree;
}