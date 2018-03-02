function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("y", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

function print(itm,blocks){
    for(var n = 0 ; n < blocks.length ; n++) {
        var block = blocks[n];
        if (block.fit) {
        var result= document.getElementById("content");
        result.innerHTML= result.innerHTML+"<br>"+ itm.name + "-" + block.name +  "-" + itm.x + "-" + itm.y + "-" + itm.w + "-" + itm.h + "-" + block.fit.x +"-"+ block.fit.y +"-"+ block.w +"-"+ block.h;
        }
    }
}

Number.prototype.between = function(first,last){
    return (first < last ? this >= first && this <= last : this >= last && this <= first );
}

d3.selection.prototype.moveToFront = function() {  
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };
    
d3.selection.prototype.moveParentToFront = function() {  
      return this.each(function(){
        this.parentNode.parentNode.appendChild(this.parentNode);
      });
    };

d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
            var firstChild = this.parentNode.firstChild; 
            if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
            } 
        });
    };

function moveOnTop( obj) {  
    obj.parentNode.parentNode.parentNode.appendChild(obj.parentNode.parentNode);
    obj.parentNode.parentNode.appendChild(obj.parentNode);             
};

function getcapid(nodes,capability){

  for( var i=0; i < nodes.length ; i++){  
        if(nodes[i].name==capability.name) return nodes[i].id;
  }
  return null;
}

function getcapnames(nodes,capids){
  var name={};
  for( var i=0; i < nodes.length ; i++){  
        for(var key in capids) {
            if(key== nodes[i].id) name[nodes[i].name]= nodes[i].name;
        }
  }
  return name;
}

function getprocessid(nodes,name){

  for( var i=0; i < nodes.length ; i++){  
        if(nodes[i].name==name){
            return nodes[i].id;
        } 
  }
  return 0;
}

function dollars(score)
{
    if (score.between(0,1)) return "$";
    if (score.between(1,3)) return "$$";
    if (score.between(3,6)) return "$$$";
    if (score.between(6,100)) return "$$$$";
}

function makefilter(svg)
{

 var glow = svg.append('filter')
        .attr('x'     , '-50%')
        .attr('y'     , '-50%')
        .attr('width' , '400%')
        .attr('height', '400%')
        .attr('id'    , 'blue-glow');

    glow.append('feColorMatrix')
        .attr('type'  , 'matrix')
        .attr('values', '0 0 0 0  0 '
                      + '0 0 0 0  0 '
                      + '0 0 0 0  .7 '
                      + '0 0 0 1  0 ');

    glow.append('feGaussianBlur')
        .attr('stdDeviation', 3)
        .attr('result'      , 'coloredBlur');

    glow.append('feMerge').selectAll('feMergeNode')
        .data(['coloredBlur', 'SourceGraphic'])
      .enter().append('feMergeNode')
        .attr('in', String);

}

function makecrosshatch(svg){
    var defs = svg.append("defs");
    var pattern = defs.append("pattern")
            .attr("id","crosshatch")
            .attr("patternUnits","userSpaceOnUse")
            .attr("width","8")
            .attr("height","8") 
            .attr("fill","transparent");
    
        pattern.append("path")
            .attr("d","M0 0L8 8ZM8 0L0 8Z")
            .attr("stroke-width","0.5")
            .attr("stroke","#ff0016")
            .attr("fill","transparent");
}

function rightRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," +(radius+y)
       + "a" + radius + "," + radius + " 0 0 1 " + radius + ",-" + radius
       + "h" + (width - 2*radius)
       + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
       + "v" + (height - 2 * radius)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
       + "h" + (2*radius - width)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
       + "z";
}