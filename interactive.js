/*
 * Make the webpage interactive
 */

function render() {
  // parameters for the whole deal
  const shapeRadius = $("#shapeRadius").val();
  const numShapes = $("#numShapes").val();
  const numSides = $("#numSides").val();
  const circles = $("#circles").is(":checked");

  renderShapes(shapeRadius, numShapes, numSides, circles);
}

$("input").change(() => {
  render();
});

$("input").keyup(() => {
  render();
});

$(document).ready(() => {
  render();
});
