! function () {
    function t(n, e) {
        return n === e ? !0 : n.children ? n.children.some(function (n) {
            return t(n, e)
        }) : !1
    }

    function n(t) {
        if (t.children) {
            var e = t.children.map(n),
                r = d3.hsl(e[0]),
                a = d3.hsl(e[1]);
            return d3.hsl((r.h + a.h) / 1.5, 1.2 * r.s, r.l / 1.0)
        }
        return t.colour || "#fff"
    }

    function e(t) {
        var n = r(t),
            e = d3.interpolate(d.domain(), [t.x, t.x + t.dx]),
            a = d3.interpolate(u.domain(), [t.y, n]),
            i = d3.interpolate(u.range(), [t.y ? 20 : 0, o]);
        return function (t) {
            return function (n) {
                return d.domain(e(n)), u.domain(a(n)).range(i(n)), x(t)
            }
        }
    }

    function r(t) {
        return t.children ? Math.max.apply(Math, t.children.map(r)) : t.y + t.dy
    }

    function a(t) {
        return .299 * t.r + .587 * t.g + .114 * t.b
    }
   
   function txt(tt) {
        var ar=tt.split(" ");
        var a="";
        var index=0;
      
        if (ar[0].toLowerCase()=="manage") index=1;

        for ( var k=index; k < ( ar.length >= 4 ? 4 : ar.length ) ; k++) {         
            a += ar[k] +" ";
        }
        if( a.length < 20 && ar.length >= 4 ) a += ar[4] ;
        return a;
    }


    var i = 1350,
        l = i,
        di = 1.6,
        o = i / 2,
        d = d3.scale.linear().range([0, 2 * Math.PI]),
        u = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, o]),
        c = 5,
        s = 1e3,
        h = d3.select("#vis");
  
    var f = h.append("svg")
        .attr("width", i + 2 * c)
        .attr("height", l + 2 * c)
        .append("g")
        .attr("transform", "translate(" + [o + c, o + c] + ")");

    var p = d3.layout.partition().sort(null).value(function (t) {return 5.8 - t.depth}),
        x = d3.svg.arc().startAngle(function (t) {return Math.max(0, Math.min(2 * Math.PI, d(t.x)))})
                        .endAngle(function (t) {return Math.max(0, Math.min(2 * Math.PI, d(t.x + t.dx)))})
                        .innerRadius(function (t) {return Math.max(0, t.y ? u(t.y) : t.y)})
                        .outerRadius(function (t) {return Math.max(0, u(t.y + t.dy))});


    d3.json("processwheel.json", function (r, i) {
        function l(n) {
            if(mode()) h.transition(s).attrTween("d", e(n)); 
            m.style("visibility", function (e) { return t(n, e) ? null : d3.select(this).style("visibility") })
                .transition(s)
                .attrTween("text-anchor", function (t) {return function () {return d(t.x + t.dx / di) > Math.PI ? "end" : "start" }})
                .attrTween("transform", function (t) {
                    var n = (t.name || "").split(" ").length > 1;
                    return function () { var e = 180 * d(t.x + t.dx / di) / Math.PI - 90,
                                            r = e + (n ? -.5 : 0);
                                        return "rotate(" + r + ")translate(" + (u(t.y) + c) + ")rotate(" + (e > 90 ? -180 : 0) + ")" }
                })
                .style("fill-opacity", function (e) {return t(n, e) ? 1 : 1e-6})
                .each("end", function (e) { d3.select(this).style("visibility", t(n, e) ? null : "hidden")})
        }

        var o = p.nodes({children: i}),
            h = f.selectAll("path").data(o);

        var path=h.enter().append("path")
            .attr("id", function (t, n) {return "path-" + n})
            .attr("d", x)
            .attr("fill-rule", "evenodd")
            .style("fill", n).on("click", l)           
            .on("mouseover", hoverover)
            .on("mouseout", hoverout);

        path.append("title")
          .text(function(d) { return d.name; });

        var m = f.selectAll("text").data(o),
            y = m.enter().append("text").style("fill-opacity", 1)
                .style("fill", function (t) { return a(d3.rgb(n(t))) < 125 ? "#eee" : "#000"})
                .attr("text-anchor", function (t) { return d(t.x + t.dx / di) > Math.PI ? "end" : "start"})
                .attr("dy", ".2em").attr("transform", function (t) { var n = (t.name || "").split(" ").length > 1,
                                                                    e = 180 * d(t.x + t.dx / di) / Math.PI - 90,
                                                                    r = e + (n ? -.5 : 0);
                                                      return "rotate(" + r + ")translate(" + (u(t.y) + c) + ")rotate(" + (e > 90 ? -180 : 0) + ")"})
                .on("click", l);
            y.append("tspan")
             .attr("x", 0).text(function (t) { return t.depth ? txt(t.name) : "" }); 
    })
} ();

function hoverover(p) {
     d3.select(this)
        .style("opacity",0.7)
        .transition()
        .duration(500); 
  }
  
  function mode(){
    return document.getElementById("cbMode").checked;
  }

  function hoverout(p) {
      d3.select(this)
        .style("opacity",1.0)   
        .transition()
        .duration(500);    
  }