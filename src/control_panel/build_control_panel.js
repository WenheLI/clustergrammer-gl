var run_reorder = require('./../reorders/run_reorder');

module.exports = function build_control_panel(regl, cgm){


  console.log('building control panel')

// Add control panel to the top
  ///////////////////////////////////////

  // var control_container = d3.select(cgm.params.container).select(' .control-container')[0][0];
  var control_container = d3.select(cgm.params.root + ' .control-container')[0][0];
  var inst_height = 150;
  var inst_width = cgm.params.viz_width;

  // light panel color '#bbc3cc'
  // light button color '#e3e7ea'

  var control_panel_color = '#eee';

  // light button color
  var button_color = '#2f363d';

  // dark text color
  var text_color = '#2f363d';


  // // experimenting in different color pallets
  // control_panel_color = '#2f363d'
  // var button_color = '#e3e7ea';
  // var text_color = '#e3e7ea';

  var control_svg = d3.select(control_container)
    .style('height',inst_height + 'px')
    .style('width',inst_width+'px')
    .append('svg')
    .style('height',inst_height + 'px')
    .style('width',inst_width+'px');

  control_svg
    .append('rect')
    .style('height',inst_height + 'px')
    .style('width',inst_width+'px')
    .style('position', 'absolute')
    .style('fill', control_panel_color)
    .attr('id', 'control-panel-background');

  var button_dim = {};
  button_dim.height = 35;
  button_dim.width = 70;
  button_dim.x_trans = button_dim.width + 10
  button_dim.fs = 13;

  button_groups = {};
  button_groups.row = 40;
  button_groups.col = 95;

  var order_options = ['clust', 'sum', 'var', 'alpha'];

  _.each(['row', 'col'], function(inst_axis){

    console.log('inst_axis', inst_axis)

    var reorder_buttons = control_svg
      .append('g');

    reorder_buttons
      .classed(inst_axis + '-reorder-buttons', true);

    // generate single button
    var button_group = reorder_buttons
      .selectAll('g')
      .data(order_options)
      .enter( )
      .append('g')
      .attr('transform', function(d, i){
        var x_offset = button_dim.x_trans * i + 25;
        // debugger;
        return 'translate('+ x_offset  +', '+ button_groups[inst_axis] +')';
      })
      .on('click', function(){
        run_reorder(regl, cgm);

        d3.select(cgm.params.root + ' .' + inst_axis + '-reorder-buttons')
          .selectAll('rect')
          .style('stroke', button_color);

        // debugger

        d3.select(this)
          .select('rect')
          .style('stroke', 'red');
      })

    button_group
      .append('rect')
      .style('height', button_dim.height)
      .style('width', button_dim.width)
      .style('fill', control_panel_color)
      .style('rx', 10)
      .style('ry', 10)
      .style('stroke', function(d){
        var inst_color;
        if (cgm.params.inst_order[inst_axis] == d){
          inst_color = 'red';
        } else {
          inst_color = button_color;
        }
        return inst_color;
      })
      .style('stroke-width', 2.5);

    button_group
      .append('text')
      .classed('cat_graph_title', true)
      .text(function(d){
        return d.toUpperCase();
      })
      .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
      .style('font-weight', 400)
      .style('font-size', button_dim.fs)
      .style('text-anchor', 'middle')
      .style('stroke', text_color)
      .style('alignment-baseline', 'middle')
      .style('letter-spacing', '2px')
      .style('cursor', 'default')
      .style('-webkit-user-select', 'none')
      .attr('transform', 'translate('+ button_dim.width/2 +', '+ button_dim.height/2 +')');

  })




};