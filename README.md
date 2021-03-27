Information Regarding Paths: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_paths

The fillStyle, fill, stroke, strokeStyle methods all only work for the shapes and lines that come after a beginPath.
beginPath contains all the list of all the sub paths for which the above fill and stroke command works.
beginPath starts a new path and it removes the list of sub paths that might exist because of a previous beginPath call.

closePath draws a line from the current point to the start of the current sub-path

top left corner of canvas is 0,0
rect(x pos, y pos, width, height) => all in pixels

