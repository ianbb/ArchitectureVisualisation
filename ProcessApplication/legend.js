function setmenu(){
    
    doAllLegends();
}

function doAllLegends()
{
   
    var legend6 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,30)" ; });
        
        legend6.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbshowall  type=checkbox />Visualise All</label></form>")
            .on("click",function() { setShowAll(this);});

    var legend5 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,50)" ; });
        
        legend5.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbshowapps  type=checkbox />Applications</label></form>")
            .on("click",function() { setShowApps(this);});

   var legend4 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,70)" ; });
        
        legend4.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbshowpros  type=checkbox />Processes</label></form>")
            .on("click",function() { setShowPros(this);});

    var legend0 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,100)" ; });
        
        legend0.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbstrategic type=checkbox />Strategic Contribution</label></form>")
            .on("click",function() { setStrategic(this);});

    var cat= [{name:"Low",color:"#ff6699",txt:"L" }, {name:"Medium",color:"#ff0066",txt:"M"},{name:"high",color:"#7030a0",txt:"H"} ]
    var legend = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,120)" ; });

        legend.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbrisk type=checkbox />Risk Mitigation Contribution</label></form>")
            .on("click",function() { setRisk(this);});

    dolegend(cat,legend,0,false);

    var mat= [{name:"Green",color:"#33a02c",txt:"G" }, {name:"Amber",color:"#ff7f00",txt:"A"},{name:"Red",color:"#e31a1c",txt:"R"} ]
    var legend2 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,220)" ; });

        legend2.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbmaturity type=checkbox />Maturity Assessment</label></form>")
            .on("click",function() { setMaturity(this);});
    
    dolegend(mat,legend2,0,false);


    var fin= [{name:"1% or Less",color:"#0070c0",txt:"$" },{name:"1% to 3%",color:"#0070c0",txt:"$$"}, {name:"3% to 6%",color:"#0070c0",txt:"$$$"},{name:"6% or more",color:"#0070c0",txt:"$$$$"} ]
    var legend3 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,320)" ; });
        
        legend3.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input checked id=cbfin type=checkbox />Financial Overview</label></form>")
            .on("click",function() { setFinancial(this);});
            
    dolegend(fin,legend3,25,true);
 
    var leg7= [{name:"In Scope",color:"#f6ff47",txt:"S"},{name:"Has Impact/Dependency",color:"#FF984C",txt:"I"} ]
    var legend7 = d3.select(".legend")
        .append("g")
        .attr("transform", function(d,i) { return "translate(0,440)" ; });
        
        legend7.append("foreignObject")
            .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
            .attr("width", 150)
            .attr("height", 20)
            .append("xhtml:body")
            .html("<form><label class='nowrap'><input id=cbrefresh type=checkbox />Refresh</label></form>")
            .on("click",function() { setRefresh(this);});
            
    dolegend(leg7,legend7,0,false);


    var leg8= [{name:"Primary",color:"#ff0016",txt:"P"},{name:"Secondary",color:"#FF80C0",txt:"S"} ]
    var legend8 = d3.select(".legend")
            .append("g")
            .attr("transform", function(d,i) { return "translate(0,520)" ; });
            
            legend8.append("foreignObject")
                .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
                .attr("width", 150)
                .attr("height", 20)
                .append("xhtml:body")
                .html("<form><label class='nowrap'><input id=cbfocus type=checkbox />Focus Area</label></form>")
                .on("click",function() { setFocus(this);});
                
    dolegend(leg8,legend8,0,false);
    
    var leg9= [{name:"Non Customer facing",color:"#fff",txt:"N"},{name:"Influences interaction",color:"#ccffcc",txt:"I"},{name:"Direct Customer interaction",color:"#00ff00",txt:"D"}  ]
    var legend9 = d3.select(".legend")
            .append("g")
            .attr("transform", function(d,i) { return "translate(0,600)" ; });
            
            legend9.append("foreignObject")
                .attr("transform", function(d,i) { return "translate(-10," + ((i*18)-25) + ")" ; })
                .attr("width", 150)
                .attr("height", 20)
                .append("xhtml:body")
                .html("<form><label class='nowrap'><input id=cbcustom type=checkbox />Customer interaction</label></form>")
                .on("click",function() { setcustom(this);});
                
     dolegend(leg9,legend9,0,false);
}

function dolegend(data,legend,inc,dotext){
    
   
    var category=legend.selectAll(".tt")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d,i) { return "translate(10,0)"; } )
            .attr("class","category");
    
     category.append("rect")        
            .attr("transform", function(d,i) { return "translate(" + (0) + "," + (i*18) + ")" ; })
            .style("width" , function(d) { return (9+6*d.txt.length) + "px";})
            .attr("stroke","#bbb")
            .attr("fill", function(d,i) { return data[i].color; });
    
    if(dotext){
        category.append("text")        
                .attr("transform", function(d,i) { return "translate(" + (2) + "," + (12+(i*18)) + ")" ; })
                .text(function(d) { return d.txt; })
                .style("fill", "#fff");
    }

    category.append("text")
            .attr("text-anchor", "start")
            .attr("transform", function(d,i) { return "translate(" + (20+inc) + "," + (12+(i*18)) + ")" ; })
            .text(function(d) { return d.name; });
}

function isclickHold()
{    
    var cb= document.getElementById("cbclickhold");
    return cb.checked;
}

function importance()
{    
    //var s= document.getElementById("searchField");
    return 1; //s.value;
}

function setMaturity(obj)
{
    var val=document.getElementById("cbmaturity").checked;
    d3.selectAll(".mature").style("opacity", function() { return  val ? 1.0 :0.0;});
}


