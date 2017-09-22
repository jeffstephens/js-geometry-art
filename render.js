/*
 * Do the neat shape rendering
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// start at 12:00 for easier human visualization
let radialOffset = (-1 * Math.PI/2);
let doRadialOffset = false;

// The parametric equation for a circle is
// x = cx + r * cos(a)
// y = cy + r * sin(a)
// Where r is the radius, cx,cy the origin, and a the angle.

function getCircleX(cx, r, a) {
  return cx + r * Math.cos(a);
}

function getCircleY(cy, r, a) {
  return cy + r * Math.sin(a);
}

function calculateSurroundingCenterPoints(center, polygonRadius, numPolygons, multiplier = 1) {
  const surroundingPoints = [];
  const arcLengthBetweenPoints = (2 * Math.PI) / numPolygons;

  if ( ! doRadialOffset) {
    multiplier = 1;
  }

  // generate points around the circle and add them to the array
  for (let i = 0; i < numPolygons; i++) {
    const currentTheta = radialOffset + i * arcLengthBetweenPoints;
    let currentX = getCircleX(center[0], polygonRadius, currentTheta * multiplier);
    let currentY = getCircleY(center[1], polygonRadius, currentTheta * multiplier);
    surroundingPoints.push([currentX, currentY]);
  }

  return surroundingPoints;
}

function getColor(seed) {
  // const colors = [
  //   '#AA6C39',
  //   '#AA8439',
  //   '#2E4272',
  //   '#226666'
  // ];

  const colors = [
    '#000000',
    '#D2E59E',
    '#DE0D92',
    '#7C7A7A',
    '#FF5D73'
  ];

  return colors[parseInt(seed) % colors.length];
}

// construct a shape by drawing lines between numSides points
function drawPolygon(centerX, centerY, radius, numSides, level) {
  ctx.fillStyle = 'black';
  ctx.beginPath();

  const centerPoint = [centerX, centerY];
  const shapeAnchorPoints = calculateSurroundingCenterPoints(centerPoint, radius, numSides);

  ctx.moveTo(shapeAnchorPoints[0][0], shapeAnchorPoints[0][1]);

  shapeAnchorPoints.forEach((point) => {
    ctx.lineTo(point[0], point[1]);
  });

  // finish the shape by connecting back to the origin
  ctx.lineTo(shapeAnchorPoints[0][0], shapeAnchorPoints[0][1]);

  ctx.closePath();

  // ctx.fillStyle = getColor(level);
  // ctx.fill();

  ctx.stroke();
}

function drawEllipse(centerX, centerY, radiusX, radiusY, level) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 45 * Math.PI/180, 0, 2 * Math.PI);
  ctx.closePath();

  // ctx.fillStyle = getColor(level);
  // ctx.fill();

  ctx.stroke();
}


// Animate increasing the amount of circles from 2 to 500, then back to 2
function circleAnimation() {
  const recursionLevel = 1;
  const radius = 200;
  const circles = true;

  const minCircles = 25;
  const maxCircles = 200;
  let numCircles = minCircles;
  let deltaCircleCount = 1;

  circleAnimationStep();

  function circleAnimationStep() {
    doRender(recursionLevel, radius, numCircles, null, circles);

    numCircles += deltaCircleCount;

    if (numCircles === maxCircles) {
      deltaCircleCount = -1;
    } else if (numCircles === minCircles) {
      deltaCircleCount = 1;
    }

    window.requestAnimationFrame(circleAnimationStep);
  }
}

// circleAnimation();


// Animate changing the global angle offset
function figureSpin() {
  doRadialOffset = true;
  spinAnimationStep();

  function spinAnimationStep() {
    radialOffset += Math.PI / 1024;

    const savedState = JSON.parse(localStorage.getItem('geomRenderState'));
    doRender(
      savedState.numLayers,
      savedState.shapeRadius,
      savedState.numShapes,
      savedState.numSides,
      savedState.circles
    );

    window.requestAnimationFrame(spinAnimationStep);
  }
}

// figureSpin();


function increaseSides() {
  const maxNumSides = 50;
  const minNumSides = 3;

  let numSides = minNumSides;
  let deltaNumSides = 1;

  increaseAnimationStep();

  function increaseAnimationStep() {
    const savedState = JSON.parse(localStorage.getItem('geomRenderState'));
    doRender(
      savedState.numLayers,
      savedState.shapeRadius,
      savedState.numShapes,
      numSides,
      savedState.circles
    );

    numSides += deltaNumSides;

    if (numSides === maxNumSides) {
      deltaNumSides = -1;
    } else if (numSides === minNumSides) {
      deltaNumSides = 1;
    }

    window.setTimeout(increaseAnimationStep, 50 + (200 / numSides));
  }
}

// increaseSides();


function doRender(numLayers, shapeRadius, numShapes, numSides, circles = false) {
  // resize canvas to match shape size
  ctx.canvas.width = shapeRadius * 4;
  ctx.canvas.height = shapeRadius * 4;

  // clear canvas for new drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // initially, center drawing in canvas
  const initialCenter = [shapeRadius * 2, shapeRadius * 2];
  renderShapes(numLayers, initialCenter, shapeRadius, numShapes, numSides, circles);
}

function renderShapes(numLayers, shapeCenter, shapeRadius, numShapes, numSides, circles) {
  // recursive base case
  if (numLayers <= 0) {
    return;
  }

  // calculate center points for each polygon
  const centerPoint = shapeCenter;
  const polygonCenters = calculateSurroundingCenterPoints(centerPoint, shapeRadius, numShapes, numLayers);

  // also draw center shape
  // polygonCenters.push(centerPoint);

  // draw a polygon at each center point
  for(let i = 0; i < polygonCenters.length; i++) {
    const polygonPoint = polygonCenters[i];

    // draw center points for testing
    // ctx.fillRect(polygonPoint[0], polygonPoint[1], 2, 2);

    if (circles) {
      drawEllipse(polygonPoint[0], polygonPoint[1], shapeRadius, shapeRadius, numLayers);
    } else {
      drawPolygon(polygonPoint[0], polygonPoint[1], shapeRadius, numSides, numLayers);
    }

    // calculate next recursive generation
    const newRadius = shapeRadius / 2;
    const newCenter = polygonPoint;

    renderShapes(numLayers - 1, newCenter, newRadius, numShapes, numSides, circles);
  }
}
