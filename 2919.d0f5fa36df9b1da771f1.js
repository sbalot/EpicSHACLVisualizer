(self.webpackChunkviewer=self.webpackChunkviewer||[]).push([[2919,8473,2341],{82919:function(e,t,r){const n=r(34509),a=r(61605);e.exports=class extends a{constructor(e){super(n,e)}}},34509:function(e,t,r){const n=r(94837),a=r(89738),{finished:s}=r(88473),o=r(96650);e.exports=class extends o{constructor(e,{baseIRI:t="",factory:r=a}={}){const o=new n.StreamParser({baseIRI:t,factory:r});super(o,{objectMode:!0}),o.on("prefix",((e,t)=>{this.emit("prefix",e,t)})),o.on("error",(e=>{this.destroy(e)})),s(this,(()=>{o.end()})),e.pipe(o)}}},89738:function(e,t,r){const n=r(50510);e.exports=n},36322:function(e){class t{constructor(e){this.value=e||"b"+ ++t.nextId}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="BlankNode",t.nextId=0,e.exports=t},50510:function(e,t,r){const n=r(36322),a=r(16723),s=r(68997),o=r(64140),i=r(61985),u=r(23185),p=r(27669),l={namedNode:function(e){return new i(e)},blankNode:function(e){return new n(e)},literal:function(e,t){return"string"==typeof t?-1===t.indexOf(":")?new o(e,t):new o(e,null,l.namedNode(t)):new o(e,null,t)},variable:function(e){return new p(e)},defaultGraph:function(){return l.defaultGraphInstance},triple:function(e,t,r){return l.quad(e,t,r)},quad:function(e,t,r,n){return new u(e,t,r,n||l.defaultGraphInstance)},fromTerm:function(e){return s.call(l,e)},fromQuad:function(e){return s.call(l,e)},defaultGraphInstance:new a};e.exports=l},16723:function(e){class t{equals(e){return!!e&&e.termType===this.termType}}t.prototype.termType="DefaultGraph",t.prototype.value="",e.exports=t},64140:function(e,t,r){const n=r(61985);class a{constructor(e,t,r){this.value=e,this.datatype=a.stringDatatype,this.language="",t?(this.language=t,this.datatype=a.langStringDatatype):r&&(this.datatype=r)}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value&&e.language===this.language&&e.datatype.equals(this.datatype)}}a.prototype.termType="Literal",a.langStringDatatype=new n("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),a.stringDatatype=new n("http://www.w3.org/2001/XMLSchema#string"),e.exports=a},61985:function(e){class t{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="NamedNode",e.exports=t},23185:function(e,t,r){const n=r(16723);class a{constructor(e,t,r,a){this.subject=e,this.predicate=t,this.object=r,this.graph=a||new n}equals(e){return!!e&&("Quad"===e.termType||!e.termType)&&e.subject.equals(this.subject)&&e.predicate.equals(this.predicate)&&e.object.equals(this.object)&&e.graph.equals(this.graph)}}a.prototype.termType="Quad",a.prototype.value="",e.exports=a},27669:function(e){class t{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}t.prototype.termType="Variable",e.exports=t},68997:function(e){e.exports=function(e){if(!e)return null;if("BlankNode"===e.termType)return this.blankNode(e.value);if("DefaultGraph"===e.termType)return this.defaultGraph();if("Literal"===e.termType)return this.literal(e.value,e.language||this.namedNode(e.datatype.value));if("NamedNode"===e.termType)return this.namedNode(e.value);if("Quad"===e.termType){const t=this.fromTerm(e.subject),r=this.fromTerm(e.predicate),n=this.fromTerm(e.object),a=this.fromTerm(e.graph);return this.quad(t,r,n,a)}if("Variable"===e.termType)return this.variable(e.value);throw new Error(`unknown termType ${e.termType}`)}},61605:function(e){e.exports=class{constructor(e,t){this.Impl=e,this.options=t}import(e,t){const r=new this.Impl(e,Object.assign({},this.options,t));return e.on("end",(()=>{r.readable||r.emit("end")})),e.on("error",(e=>{r.emit("error",e)})),r}}},88473:function(e,t,r){(t=e.exports=r(79481)).Stream=t,t.Readable=t,t.Writable=r(64229),t.Duplex=r(56753),t.Transform=r(74605),t.PassThrough=r(82725),t.finished=r(8610),t.pipeline=r(59946)},96650:function(e,t,r){const{finished:n,Readable:a}=r(88473);class s extends a{constructor(e,{end:t=!0,map:r,...n}={}){super({read:s.readFrom(e,{end:t,map:r}),...n})}static readFrom(e,{end:t=!0,map:r=(e=>e)}={}){let a=!1;return n(e,(()=>{a=!0})),async function(){for(;;){const n=e.read();if(n){if(!this.push(r(n)))return!1}else{if(a&&t&&this.push(null),a)return!0;await new Promise((e=>setTimeout(e,0)))}}}}}e.exports=s}}]);