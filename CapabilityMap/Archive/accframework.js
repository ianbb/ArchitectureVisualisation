
function accountabilityframe(jdata,pronodes){            
    var body=d3.select(".framebody");
    var n0={x:0,y:0,w:0,h:0,id:0,name:jdata.name,size:0, children:[]};
    tree(jdata,n0,pronodes);  
    
    processtree=n0;

    var n1={x:n0.x, y:n0.y, w:n0.w,h:n0.h,id:0, name: n0.name, children: n0.children.filter( function(d,i) { return i >= 0 && i < 3 ; })};  
    layout(n1,0,0);
    //print("--",n1);

    var pro=svg.selectAll(".set1")
            .data(n1.children)
            .enter().append("g")            
            .attr("class","set1")            
            .attr("transform", function(d) { return "translate(2," + accframe.start + ")" ; })
            .call(drawchild);

    var n2={x:0, y:n1.h+pad, w:0,h:0, id:0, name: n0.name, children: n0.children.filter( function(d,i) { return i >= 3 && i <= 6 ; })}; 
    layout(n2,0,0);
    pro=svg.selectAll(".set2")
            .data(n2.children)
            .enter().append("g")
            .attr("class","set2")
            .attr("transform", function(d) { return "translate(0," + ( accframe.height+ n1.h) + ")" ; }) 
            .call(drawchild);
}

function tree(data,node,pronodes){ 
   pseudoid++;
   if(data.children){
      for( var k=0; k < data.children.length ; k++){  
          var nn={x:0,y:0,w:0,h:0,id:0,name:data.children[k].name,size:0, children:[]}; 

          nn.id=getprocessid(pronodes,nn.name);  
          if(nn.id == 0)nn.id=pseudoid++;
                    
          if (data.children[k].size) nn.size=data.children[k].size;
          
          node.children.push(nn);
          tree(data.children[k],nn,pronodes);
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

function layout(node) {
      var x=pad,y=pad,z=gridCell.height/1.25;      
      var count=0;
      for( var k=0; k < node.children.length ; k++){  
            count += node.children[k].children !=null ? node.children[k].children.length : 0;        
      }    
    
     if(count==0) {
        for( var k=0; k < node.children.length ; k++){  
            if(k == 4){
                 x+=gridCell.width+pad;
                 y=pad;
            }
            node.children[k].w=gridCell.width;
            node.children[k].h=gridCell.height; 
            node.children[k].x=x;             
            node.children[k].y=y; 
            y+=gridCell.height+pad;
      }
       
       node.w = node.children.length > 4 ? gridCell.width*2+3*pad : gridCell.width+2*pad;                            
       node.h = node.children.length > 4  ? pad+4*(gridCell.height+pad)+z : pad+node.children.length*(gridCell.height+pad)+z ; 

     }
     else {                     
         for( var k=0; k < node.children.length ; k++){ 
                node.children[k].x=x;
                node.children[k].y=y;
                layout(node.children[k]);
                node.w += node.children[k].w;                            
                node.h =  node.children[k].h > node.h ? node.children[k].h : node.h; 
                x+=node.children[k].w+pad;                     
          }
          node.w+=(node.children.length+1)*pad;       
          node.h+=gridCell.height;
     }
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
              .attr("fill","#fff")
              .on("mouseover", promouseover)
              .on("mouseout", promouseout);

          gpro.append("text")  
              .attr("x", 0)
              .attr("dy",-1)                    
              .style("fill","#000")  
              .attr("transform", function(d) { return "translate(" + d.w/2 + "," + gridCell.height/2 + ")" ; })  
              .text(function(d, i) { return d.name ; })            
              .call(wrap,d.w);
          
      var cpro=gpro.selectAll(".gchildren")
                      .data(d.children) 
                      .enter().append("g") ;

          cpro.call(drawchild);       
    });
}