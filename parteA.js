    const fs = require('fs');
    let pathDir = './datos/';


    //authz.provider_1 y authn.provider_2.

    fs.readdir(pathDir, (err, files) => { //levanto los archivos del path
      if (err) return false;
      if (files.length >= 1) { //si hay archivos
        arrayDatos = new Array();
        arrayTipoContent = new Array();
        arrayTipoAuth = new Array();
        files.forEach((file, index) => { //recorro el array de archivos
          let rawdata = fs.readFileSync(pathDir + file) //obtengo el contenido de los archivos
          jsonDatos = JSON.parse(rawdata) //lo parseo a json
          var pathF = String(pathDir + file) //me guardo el path
          arrayDatos.push({ pathF, content: jsonDatos.provider.content_module, auth: jsonDatos.provider.auth_module }) //armo un array con los archivos y sus modulos correspondientes
            !arrayTipoAuth.includes(jsonDatos.provider.auth_module) ? arrayTipoAuth.push(jsonDatos.provider.auth_module) : null

            !arrayTipoContent.includes(jsonDatos.provider.content_module) ? arrayTipoContent.push(jsonDatos.provider.content_module) : null
        })
        var auth = 'auth_module: ';
        arrayTipoAuth.forEach((elemento) => {
          auth += '\n{ ' + elemento + ':' + JSON.stringify(procesarYfiltrarAuth(arrayDatos, elemento)) + ' },'
        })
        var content = 'content_module:';
        arrayTipoContent.forEach((elemento) => {
          content += '\n{ ' + elemento + ':' + JSON.stringify(procesarYfiltrarContent(arrayDatos, elemento)) + ' },'


        })
        console.log(auth);
        console.log(content);




      }


    })
    procesarYfiltrarContent = (arrayDatos, patterncontent) => arrayDatos.filter((item) => item.content === patterncontent).map(item => item.pathF) //usando filter filtro los archivos de acuerdo al tipo de content, luego usando map obtengo un array solo con los path
    procesarYfiltrarAuth = (arrayDatos, patternauth) => arrayDatos.filter((item) => item.auth === patternauth).map(item => item.pathF)
