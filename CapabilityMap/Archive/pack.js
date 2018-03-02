
Packer = function(w, h) {
  this.init(w, h);
};

Packer.prototype = {

  init: function(w, h) {
    this.root = { x: 0, y: 0, w: w, h: h };
  },

  fit: function(blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else
      return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    return node;
  }

}



function packCapability(map){

    var y=0, x=0;
    for( var j=0; j< map.accountable.length ;j++ ){
        var node = map.accountable[j];
        x=0; 
        for( var i=0; i < node.capability.length ; i++){
            var itm=node.capability[i];
            itm.x = x;
            itm.y = y;
            var comps = itm.component;
            itm.w = (container.single+pad)*itm.size;
            itm.h = (unit+pad)*5;                        
            for( var k=0; k < comps.length ;k++ ){   
                comps[k].w = container.single+pad;
                comps[k].h = (unit+pad)*comps[k].size;                  
            }
            var packer = new Packer(itm.w, itm.h);
            packer.fit(comps);
           // print(itm,comps) ;  
            x+=(container.single+pad)*itm.size;        
         } 
        
    }
}


function filterNodes(type,nodes,appids){
    var sub = [];
    for( var i=0; i < nodes.length ; i++){  
        if( nodes[i].type==1 && nodes[i].weight < parseInt(importance()) )  continue;  
        if( appids !=null &&  appids[nodes[i].id] == null ) continue;
        if(nodes[i].type==type){         
          sub.push(nodes[i]);
        }                
    } 
    return sub;
}

function packset(nodes,w,h, ww,hh,id){
    
    for( var i=0; i < nodes.length ; i++){       
          nodes[i].w=ww+pad;
          nodes[i].h=hh+pad;
    } 

    var packer = new Packer(w, h);
    packer.fit(nodes);
    
    return nodes;
}
