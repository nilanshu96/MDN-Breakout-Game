**Demo**: https://nilanshu96.github.io/MDN-Breakout-Game/

**MDN Breakout Tutorial**: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

**Information Regarding Paths**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#drawing_paths

**Information on Collision Detection**: https://www.geeksforgeeks.org/check-if-any-point-overlaps-the-given-circle-and-rectangle/


The project uses [Parcel](https://parceljs.org/) to build a version with minified project files
**Steps to build and run the project**:

1. Use 'npm start' to run the project on localhost:1234
2. Use 'npm run build' to create a build by minifying the files


##Notes:

* The fillStyle, fill, stroke, strokeStyle methods all only work for the shapes and lines that come after a beginPath.
beginPath contains all the list of all the sub paths for which the above fill and stroke command works.
beginPath starts a new path and it removes the list of sub paths that might exist because of a previous beginPath call.

* closePath draws a line from the current point to the start of the current sub-path

* top left corner of canvas is 0,0

* rect(x pos, y pos, width, height) => all in pixels. 
(x,y) => position of rectangle's top left corner

* arc(x pos, y pos, radius, start angle, end angle, anticlockwise?) =>
x,y => position of arc's centre
radius of arc in pixels
start and end angle of the arc in radians
anticlockwise can be false or true. It tells the direction in which to draw the arc. It's optional.

* clearRect(x1, y1, x2, y2) => clears the reactangle defined by the coordinates
(x1, y1) => top left 
(x2, y2) => bottom right

* ctx.font = "16px Arial"
ctx.font is the same as a css font value

* ctx.fillText("text",x,y) => fills text at x,y location
ctx.strokeText("text",x,y) => Strokes a text, ie, draws only the outline at x,y location

* requestAnimationFrame(callback);
calls the callback function according to the refresh rate of the screen

