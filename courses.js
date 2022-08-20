exports.action = (data) => {//nécéssite plug push pour envoie sur smart
console.log(data+ClaraIA.reco)

  var filePath = path.resolve('%CD%', './plugins/courses/coursesmemoire.json').replace('\\%CD%', '');
  var fs = require('fs');
  var fichiercourse = fs.readFileSync(filePath,{encoding:'utf8', flag:'r'}); 
  console.log(fichiercourse)
  var objet = JSON.parse(fichiercourse);var longueur = objet.length;var jsonStr = JSON.stringify(objet);var cd=(objet[1]);
try{
    var query=ClaraIA.reco   
    var rgxp = /courses (.+)/i; var query = query.match(rgxp);
    var query=query[1]
    console.log(query+" : recus")
}catch(err){var query=""}

if (data.courses == "on") {      
    
  if(query==""){ClaraIASpeech('rien à ajouter') ;return }
  if (jsonStr.indexOf(query) > -1  ){ClaraIASpeech (query + ", est déja présent dans les courses|tu as peur de manquer|tu vas pas acheter tout en double");}
  else {
         JarvisIASpeech(query+" ajouté à la liste de course")
         objet.push(query); var new_jsonStr = JSON.stringify(objet);        
         fs.writeFile(filePath,new_jsonStr ,  (err) => {});//fin fs write
  }
  return
}//fin if on

if (data.courses == "off") {
    if(query==""){ClaraIASpeech('rien à ajouter') ;return }
    if(objet.indexOf(query)==-1){ClaraIASpeech('inconnu');return}
    objet.splice(objet.indexOf(query) ,1);
    var new_jsonStr = JSON.stringify(objet);                           
    fs.writeFile(filePath, new_jsonStr,  (err) => {  if (err) throw err });
    return
}//fin if

if (data.courses == "pushliste"){
 ClaraIA.reco= "envoie un sms à laurent disant "+jsonStr
 ClaraIARun(['push','data.push="envoie un sms à laurent disant"'])
return 
}//fin if

if (data.courses =="liste"){console.log('Liste : ',jsonStr)
 ClaraIASpeech(jsonStr)
}//fin if

if (data.courses=="vide"){
     var filePath = path.resolve('%CD%', './plugins/courses/coursesmemoire.json').replace('\\%CD%', '');
		 fs.writeFileSync(filePath,'[]',"UTF-8"); // Remet le fichier courses.json a zéro pour une utilisation future
	   ClaraIASpeech("suppression de la liste de course|tu est sur de tout avoir acheter|ne manque t'il rien|as tu tout acheter ?");
     return
}//fin if

return
}