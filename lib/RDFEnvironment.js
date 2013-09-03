
var IRI = require("./RDFNode.js").IRI;
var BlankNode = require("./RDFNode.js").BlankNode;
var Literal = require("./RDFNode.js").Literal;
var Triple = require("./RDFNode.js").Triple;
var IndexedGraph = require("./IndexedGraph.js").IndexedGraph;
var Profile = require("./Profile.js").Profile;
var PrefixMap = require("./Profile.js").PrefixMap;
var TermMap = require("./Profile.js").TermMap;
var loadRequiredPrefixMap = require("./Default.js").loadRequiredPrefixMap;

/**
 * Implements RDFEnvironment http://www.w3.org/TR/2011/WD-rdf-interfaces-20110510/#idl-def-RDFEnvironment
 */
exports.RDFEnvironment = function(){
	Profile.call(this);
	loadRequiredPrefixMap(this);

	this.filters = {
		s: function(s) { return function(t) { return t.subject.equals(s); }; },
		p: function(p) { return function(t) { return t.predicate.equals(p); }; },
		o: function(o) { return function(t) { return t.object.equals(o); }; },
		sp: function(s,p) { return function(t) { return t.subject.equals(s) && t.predicate.equals(p); }; },
		so: function(s,o) { return function(t) { return t.subject.equals(s) && t.object.equals(o); }; },
		po: function(p,o) { return function(t) { return t.predicate.equals(p) && t.object.equals(o); }; },
		spo: function(s,p,o) { return function(t) { return t.subject.equals(s) && t.predicate.equals(p) && t.object.equals(o); }; },
		describes: function(v) { return function(t) { return t.subject.equals(v) || t.object.equals(v); }; },
		type: function(o) { return function(t) { return t.predicate.equals('http://www.w3.org/1999/02/22-rdf-syntax-ns#type') && t.object.equals(o); }; }
	};
}
exports.RDFEnvironment.prototype = new Profile;
exports.RDFEnvironment.prototype.createBlankNode = function(){
	return new BlankNode;
}
exports.RDFEnvironment.prototype.createNamedNode = function(v){
	return v;
}
exports.RDFEnvironment.prototype.createLiteral = function(value, language, datatype){
	var literal = new Literal(value);
	literal.language = language;
	literal.datatype = datatype;
	return literal;
}
exports.RDFEnvironment.prototype.createTriple = function(s,p,o){
	return new Triple(s,p,o);
}
exports.RDFEnvironment.prototype.createGraph = function(){
	return new IndexedGraph;
}
//exports.RDFEnvironment.prototype.createAction = function(){
//	return new Action;
//}
exports.RDFEnvironment.prototype.createProfile = function(){
	return new Profile;
}
exports.RDFEnvironment.prototype.createTermMap = function(){
	return new TermMap;
}
exports.RDFEnvironment.prototype.createPrefixMap = function(){
	return new PrefixMap;
}
