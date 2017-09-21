/*
 * Do the neat shape rendering
 */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// start at 12:00 for easier human visualization
const radialOffset = (-1 * Math.PI/2);

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

function calculateSurroundingCenterPoints(center, polygonRadius, numPolygons) {
  const surroundingPoints = [];
  const arcLengthBetweenPoints = (2 * Math.PI) / numPolygons;

  // generate points around the circle and add them to the array
  for (let i = 0; i < numPolygons; i++) {
    const currentTheta = radialOffset + i * arcLengthBetweenPoints;
    let currentX = getCircleX(center[0], polygonRadius, currentTheta);
    let currentY = getCircleY(center[1], polygonRadius, currentTheta);
    surroundingPoints.push([currentX, currentY]);
  }

  return surroundingPoints;
}

// construct a shape by drawing lines between numSides points
function drawPolygon(centerX, centerY, radius, numSides) {
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
  ctx.stroke();
}

function drawEllipse(centerX, centerY, radiusX, radiusY) {
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 45 * Math.PI/180, 0, 2 * Math.PI);
  ctx.stroke();
}

function renderShapes(shapeRadius, numShapes, numSides, circles = false) {
  // clear canvas for new drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // calculate center points for each polygon
  const centerPoint = [2 * shapeRadius, 2 * shapeRadius];
  const polygonCenters = calculateSurroundingCenterPoints(centerPoint, shapeRadius, numShapes);

  // polygonCenters.push(centerPoint);

  // draw a polygon at each center point
  for(let i = 0; i < polygonCenters.length; i++) {
    const polygonPoint = polygonCenters[i];

    // ctx.fillRect(polygonPoint[0], polygonPoint[1], 2, 2);

    if (circles) {
      drawEllipse(polygonPoint[0], polygonPoint[1], shapeRadius, shapeRadius);
    } else {
      drawPolygon(polygonPoint[0], polygonPoint[1], shapeRadius, numSides);
    }
  }
}
