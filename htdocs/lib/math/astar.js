ig.module(
	"math.astar"
)
.defines(function () {

	var Node = function (index, x, y, parent) {
		this.index = index;
		this.x = x;
		this.y = y;
		this.parent = parent || null;
		this.f = 0;
		this.g = 0;
	};

	Node.prototype.getDistance = function (node) {
		return (
			Math.abs(this.x - node.x)
			+ Math.abs(this.y - node.y)
		);
	};

	var Map = function (grid) {
		this.grid = grid;
		this.width = grid[0].length;
		this.height = grid.length;
	};

	Map.prototype.isWalkable = function (x, y) {
		if (
			x < 0
			|| y < 0
			|| x >= this.width
			|| y >= this.height
		) {
			// Outside the map. Totally NOT walkable!
			return false;
		}
		return (!this.grid[y][x]);
	};

	Map.prototype.makeNode = function (x, y, parent) {
		return new Node(
			(x + (y * this.width)),
			x, y, parent
		);
	};

	Map.prototype.getAdjacent = function (n) {
		// Threre's probably a more elegant way to write this function...
		var a = [];
		// North
		if (this.isWalkable(n.x, n.y - 1)) {
			a.push(this.makeNode(n.x, n.y - 1, n));
		}
		// South
		if (this.isWalkable(n.x, n.y + 1)) {
			a.push(this.makeNode(n.x, n.y + 1, n));
		}
		// West
		if (this.isWalkable(n.x - 1, n.y)) {
			a.push(this.makeNode(n.x - 1, n.y, n));
		}
		// East
		if (this.isWalkable(n.x + 1, n.y)) {
			a.push(this.makeNode(n.x + 1, n.y, n));
		}
		return a;
	};

	AStar = function (grid, startX, startY, goalX, goalY) {

		// The search area
		var map = new Map(grid);

		// The start and goal nodes
		var start = map.makeNode(startX, startY);
		var goal = map.makeNode(goalX, goalY);

		// List to keep track of open and closed nodes
		var openList = [start];
		var closedList = [];
		closedList[start.index] = true;

		var len = 0;
		while (len = openList.length) {

			var minF = {
				index: -1,
				f: Infinity
			};

			// Find the node on the open list
			// with the lowest F score
			for (var i = 0; i < len; ++i) {
				if (openList[i].f < minF.f) {
					minF.f = openList[i].f;
					minF.index = i;
				}
			}

			// Remove this node from the open list
			var node = openList.splice(minF.index, 1)[0];

			if (node.index === goal.index) {

				// Hooray! We found the goal node!

				// Create the final path
				var path = [];
				do {
					path.push([node.x, node.y]);
				} while (node = node.parent);

				// ...and flip it so it's in the right order
				path.reverse();

				return path;

			} else {

				// Haven't found the goal node yet...

				// Get adjacent nodes
				var adjacent = map.getAdjacent(node);

				// Calculate values for adjacent nodes
				// and add them to the open list if
				// they aren't already closed
				for (var i = 0, j = adjacent.length; i < j; ++i) {
					var n = adjacent[i];
					if (!closedList[n.index]) {
						n.g = (node.g + n.getDistance(node));
						n.f = (n.g + n.getDistance(goal));
						openList.push(n);
						closedList[n.index] = true;
					}
				}

			}

		}

		// We didn't find a path to the goal :(
		return null;

	};

});
