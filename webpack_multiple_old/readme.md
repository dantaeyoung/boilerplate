# highrise

> A new social type was being created by the apartment building, a cool, unemotional personality impervious to the psychological pressures of high-rise life, with minimal needs for privacy, who thrived like an advanced species of machine in the neutral atmosphere. - J.G. Ballard, High-Rise

---

setup:

    npm install -d

run:

    npm start

then open `localhost:8081`

or open `http://localhost:8081/ui` for the iPad(?) UI

or open `http://localhost:8081/story` for the story

![](shot.png)

---

## generating a building

first create the world:

```js
const cellSize = 2;
const scene = new Scene('#stage');
const world = new World(cellSize, scene);
```

your html needs to have a canvas element with id `stage`.

then you can add a floor to the world by specifying a floor plan, e.g.:

```js
var layout = ["#.#.#.#.-",
              "#. . .A.-",
              "#. . .A.-",
              "#.#.#.#.-"]
```

(the periods are delimiters that also correct the aspect ratio of the floor plans, a little)

`#` indicates a wall, ` ` (a space) indicates walkable floor, `-` indicates empty space.

characters indicate an object with that name, e.g. here the two `A`s form a continuous object named `A`.

a floor can be added to the world like so:

```js
world.addFloor(layout, 0, {
  'A': {
    'tags': ['a thing'],
    'props': {
      'weight': 10
    }
  }
})
```

basically, you pass in `(layout, vertical coordinate, object properties)` for that floor.

---

## notes

### `coord` vs `pos`

this is all built on a grid system where each cell (or voxel, since it's 3D) has a side length of `cellSize`. So there's a coordinate system for that.

there however is still the continuous coordinate system underneath.

i have to have different terms for each or i'm going to lose my mind

SO

- positions in the grid coordinate system (GCS) are referred to as `coord`. they must be discrete (integer) values
- positions in the continuous coordinate system (CCS) are referred to as `position`. they can take on any real number

this is an arbitrary mapping but gotta have some consistency

i imagine there's some standard way of making this distinction that i'm oblivious to

### surface network/pathfinding

the world is composed of _surfaces_ and _stairs_ (which are special surfaces that vertically connect other surfaces). they each have internal grid systems that have the same `cellSize` as the world's grid system and are also locked into the world's grid system.

pathfinding _within_ a given surface is handled by the `pathfinding.js` library (i.e. A\* search). the path for a given surface is just called a `path`.

pathfinding _through_ surfaces is a little different (considering the vertical case here). we can represent the vertical structure of the world as a network, where non-stair surfaces are nodes and stairs are the edges. the path from a given node (surface) to another node (surface) is called a `route`, i.e. a `route` is composed of multiple `paths`. not quite sure this network representation can be easily coerced into a 2d grid which is what `pathfinding.js` needs

### present assumptions/future things

- no non-rectangular geometries are supported at present, but will be tackled...eventually
- `pathfinding.js` treats all nodes with equal weights ([there are forks that work around this](https://github.com/qiao/PathFinding.js/issues/129)) but eventually we want to weight nodes. e.g. maybe one area is really noisy and this particular agent hates noisy areas. things get more complicated here because then there isn't just a objective grid for a surface, rather there is the objective grid (that communicates physical limitations, e.g. agents can't walk through objects) and a subjective/perceptual grid which depends on the agent doing the pathfinding.

