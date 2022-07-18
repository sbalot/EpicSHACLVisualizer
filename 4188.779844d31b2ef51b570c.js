"use strict";(self.webpackChunkviewer=self.webpackChunkviewer||[]).push([[4188,2063],{28622:function(e,t){class r{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}r.prototype.termType="BlankNode",t.Z=r},46003:function(e,t){class r{equals(e){return!!e&&e.termType===this.termType}}r.prototype.termType="DefaultGraph",r.prototype.value="",t.Z=r},8393:function(e,t){class r{constructor(e,t,r){this.value=e,this.language=t,this.datatype=r}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value&&e.language===this.language&&e.datatype.equals(this.datatype)}}r.prototype.termType="Literal",t.Z=r},87148:function(e,t){class r{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}r.prototype.termType="NamedNode",t.Z=r},92335:function(e,t){class r{constructor(e,t,r,a){this.subject=e,this.predicate=t,this.object=r,this.graph=a}equals(e){return!!e&&("Quad"===e.termType||!e.termType)&&e.subject.equals(this.subject)&&e.predicate.equals(this.predicate)&&e.object.equals(this.object)&&e.graph.equals(this.graph)}}r.prototype.termType="Quad",r.prototype.value="",t.Z=r},68925:function(e,t){class r{constructor(e){this.value=e}equals(e){return!!e&&e.termType===this.termType&&e.value===this.value}}r.prototype.termType="Variable",t.Z=r},4325:function(e,t){t.Z=function(e,t){if(!t)return null;if("BlankNode"===t.termType)return e.blankNode(t.value);if("DefaultGraph"===t.termType)return e.defaultGraph();if("Literal"===t.termType)return e.literal(t.value,t.language||e.namedNode(t.datatype.value));if("NamedNode"===t.termType)return e.namedNode(t.value);if("Quad"===t.termType){const r=e.fromTerm(t.subject),a=e.fromTerm(t.predicate),u=e.fromTerm(t.object),n=e.fromTerm(t.graph);return e.quad(r,a,u,n)}if("Variable"===t.termType)return e.variable(t.value);throw new Error(`unknown termType ${t.termType}`)}},24188:function(e,t,r){r.r(t),r.d(t,{default:function(){return y}});var a=r(28622),u=r(46003),n=r(4325),o=r(8393),s=r(87148),l=r(92335),i=r(68925);const p=new s.Z("http://www.w3.org/1999/02/22-rdf-syntax-ns#langString"),c=new s.Z("http://www.w3.org/2001/XMLSchema#string");class d{constructor(){this.init()}init(){this._data={blankNodeCounter:0,defaultGraph:new u.Z}}namedNode(e){return new s.Z(e)}blankNode(e){return e=e||"b"+ ++this._data.blankNodeCounter,new a.Z(e)}literal(e,t){return"string"==typeof t?new o.Z(e,t,p):new o.Z(e,"",t||c)}variable(e){return new i.Z(e)}defaultGraph(){return this._data.defaultGraph}quad(e,t,r,a=this.defaultGraph()){return new l.Z(e,t,r,a)}fromTerm(e){return(0,n.Z)(this,e)}fromQuad(e){return(0,n.Z)(this,e)}}d.exports=["blankNode","defaultGraph","fromQuad","fromTerm","literal","namedNode","quad","variable"];var h=new d;const m={apply:(e,t,r)=>e(r[0]),get:(e,t)=>e(t)};var y=function(e,{factory:t=h}={}){const r=(r="")=>t.namedNode(`${e}${r.raw||r}`);return"undefined"==typeof Proxy?r:new Proxy(r,m)}}}]);