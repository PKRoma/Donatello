/**
* Donatello - A pure CSS vector drawing library.
*
* Provided under the MIT license.
* See LICENSE file for full text of the license.
* Copyright 2011 Dan Newcome.
*//**
* Donatello objects are used to represent shapes drawn
* in the scene. The scene consists of a tree of these.
*
* id - id string of an existing DOM element or a reference
* to the DOM element itself.
* x/y, w/h - position and size
*/function Donatello(a,b,c,d,e){this.properties={},this.cosmeticProperties={};if(typeof a=="string"){var f=document.getElementById(a);Donatello.createElement(b,c,d,e,f),this.dom=f}else a!=null&&(this.dom=a)}Donatello.getTransform=function(){var a,b=document.createElement("div");return Donatello.transform==undefined?(typeof b.style.transform!="undefined"?a="transform":typeof b.style.webkitTransform!="undefined"?a="webkitTransform":typeof b.style.MozTransform!="undefined"?a="MozTransform":typeof b.style.msTransform!="undefined"?a="msTransform":typeof b.style.OTransform!="undefined"?a="OTransform":a=null,console.log("css transform: "+a),Donatello.transform=a):a=Donatello.transform,a},Donatello.merge=function(a,b){for(var c in a)b[c]=a[c];return b},Donatello.prototype.attrMap={fill:"backgroundColor",stroke:"borderColor","stroke-style":"borderStyle",r:"borderRadius",type:null,children:null,transform:Donatello.getTransform()},Donatello.prototype.draw=function(){},Donatello.paper=function(a,b,c,d,e,f){return new Donatello(a,b,c,d,e,f)},Donatello.createLinearGradient=function(a,b,c){a=Math.floor(a/45);var d="center top, center bottom";switch(a){case 0:d="left center, right center";break;case 1:d="left bottom, right top";break;case 2:d="center bottom, center top";break;case 3:d="right bottom, left top";break;case 4:d="right center, left center";break;case 5:d="right top, left bottom";break;case 6:d="center top, center bottom";break;case 7:d="left top, right bottom";break;case 8:d="left center, right center"}var e;switch(Donatello.getTransform()){case"MozTransform":e="-moz-linear-gradient("+a*45+"deg,"+b+", "+c+")";break;case"webkitTransform":e="-webkit-gradient(linear, "+d+", from("+b+"), to("+c+"))";break;case"msTransform":var f=Math.floor(a%4/2);e="progid:DXImageTransform.Microsoft.gradient(GradientType="+f+', startColorstr="'+b+'", endColorstr="'+c+'")';break;case"OTransform":e="-o-linear-gradient("+a*45+"deg,"+b+","+c+")"}return e},Donatello.prototype.rotate=function(a){this.dom.style[Donatello.getTransform()]+="rotate("+a+"deg)"},Donatello.prototype.clear=function(){while(this.dom.hasChildNodes())this.dom.removeChild(this.dom.lastChild)},Donatello.prototype["delete"]=function(){this.dom.parentNode.removeChild(this.dom)},Donatello.prototype.node=function(){return this.dom},Donatello.prototype.attr=function(a){if(a=="undefined")return this.properties;Donatello.merge(a,this.properties);var b=this.attrMap;for(attr in a)if(b[attr]!=null)if(attr=="r"||attr=="stroke-width")this.dom.style[b[attr]]=a[attr]+"px";else if(attr=="fill")if(a.fill&&a.fill.length>7){var c=a.fill;this.dom.style.backgroundImage=Donatello.createLinearGradient(c.substr(0,2),c.substr(3,7),c.substr(11,7))}else this.dom.style[b[attr]]=a[attr];else attr!="scale"&&(this.dom.style[b[attr]]=a[attr]);else if(attr!="stroke-width"&&attr!="x"&&attr!="y"&&attr!="w"&&attr!="h"&&attr!="type"&&attr!="children")if(typeof this.styleableElements!="undefined")for(var d=0;d<this.styleableElements.length;d++)console.log("setting "+attr+" to "+a[attr]),this.styleableElements[d].style[attr]=a[attr];else this.dom.style[attr]=a[attr];return this.draw(),this},Donatello.prototype.rect=function(a,b,c,d,e){return this.pgram(a,b,c,d,null,e)},Donatello.prototype.pgram=function(a,b,c,d,e,f){f=Donatello.attrDefaults(f);var g=Donatello.createElement(a,b,c,d,"div");g.style.borderWidth=f["stroke-width"]+"px",e!=null&&(g.style[Donatello.getTransform()]+="skew("+e+"deg)"),this.dom.appendChild(g);var h=new Donatello(g);return h.attr(f),h},Donatello.prototype.text=function(a,b,c,d){var e=Donatello.createElement(a,b,null,null,"div");e.innerHTML=c,this.dom.appendChild(e);var f=new Donatello(e);return f.attr(d),f},Donatello.prototype.image=function(a,b,c,d,e,f){var g=Donatello.createElement(a,b,c,d,"img");g.src=e,this.dom.appendChild(g);var h=new Donatello(g);return h.attr(f),h},Donatello.createElement=function(a,b,c,d,e){var f;return typeof e=="string"?f=document.createElement(e):f=e,f.style.position="absolute",f.style.top=b+"px",f.style.left=a+"px",f.style.width=c+"px",f.style.height=d+"px",f},Donatello.attrDefaults=function(a){return a=a||{},a["stroke-width"]||(a["stroke-width"]=1),a.stroke||(a.stroke="black"),a.fill||(a.fill="transparent"),a["stroke-style"]||(a["stroke-style"]="solid"),a},Donatello.Circle=function(a,b,c,d,e){e=Donatello.attrDefaults(e);var f=e["stroke-width"],g=e.stroke,h=e.fill,i=e["stroke-style"];this.properties={x:b,y:c,r:d,"stroke-width":f,"stroke-style":i,stroke:g,fill:h};var j=Donatello.createElement(b-d-f,c-d-f,2*d,2*d,"div");a.dom.appendChild(j),this.dom=j,this.attr(e)},Donatello.Circle.prototype=new Donatello(null),Donatello.prototype.circle=function(a,b,c,d){return new Donatello.Circle(this,a,b,c,d)},Donatello.Circle.prototype.draw=function(){var a=this.properties.r,b=this.properties["stroke-width"],c=this.properties.stroke,d=this.properties.fill,e=this.properties["stroke-style"],f=this.dom;f.style.borderRadius=a+b+"px",f.style.borderWidth=b+"px",f.style.borderStyle=e,f.style.borderColor=c,f.style.backgroundColor=d},Donatello.Ellipse=function(a,b,c,d,e,f){f=Donatello.attrDefaults(f);var g=f["stroke-width"],h=f.stroke,i=f.fill,j=f["stroke-style"];this.properties={x:b,y:c,rx:d,ry:e,"stroke-width":g,"stroke-style":j,stroke:h,fill:i};var k=Donatello.createElement(b-d-g,c-e-g,2*d,2*e,"div");a.dom.appendChild(k),this.dom=k,this.attr(f)},Donatello.Ellipse.prototype=new Donatello(null),Donatello.prototype.ellipse=function(a,b,c,d,e){return new Donatello.Ellipse(this,a,b,c,d,e)},Donatello.Ellipse.prototype.draw=function(){var a=this.properties.r,b=this.properties.rx,c=this.properties.ry,d=this.properties["stroke-width"],e=this.properties.stroke,f=this.properties.fill,g=this.properties["stroke-style"],h=this.dom;h.style.borderRadius=b+d+"px / "+(c+d)+"px",h.style.borderWidth=d+"px",h.style.borderStyle=g,h.style.borderColor=e,h.style.backgroundColor=f},Donatello.Arc=function(a,b,c,d,e,f,g){g=Donatello.attrDefaults(g);var h=g["stroke-width"],i=g.stroke,j=g.fill,k=g["stroke-style"];this.properties={x:b,y:c,r:d,t1:e,t2:f,"stroke-width":h,"stroke-style":k,stroke:i,fill:j};var l=f-e,m=Donatello.createElement(b-d-h,c-d-h,2*d,2*d,"div"),n=Donatello.createElement(b-d-h,c-d-h,2*d,2*d,"div"),o=Donatello.createElement(b-d-h,c-d-h,2*d,2*d,"div"),p=Donatello.createElement(b-d-h,c-d-h,2*d,2*d,"div"),q=Donatello.createElement(b-d-h,c-d-h,2*d,2*d,"div");m.appendChild(n),m.appendChild(o),m.appendChild(p),m.appendChild(q),this.styleableElements=[n,o,p,q],m.style[Donatello.transform+"Origin"]="100% 100%",a.dom.appendChild(m),this.dom=m,this.draw(f)},Donatello.Arc.prototype=new Donatello(null),Donatello.prototype.arc=function(a,b,c,d,e,f){return new Donatello.Arc(this,a,b,c,d,e,f)},Donatello.Arc.prototype.draw=function(a){function h(a,h){a.style.borderRadius=c+d+"px",a.style.borderWidth=d+"px",a.style.borderStyle=g,a.style.borderColor=e,a.style.borderBottomColor="transparent",a.style.borderLeftColor="transparent",a.style.borderRightColor="transparent",a.style.backgroundColor=f,b<90?a.style[Donatello.transform]="skew("+ -(90-b)+"deg)rotate("+(h-45)+"deg)":a.style[Donatello.transform]="rotate("+(h-45)+"deg)"}var b=a-this.properties.t1;b<90?(this.dom.style.overflow="hidden",this.dom.style[Donatello.transform]="skew("+(90-b)+"deg)"):(this.dom.style.overflow="visible",this.dom.style[Donatello.transform]="skew(0deg)");var c=this.properties.r,d=this.properties["stroke-width"],e=this.properties.stroke,f=this.properties.fill,g=this.properties["stroke-style"];for(var i=0;i<4;i++)h(this.dom.children[i],(b-90)*i/3)},Donatello.Line=function(a,b,c,d,e,f){f=Donatello.attrDefaults(f);var g=f["stroke-width"];this.properties={x:b,y:c,dx:d,dy:e,"stroke-width":g};var h=f.stroke,i=f.fill,j=f["stroke-style"],k=Donatello.createElement(b,c,0,0,"div");this.attrMap["stroke-width"]="borderTopWidth",this.attrMap["stroke-style"]="borderTopStyle",this.attrMap.stroke="borderTopColor",this.dom=k,this.draw(f),k.style[Donatello.getTransform()+"Origin"]="0px 0px",a.dom.appendChild(k),this.attr(f)},Donatello.Line.prototype=new Donatello(null),Donatello.Line.prototype.draw=function(a){var b=this.properties.x,c=this.properties.y,d=this.properties.dx,e=this.properties.dy,f=this.properties["stroke-width"],g=Math.sqrt(d*d+e*e);this.dom.style.width=g+"px",this.dom.style.height="0px";var h=Math.asin(Math.abs(e)/g);h*=180/Math.PI,d<0&&e>=0?h=180-h:d<0&&e<0?h=180+h:d>=0&&e<0&&(h=360-h),this.dom.style[Donatello.getTransform()]="rotate("+h+"deg) translate(0px, -"+f/2+"px)",this.dom.style.borderTopWidth=f+"px"},Donatello.prototype.line=function(a,b,c,d,e){return new Donatello.Line(this,a,b,c,d,e)}