
function accountabilityframe(jdata,pronodes){  
    
    var body=d3.select(".framebody");
    var n0={x:0,y:0,w:0,h:0,id:0,name:jdata.name,size:0, children:[]};
    tree(jdata,n0,pronodes);  
    
    processtree=n0;

    var n1={x:n0.x, y:n0.y, w:n0.w,h:n0.h,id:0, type:0,score:0, name: n0.name, children: n0.children}; //.filter( function(d,i) { return i >= 0 && i < 3 ; })};  
    layout(n1);

    var set=svg.selectAll(".set1")
            .data(n1.children);
        set.transition().duration(500).attr("opacity",1.0);
        set.enter().append("g")            
            .attr("class","set1")            
            .attr("transform", function(d) { return "translate(2," + 0 + ")" ; })
            .call(drawchild);

    /*var n2={x:0, y:n1.h+pad, w:0,h:0, id:0, type:0, name: n0.name, children: n0.children.filter( function(d,i) { return i >= 3 && i <= 6 ; })}; 
    layout(n2);
   
    var set1=svg.selectAll(".set2")
            .data(n2.children);
        set1.transition().duration(500).attr("opacity",1.0);
        set1.enter().append("g")
            .attr("class","set2")
            .attr("transform", function(d) { return "translate(0," + ( n1.h) + ")" ; }) 
            .call(drawchild); */
}

function tree(data,node,pronodes){ 
   pseudoid++;
   if(data.children){
      for( var k=0; k < data.children.length ; k++){  
          var nn={x:0,y:0,w:0,h:0,id:0,type:0,score:0,name:data.children[k].name,size:0, children:[]}; 

          nn.id=getprocessid(pronodes,nn.name);  
          if(nn.id == 0)nn.id=pseudoid++;
                    
          if (data.children[k].size) nn.size=data.children[k].size;
          
          node.children.push(nn);
          tree(data.children[k],nn,pronodes);
      }  
   } 
   else {  
        sources = getsources(node.id,null);      
        for( key in sources ){           
            var nn1={x:0,y:0,w:0,h:0,id:0,type:1,score:links[key].value,name:allnodes[key].name,size:0, children:[]};            
            node.children.push(nn1);        
        }             
    }    
}


function print(indent,data){
     d3.select(".errors").append("div").text(indent+data.x+","+data.y+","+data.w+","+data.h +","+data.name);
     for( var k=0; k < data.children.length ; k++){           
          print(indent+indent,data.children[k]);
      }  
}


function find(pseudoid,node){ 
    if(node.id==pseudoid) return node;
    if(node.children){
        for( var k=0; k < node.children.length ; k++){           
            var nn=find(pseudoid,node.children[k]) ; 
            if (nn!=null) return nn;
        } 
    }
    return null;
}

function listnodes(node,result){     
    for( var k=0; k < node.children.length ; k++){    
          result.push(node.children[k]);       
          listnodes(node.children[k],result);
    } 
    return result;
}

function hasgrandchildApps(node){
    for( var k=0; k < node.children.length ; k++){  
        for( var j=0; j < node.children[k].children.length ; j++){  
            if( node.children[k].children[j].type==1)  
                return true;  
        }
    }   
    return false;
}

