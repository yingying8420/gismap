//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/string/Builder,dojox/encoding/base64"],function(e,h,b){e.provide("dojox.xmpp.util");e.require("dojox.string.Builder");e.require("dojox.encoding.base64");b.xmpp.util.xmlEncode=function(a){a&&(a=a.replace("\x26","\x26amp;").replace("\x3e","\x26gt;").replace("\x3c","\x26lt;").replace("'","\x26apos;").replace('"',"\x26quot;"));return a};b.xmpp.util.encodeJid=function(a){for(var f=new b.string.Builder,g=0;g<a.length;g++){var c=a.charAt(g),d=c;switch(c){case " ":d=
"\\20";break;case '"':d="\\22";break;case "#":d="\\23";break;case "\x26":d="\\26";break;case "'":d="\\27";break;case "/":d="\\2f";break;case ":":d="\\3a";break;case "\x3c":d="\\3c";break;case "\x3e":d="\\3e"}f.append(d)}return f.toString()};b.xmpp.util.decodeJid=function(a){return a=a.replace(/\\([23][02367acef])/g,function(a){switch(a){case "\\20":return" ";case "\\22":return'"';case "\\23":return"#";case "\\26":return"\x26";case "\\27":return"'";case "\\2f":return"/";case "\\3a":return":";case "\\3c":return"\x3c";
case "\\3e":return"\x3e"}return"ARG"})};b.xmpp.util.createElement=function(a,f,g){var c=new b.string.Builder("\x3c");c.append(a+" ");for(var d in f)c.append(d+'\x3d"'),c.append(f[d]),c.append('" ');g?c.append("/\x3e"):c.append("\x3e");return c.toString()};b.xmpp.util.stripHtml=function(a){for(var b=0;b<arguments.length;b++);return a.replace(/<[^>]*?>/gi,"")};b.xmpp.util.decodeHtmlEntities=function(a){var b=e.doc.createElement("textarea");b.innerHTML=a.replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;");
return b.value};b.xmpp.util.htmlToPlain=function(a){a=b.xmpp.util.decodeHtmlEntities(a);a=a.replace(/<br\s*[i\/]{0,1}>/gi,"\n");return a=b.xmpp.util.stripHtml(a)};b.xmpp.util.Base64={};b.xmpp.util.Base64.encode=function(a){return b.encoding.base64.encode(function(a){for(var b=[],c=0;c<a.length;++c)b.push(a.charCodeAt(c));return b}(a))};b.xmpp.util.Base64.decode=function(a){return function(a){var b=[];e.forEach(a,function(a){b.push(String.fromCharCode(a))});return b.join("")}(b.encoding.base64.decode(a))}});