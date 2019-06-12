module.exports = function position_tooltip(params){
  // this is necessary to offset the tooltip correctly, probably due to the
  // padding in the tooltip or some related paramters
  var magic_x_offset = 22;

  var d3_tip_width = parseFloat(d3.select(params.tooltip_id)
                               .style('width')
                               .replace('px',''));

  var d3_tip_height = parseFloat(d3.select(params.tooltip_id)
                               .style('height')
                               .replace('px',''));

  params.d3_tip_width = d3_tip_width;

  d3.selectAll('.cgm-tooltip')
    .style('display', 'none');

  /* former position of remove lost tooltips */

  // need to set up custom positioning of the tooltip based on the mouseover type
  // upper left if on matrix-cell, upper right if on row label, lower left if on
  // column mouseover. Should be able to check params.tooltip.tooltip_type to
  // find out how to position the tooltip
  d3.select(params.tooltip_id)
    .style('display', 'block')
    .style('z-index', 99);

  d3.select(params.tooltip_id)
    .style('margin-left', function(){
      var total_x_offset = params.zoom_data.x.cursor_position - d3_tip_width +
                           magic_x_offset;
      return total_x_offset + 'px'
    })
    .style('margin-top', function(){
      var total_y_offset = params.zoom_data.y.cursor_position - d3_tip_height;
      return total_y_offset + 'px'
    })
};