function layout(node) {
    var x=pad,y=pad,z=gridCell.height/1.25;      
    var count=0;
    for( var k=0; k < node.children.length ; k++){  
        count += node.children[k].children.length;        
    }    
           
    if(count==0) {      
        var sz=getBox(node.children.length);     
        var yy=0;              
        for( var k=0; k < node.children.length ; k++){              
            if (yy >= sz.y) yy=0;
            y=pad+(gridCell.height+pad)*yy;          
            x=pad+(gridCell.width+pad)*Math.floor(k/sz.y);
            node.children[k].w=gridCell.width;
            node.children[k].h=gridCell.height; 
            node.children[k].x=x;             
            node.children[k].y=y; 
            yy++; 
        }       
        node.w = (pad+gridCell.width)*sz.x+pad;                            
        node.h = (pad+gridCell.height)*sz.y + z+pad;     
    }
    else {                         
        for( var k=0; k < node.children.length ; k++){ 
            node.children[k].x=x;
            node.children[k].y=y;
            layout(node.children[k]);              
        }
        
        var nbx=getBox(node.children.length);
        var srt = node.children;
        srt.sort(numcomp)

        // reposition 
        x=pad,y=pad;    
        var yy=0,wide=0,high=0,maxx=0; 
        
        for( var k=0; k < node.children.length ; k++){             
            node.children[k].x=x;
            node.children[k].y=y;    
            
            var n1=Number(node.children[k].x); n2=Number(node.children[k].w); n3=n1+n2;
            var n4=Number(node.children[k].h); n5=Number(node.children[k].y); n6=n4+n5;
            // increment x & y
            if(yy >= nbx.y-1) {   
                y=pad;
                yy=0;
                if(n3 > wide){
                    x=n3+pad;
                }
                else {
                    x=wide+pad;
                }               
            }
            else {  
                y+=node.children[k].h+pad;
                yy++;
            }                                                     
            if(n3 > wide) wide=n3; 
            if(n6 > high) high=n6;                                          
        }
        node.w=wide+pad;       
        node.h=high+z+pad;
    
    }
    
}

function numcomp(a, b) {
  return b.children.length-a.children.length;
  //return (b.w*b.h)-(a.w*a.h);
}

function drawchild(sel){
      sel.each(function(d) {

      var gee=d3.select(this);
      var gpro=gee.append("g")
                  .attr("class","pro")
                  .attr("transform", function(d) { return "translate(" + d.x + "," + (d.y+gridCell.height/1.25) + ")" ; }) ;
          
          gpro.append("rect")  
              .attr("rx", 6)
              .attr("ry", 6) 
              .attr("height",d.h)
              .attr("width",d.w)
              .attr("fill",function(d) { return d.type== 0 ? "#eee" : "#081D58";}) //00441b
              .style("opacity",function(d) { return d.type== 1 ?  xScale(d.score) : 0.9 ;} )
              .on("mouseover", promouseover)
              .on("mouseout", promouseout);

          gpro.append("text")  
              .attr("x", 0)
              .attr("dy",-1)                                  
              .style("fill",function(d) { return d.type==0 ? "#000" : "#fff";})
              .attr("transform", function(d) { return "translate(" + d.w/2 + "," + gridCell.height/2 + ")" ; })  
              .text(function(d, i) { return d.name; }) //d.type== 1 ? d.name : "["+d.id+"] "+ -- +"[x:"+d.x+"][y:"+d.y +"][w:"+d.w+"]"           
              .call(wrap,d.w);
          
      var cpro=gpro.selectAll(".gchildren")
                      .data(d.children) 
                      .enter().append("g") ;

          cpro.call(drawchild);       
    });
}

function notempty(obj){
    if (obj !=null & obj.length > 0) return true;
    return false;
}


Number.prototype.range = function(first,last){
    return (first < last ? this > first && this <= last : this >= last && this <= first );
}

function getBox(length)
{
    if (length==0) return {x:1,y:1};
    if (length.range(0,1)) return {x:1,y:1};
    if (length.range(1,2)) return {x:1,y:2};    
    if (length.range(2,4)) return {x:2,y:2};   
    if (length.range(4,6)) return {x:3,y:2};   
    if (length.range(6,9)) return {x:3,y:3};   
    if (length.range(9,12)) return {x:4,y:3};    
    if (length.range(12,16)) return {x:4,y:4};   
    if (length.range(16,20)) return {x:5,y:4};   
    if (length.range(20,25)) return {x:5,y:5};   
    if (length.range(25,30)) return {x:6,y:5};    
    if (length.range(30,36)) return {x:6,y:6};        
    if (length.range(36,42)) return {x:7,y:6};  
}
