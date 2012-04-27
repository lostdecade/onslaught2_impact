ig.module(
	"game.main"
)
.requires(

	// Core
	"impact.game",
	"impact.font",
	"math.astar",

	"game.entities.reticle",

	"game.entities.location",
	"game.entities.warp",

	// Entities
	"game.entities.abstract.base",
	"game.entities.abstract.mob",

	"game.entities.abstract.hero",
	"game.entities.xam",

	"game.entities.torch",

	// Power-Ups
	"game.entities.abstract.power-up",
	"game.entities.heal-point",
	"game.entities.save-point",
	"game.entities.coin",

	// Objects
	//"game.entities.barrel",
	//"game.entities.bush",

	// Monsters
	"game.entities.abstract.monster",
	"game.entities.goblin",
	"game.entities.bat",
	"game.entities.wizard",
	"game.entities.cube",

	"game.entities.abstract.spawner",

	"game.entities.spawn-invis",
	"game.entities.spawn-pyramid",
	"game.entities.spawn-cave",

	// Weapons
	"game.entities.weapons.spear",
	"game.entities.weapons.sword",

	// Levels
	"game.levels.test",
	"game.levels.village"
	//"game.levels.ai_test"

)
.defines(function () {

O2Engine = ig.Game.extend({

	spawnLocation: null,

	init: function () {

		ig.input.bind(ig.KEY.UP_ARROW, "up");
		ig.input.bind(ig.KEY.W, "up");

		ig.input.bind(ig.KEY.LEFT_ARROW, "left");
		ig.input.bind(ig.KEY.A, "left");

		ig.input.bind(ig.KEY.DOWN_ARROW, "down");
		ig.input.bind(ig.KEY.S, "down");

		ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
		ig.input.bind(ig.KEY.D, "right");

		ig.input.bind(ig.KEY.SPACE, "shoot");
		ig.input.bind(ig.KEY.MOUSE1, "shoot");

		// TODO: Track mouse x,y for aiming & click to move

		this.spawnLocation = "loc_a";
		this.loadLevel(LevelVillage);

		// TODO: Load music from level??
		ig.music.add("media/music/forest.*");
		ig.music.volume = 0.25;
		ig.music.play();

	},

	warp: function (levelObject, location) {
		this.spawnLocation = location;
		this.loadLevelDeferred(levelObject);
	},

	loadLevel: function (levelObject) {
		this.parent(levelObject);
		this.spawnEntity(EntityReticle, 0, 0);
		var location = this.getEntityByName(this.spawnLocation);
		if (location) {
			this.spawnEntity(EntityXam, location.pos.x, location.pos.y);
		} else {
			console.log(location);
		}
	},

	update: function () {

		this.parent();

		this.updateViewport();
		this.sortEntities();

	},

	updateViewport: function () {

		var player = this.getPlayer();
		if (!player) {
			return;
		}

		// Calculate the position of the screen centered on the player
		var viewport = {
			x: ((player.pos.x + (player.size.x / 2)) - (ig.system.width / 2)),
			y: ((player.pos.y + (player.size.y / 2)) - (ig.system.height / 2))
		};

		// Get map size in pixels
		var mapSize = {
			x: (this.collisionMap.width * this.collisionMap.tilesize),
			y: (this.collisionMap.height * this.collisionMap.tilesize)
		};

		// Calculate the map bounds
		var bounds = {
			x: (mapSize.x - ig.system.width),
			y: (mapSize.y - ig.system.height)
		};

		// Update the screen coords but keep them within the map bounds
		this.screen.x = viewport.x.limit(0, bounds.x).round();
		this.screen.y = viewport.y.limit(0, bounds.y).round();

	},

	draw: function () {
		// Draw all entities and backgroundMaps
		this.parent();
	},

	getPlayer: function () {
		return this.getEntitiesByType(EntityXam)[0];
	},

	sortEntities: function () {
		this.entities.sort(function (a,b) {
			if (a.zIndex === b.zIndex) {
				var ay = (a.pos.y + a.size.y - a.offset.y);
				var by = (b.pos.y + b.size.y - b.offset.y);
				return (ay - by);
			} else {
				return (a.zIndex - b.zIndex);
			}
		});
	},

	getWalkGrid: function () {

		// Grab the collision map's data
		var grid = ig.copy(this.collisionMap.data);
		var tilesize = this.collisionMap.tilesize;

		// Add FIXED entities to the collision map
		var entities = this.getEntitiesByType(EntityBase);
		for (var i = 0, j = entities.length; i < j; ++i) {
			var e = entities[i];
			if (e.collides == ig.Entity.COLLIDES.FIXED) {
				var pos = this.getEntityGridPosition(e);
				var pos = {
					x: Math.floor(e.pos.x / tilesize),
					y: Math.floor(e.pos.y / tilesize)
				};
				var end = {
					x: Math.floor((e.pos.x + e.size.x - 1) / tilesize),
					y: Math.floor((e.pos.y + e.size.y - 1) / tilesize)
				};
				for (var y = pos.y; y <= end.y; ++y) {
					for (var x = pos.x; x <= end.x; ++x) {
						grid[y][x] = 1;
					}
				}
			}
		}

		return grid;

	},

	getEntityGridPosition: function (entity) {
		var tilesize = this.collisionMap.tilesize;
		return {
			x: Math.floor(entity.pos.x / tilesize),
			y: Math.floor(entity.pos.y / tilesize)
		};
	},

	tracePath: function (entityFrom, entityTo) {

		var nodeFrom = this.getEntityGridPosition(entityFrom);
		var nodeTo = this.getEntityGridPosition(entityTo);

		var walkGrid = ig.game.getWalkGrid();
		var path = AStar(walkGrid, nodeFrom.x, nodeFrom.y, nodeTo.x, nodeTo.y);

		if (path == null) {
			// No path found
			return null;
		}

		var waypoints = [];
		var tilesize = this.collisionMap.tilesize;
		for (var i = 0, j = path.length; i < j; ++i) {
			waypoints.push({
				x: (path[i][0] * tilesize),
				y: (path[i][1] * tilesize)
			});
		}

		waypoints.shift();
		return waypoints;

	}

});

ig.main("#canvas", O2Engine, 60, 320, 240, 2);

});
