const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

  // start at 12:00 for easier human visualization
  const radialOffset = (-1 * Math.PI/2);

  // generate points around the circle and add them to the array
  for (let i = 0; i < numPolygons; i++) {
    const currentTheta = radialOffset + i * arcLengthBetweenPoints;
    let currentX = getCircleX(center[0], polygonRadius, currentTheta);
    let currentY = getCircleY(center[1], polygonRadius, currentTheta);
    surroundingPoints.push([currentX, currentY]);
  }

  return surroundingPoints;
}

// parameters for the whole deal
const shapeRadius = 100;
const numShapes = 25;

// calculate center points for each polygon
const centerPoint = [2 * shapeRadius, 2 * shapeRadius];
const polygonCenters = calculateSurroundingCenterPoints(centerPoint, shapeRadius, numShapes);
// polygonCenters.push(centerPoint);

console.log(polygonCenters);

// draw a polygon at each center point
for(let i = 0; i < polygonCenters.length; i++) {
  const polygonPoint = polygonCenters[i];

  // ctx.fillRect(polygonPoint[0], polygonPoint[1], 2, 2);

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(polygonPoint[0], polygonPoint[1], shapeRadius, shapeRadius, 45 * Math.PI/180, 0, 2 * Math.PI);
  ctx.stroke();
}
