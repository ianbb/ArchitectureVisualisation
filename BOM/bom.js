    var options = {  
        weekday: "long", year: "numeric", month: "short",  
        day: "numeric", hour: "2-digit", minute: "2-digit"  
    }; 
    
    function prettydate(raw){
        return raw.toLocaleTimeString("en-au", options); 
    }
    
    function simple(raw){
        var dt = utcFormat.parse(raw);
        return dt.getFullYear() + dt.getMonth() + dt.getDay();
    }

    var bload=true;
    var ID=0;
    var utcFormat  = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
    var locations=[];
    var currentValue = 100;
    var random = d3.random.normal(0, 20.0);
    var HEADERS=["District","Location","Date Time Issued", "Max","Min","Summary","Precipitation","Max Air Temperature"];
    var PROPERTIES=["districtd","locationd","date1", "max","min","precis","precipitationRange","maxAirTemperature"];

    var table = d3.select(".forecasts"),
    thead = table.append("thead").attr("align","left");
    tbody = table.append("tbody");
                 
    thead.append("tr")
            .selectAll("th")
            .data(HEADERS)
            .enter()
            .append("th")
                .text(function(d) { return d; });

    var tree = d3.layout.treelist()
            .childIndent(24)
            .nodeHeight(16);
    
    d3.select(".districts")
        .append("ul")
        .classed("treelist", "true");

    function drawLineGraph(data, yLabel) {

        var containerHeight= 400;
        var containerWidth=1000;
        var svg = d3.select(".chart")
            .attr("width", containerWidth)
            .attr("height", containerHeight);

        var margin = { top: 20, left: 40, right: 20, bottom: 40 };
        
        var height = containerHeight - margin.top - margin.bottom;
        var width = containerWidth - margin.left - margin.right;

        var xDomain = d3.extent(data, function(d) { return d[0]; })
        var yDomain = [0,50]; //d3.extent(data, function(d) { return d[1]; });

        var xScale = d3.time.scale().range([0, width]).domain(xDomain);
        var yScale = d3.scale.linear().range([height, 0]).domain(yDomain);

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        var line = d3.svg.line()
            .x(function(d) { return xScale(d[0]); })
            .y(function(d) { return yScale(d[1]); });

        var area = d3.svg.area()
            .x(function(d) { return xScale(d[0]); })
            .y0(function(d) { return yScale(d[1]); })
            .y1(height);

        var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
        
        g.append('path')
            .datum(data)
            .attr('class', 'area')
            .attr('d', area);

        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(xAxis);

        g.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .attr('text-anchor', 'end')
                .text(yLabel);

        g.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line);

        g.selectAll('circle').data(data).enter().append('circle')
            .attr('cx', function(d) { return xScale(d[0]); })
            .attr('cy', function(d) { return yScale(d[1]); })
            .attr('r', 5)
            .attr('class', 'circle');


        var focus = g.append('g').style('display', 'none');
            
        focus.append('line')
            .attr('id', 'focusLineX')
            .attr('class', 'focusLine');
        focus.append('line')
            .attr('id', 'focusLineY')
            .attr('class', 'focusLine');
        focus.append('circle')
            .attr('id', 'focusCircle')
            .attr('r', 5)
            .attr('class', 'circle focusCircle');

        var bisectDate = d3.bisector(function(d) { return d[0]; }).left;

        g.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', function() { focus.style('display', null); })
            .on('mouseout', function() { 
                focus.style('display', 'none'); 
                var itm=d3.selectAll(".selected")
                        .style("background-color","#fff")    
                        .style("color","Black")
                        .style("outline", "none")                
                        .classed("selected",false); })
            .on('mousemove', function() { 
                var mouse = d3.mouse(this);
                var mouseDate = xScale.invert(mouse[0]);
                var i = bisectDate(data, mouseDate); // returns the index to the current data item

                var d0 = data[i - 1]
                var d1 = data[i];
                // work out which date value is closest to the mouse
                var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;

                var x = xScale(d[0]);
                var y = yScale(d[1]);

                focus.select('#focusCircle')
                    .attr('cx', x)
                    .attr('cy', y);
                focus.select('#focusLineX')
                    .attr('x1', x).attr('y1', yScale(yDomain[0]))
                    .attr('x2', x).attr('y2', yScale(yDomain[1]));
                focus.select('#focusLineY')
                    .attr('x1', xScale(xDomain[0])).attr('y1', y)
                    .attr('x2', xScale(xDomain[1])).attr('y2', y);

                var itm=d3.selectAll(".selected")
                        .style("background-color","#fff")    
                        .style("color","Black")
                        .style("outline", "none")                
                        .classed("selected",false);

                var itm=d3.selectAll(".datarow")
                        .filter(function(dd, i) { return dd.id == d[2] ;} );

                itm.style("background-color","Orangered")
                    .style("color","white")
                    .style("outline", "thin solid Orange")
                    .classed("selected",true);
            });

    };
    
    function tabulate(data) {
        
        var rows = tbody.selectAll(".datarow").data(data,function(d) { return d.id; });
        rows.enter()
            .append("tr")
            .attr("class","datarow")
            .on('mouseover', rowhigh)
            .on('mouseout', rowlow);

            rows.exit().remove();
        
        var cells = rows.selectAll(".datacell")
            .data(function(row) {
                return PROPERTIES.map(function(column) {
                    return {column: column, value: row[column]};
                });
            });

        cells.enter()
            .append("td")
            .attr("class","datacell")
            .text(function(d) { return d.value; });
                                        
    }

    function rowhigh(p) {
        d3.select(this)
            .style("background-color","Orangered")
            .style("color","white")
            .style("outline", "thin solid Orange");
    }

    function rowlow(p) {
        d3.select(this)
            .style("background-color","#fff")    
            .style("color","Black")
            .style("outline", "none");
    }

    function update(loc){
        
        var data=[];
        var url="https://tck4jrhqah.execute-api.ap-southeast-2.amazonaws.com/test/bomforecast/v1/"+loc;
        d3.json(url, function(error, content) {
            content.forecasts=content.forecasts.sort(function(a, b) { return utcFormat.parse(a.utcIssuedDateTime) - utcFormat.parse(b.utcIssuedDateTime); });
            //content.forecasts = [...new Set(content.forecasts.map(d => simple(d.utcIssuedDateTime)))];
            content.forecasts.forEach(function(d) {
                d.date1 = prettydate(utcFormat.parse(d.utcIssuedDateTime) );    //  <= Change to date1
                d.regiond=d.region.description;         
                d.districtd=d.district.description; 
                d.locationd=d.location.description;                 
                d.locationc=d.location.code;     
                d.max = +d.max;                
                d.id=++ID;                                 
                data.push([utcFormat.parse(d.utcIssuedDateTime), d.max, d.id]);
                
            });        
              
            // draw line graph
            drawLineGraph(data, "Temperature");
            
            // render the table
            tabulate(content.forecasts);

        });
                      
    }
                              
    function districts() {
      
        var rest={ name : "WA", children :[] ,level: 0};
        var c=rest.children;
                
        d3.json("https://tck4jrhqah.execute-api.ap-southeast-2.amazonaws.com/test/bomforecast/v1/districts", function (err, data) { 
            var a=data.locations.sort(function(a, b) { 
                return ( a.districtDescription+a.locationDescription == b.districtDescription+b.locationDescription ? 0 : +(a.districtDescription+a.locationDescription > b.districtDescription+b.locationDescription) || -1 ); 
            });     
            
            for (var key in a)  
            {
                var b=a[key];
                var itm =c.find(byDistrict, [b.districtDescription]);
                if( itm != null )itm.children.push({ name: b.locationDescription, level: 2, code: b.locationCode} );
                else c.push({ name : b.districtDescription ,level: 1, children : [ {name: b.locationDescription, level: 2, code: b.locationCode } ] } );
            }
            data = rest;                       
            render(data, data);            
        
        });
              
    }

    function byDistrict(child) {
        if (child.name === this[0]) {
            return child;
        }
        return null;
    }

    function mouseover(d) {
        d3.select(this).classed("selected", true);
    }

    function mouseout(d) {
        d3.selectAll(".selected").classed("selected", false);
    }

    function toggleChildren(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        } else {
            update(d.code);
        }
    }
  
     function render(data, parent) {
        var id = 0;
        var origin= {x:80,y:70};   
        var nodes = tree.nodes(data), duration = 250;                
        var ul = d3.select(".treelist");
        var nodeEls = ul.selectAll("li.node").data(nodes, function (d) {d.id = d.id || ++id; return d.id; });
        
        var entered = nodeEls.enter().append("li")
                    .classed("node", true)
                    .style("top",parent.y +"px")
                    .style("opacity", 0)
                    .style("height", tree.nodeHeight() + "px")
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("click", function (d) {
                        toggleChildren(d);
                        render(data, d);})
                
        //add arrows if it is a folder
        entered.append("span").attr("class", function (d) {
                var icon = d.children ? " glyphicon-chevron-down"
                    : d._children ? "glyphicon-chevron-right" : "";
                return "caret glyphicon " + icon; });
        //add icons for folder for file
        entered.append("span").attr("class", function (d) {
                var icon = d.children || d._children ? "glyphicon glyphicon-th-large"
                    : "glyphicon  glyphicon-unchecked";
                return "glyphicon " + icon;
        });

        //add text
        entered.append("span")
                .attr("class", "leaf")
                .html(function (d) { return d.name; });
        //update caret direction
        nodeEls.select("span.caret").attr("class", function (d) {
                var icon = d.children ? " glyphicon-chevron-down"
                    : d._children ? "glyphicon-chevron-right" : "";
                return "caret glyphicon " + icon;
        });

        //update position with transition
        nodeEls.transition()
                .duration(duration)
                    .style("top", function (d) { return (d.y - tree.nodeHeight()+origin.y) + "px";})
                    .style("left", function (d) { return d.x+origin.x + "px"; })
                    .style("opacity", 1);

        nodeEls.exit().remove();

        if(bload){
            bload=false;
            var mini=d3.select("ul.treelist").selectAll("li.node").filter(function(d,i) { return d.level==1 ;} );
            mini.each(function (d) {
                 toggleChildren(d);
                 render(data, d)
                 }); 
        }

    } 

    districts();

    // update data
    update("WA_PT053");
    