function setStrategic(obj)
{
    var val=document.getElementById("cbstrategic").checked;
    d3.selectAll(".cell text").style("fill", function(d) { return d.type==3 && val ? "#fff" : "#000" ; } ) ;   
    d3.selectAll(".cell .main").filter(function (d){ return d.customer !="N";}).style("stroke","#bbb");   
    var cc=document.getElementById("cbcustom"); 
    d3.selectAll(".financialtxt").style("fill", "#fff") ; 
    if( val ){
        cc.checked=false;
        d3.selectAll(".cell .main").style("fill",function(d) { return  color[d.type-1] ;});        
        return;
    }
    d3.selectAll(".cell .main").style("fill","#fff");      
}

function setFinancial(obj)
{
    var val=document.getElementById("cbfin").checked;
    d3.selectAll(".financial").style("opacity", function() { return  val ? 1.0 :0.0;});
    d3.selectAll(".financialtxt").style("opacity", function() { return  val ? 1.0 :0.0;});
}

function setRisk(obj)
{
    var val=document.getElementById("cbrisk").checked;
    d3.selectAll(".risk").style("opacity", function() { return  val ? 1.0 :0.0;});
}

function setShowAll(obj)
{
    if( d3.select(".selected").node() ) return;
    var showall=document.getElementById("cbshowall").checked; 
    if(showall){
        document.getElementById("cbshowapps").checked = true;
        document.getElementById("cbshowpros").checked = true;
    }
    setShowApps(null);
    setShowPros(null);
}

function setShowApps(obj)
{
    if(d3.select(".selected").node() ) return;
    var showapps=document.getElementById("cbshowapps").checked;  
    if(!showapps) document.getElementById("cbshowall").checked =false;
    checkAll();
    
    d3.select(".appregion").transition().duration(500).attr("opacity",function(d) { return showapps ? 1.0 :0.0; }); 
}

function setShowPros(obj)
{
    if( d3.select(".selected").node() ) return;
    var showpros=document.getElementById("cbshowpros").checked;   
    if(!showpros) document.getElementById("cbshowall").checked =false;  
    checkAll(); 

    d3.select(".proregion").transition().duration(500).attr("opacity",0.0);   
    svg.selectAll(".set1").transition().duration(500).attr("opacity",function(d) { return showpros ? 1.0 :0.0; });
    svg.selectAll(".set2").transition().duration(500).attr("opacity",function(d) { return showpros ? 1.0 :0.0; });     
}

function checkAll()
{
    var showapps=document.getElementById("cbshowapps").checked;  
    var showpros=document.getElementById("cbshowpros").checked; 
    if(showapps && showpros) document.getElementById("cbshowall").checked =true;
}

function setRefresh(obj)
{
   var rf=document.getElementById("cbrefresh").checked; 
     if(rf){        
        d3.selectAll(".main").filter(function (d){ return d.refresh=="I";})
            .attr("stroke-width","3")
            .style("stroke","#FF984C")
            .attr("stroke-dasharray","10 2");
        d3.selectAll(".main").filter(function (d){ return d.refresh=="Y";})
            .attr("stroke-width","3")
            .style("stroke","#f6ff47");
    }
    else{
        d3.selectAll(".main")
            .attr("stroke-width","1")
            .style("stroke","#bbb")
            .attr("stroke-dasharray","");
    }
 }

function setcustom(obj)
{
    var cc=document.getElementById("cbcustom").checked; 
    var stg=document.getElementById("cbstrategic");
   
    if (cc) {
        stg.checked=!cc;
        d3.selectAll(".cell .main").filter(function (d){ return d.customer=="I";}).style("fill","#ccffcc");
        d3.selectAll(".cell .main").filter(function (d){ return d.customer=="D";}).style("fill","#00ff00");
        d3.selectAll(".cell .main").filter(function (d){ return d.customer =="N";}).style("fill","#fff");                          
    }
    else {
        d3.selectAll(".main").style("fill","#fff");                
    }
    d3.selectAll(".cell text").style("fill", "#000");
    d3.selectAll(".financialtxt").style("fill", "#fff") ;    
}

function setFocus(obj)
{
    var cf=document.getElementById("cbfocus").checked; 
    if(cf){
        var s=d3.selectAll(".main").filter(function (d){ return !(d.focus =="N");});
        s.transition().duration(100).style("opacity",1).each(focusarea);
    }
    else{
        svg.selectAll("path").transition().style("opacity",0).duration(100).remove();
    } 
}

function focusarea(sel){
     var fa= d3.select(this);
 
    var s = document.getElementById("topsvg").getBoundingClientRect();
    var p = this.getBoundingClientRect();
    var x=p.left-s.left-margin.left;
    var y=p.top-s.top; 
    var h=unit*sel.size;
    svg.append("path")
                .attr("transform", function(d,i) { return "translate("+x+","+y+")"; })
                .attr("d",rightRoundedRect(-1,-1,102,h+2,5))
                .attr("stroke-width","3")
                .attr("pointer-events","none")
                .attr("stroke",function(d) { return sel.focus=="P" ?"#ff0016" :"#ff80c0";} )
                .attr("fill","transparent");
}

function caphighlight(sel){
     var fa= d3.select(this);
 
    var s = document.getElementById("topsvg").getBoundingClientRect();
    var p = this.getBoundingClientRect();
    var x=p.left-s.left-margin.left;
    var y=p.top-s.top; 
    var h=unit*sel.size;
    svg.append("path")
                .attr("class","highlight")
                .attr("transform", function(d,i) { return "translate("+x+","+y+")"; })
                .attr("d",rightRoundedRect(-1,-1,101,h+1,5))
                .attr("stroke-width","4")
                .attr("pointer-events","none")
                .attr("stroke","#000") 
                .attr("fill","transparent");
}