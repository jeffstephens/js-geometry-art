/*
 * Make the webpage interactive
 */

function render() {
  // parameters for the whole deal
  const shapeRadius = $("#shapeRadius").val();
  const numShapes = $("#numShapes").val();
  const numSides = $("#numSides").val();

  renderShapes(shapeRadius, numShapes, numSides);
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
