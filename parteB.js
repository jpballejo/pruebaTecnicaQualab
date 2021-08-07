    let pathDir = './datos/';
    const fs = require('fs');

    fs.readdir(pathDir, (err, files) => {
      if (err) return false;
      if (files.length >= 1) {//si existen archivos comienzo
        //arreglos para manipular los datos
        arrayDatos = [];
        arrayTipoContent = [];
        arrayTipoAuth = [];

        files.forEach((file, index) => {
          let rawdata = fs.readFileSync(pathDir + file)
          jsonDatos = JSON.parse(rawdata)
          var pathF = String(pathDir + file)
          arrayDatos.push({ pathF, content: jsonDatos.provider.content_module, auth: jsonDatos.provider.auth_module })

            !arrayTipoAuth.includes(jsonDatos.provider.auth_module) ? arrayTipoAuth.push(jsonDatos.provider.auth_module) : null

            !arrayTipoContent.includes(jsonDatos.provider.content_module) ? arrayTipoContent.push(jsonDatos.provider.content_module) : null
        })
//armo combinaciones simples de 2 en 2 el total van a ser 16
        armarCombinaciones = (arrayAuth, arrayContent) => {
          var combinaciones = [];
          arrayAuth.forEach(item => {//recorro un arreglo, esto puede ser invertido
            combinaciones = combinaciones.concat(arrayContent.map(elemento => {//usando map combino y con concat concateno los array
              return { auth: item, content: elemento }
            }))
          })
          return combinaciones;//retorno las combinaciones
        }

        var combinacionesDevueltas = armarCombinaciones(arrayTipoAuth, arrayTipoContent);//obtengo las combinaciones

        var elementosFiltrados;
//recorro y filtro los datos usando las combinaciones armadas
//de esta manera me quedo con menos archivos
        recorrerYfiltrar = (datos, combinacionesBusqueda) => {
          var devolucion = [];
          combinacionesBusqueda.forEach(item => {
            dato = datos.find((element) => {//con find retorno el primer elemento que cumple la condicion de busqueda
              if (element.content == item.content && element.auth == item.auth)//si se quiere mas precision se puede arreglar otro = para filtrar por tipo tambien
                return element
            })

            if (dato != undefined) devolucion.push(dato)//find devuelve undefined si no encuentra un elemento que cumpla la condicion de busqueda

          })

          return devolucion;
        }

        elementosFiltrados = recorrerYfiltrar(arrayDatos, combinacionesDevueltas);


//por ultimo hago un ultimo filtrado
        filtradoFinal = (datosFiltrados) => {
          //en este filtrado uso los tipos a buscar sin combinar
          filtrados = [];
          arrayTipoAuth.forEach((item) => {//filtro los auth

            datoFiltrado = datosFiltrados.find((element) => {
                if (element.auth == item) return element
              })
//no necesito verificar undefined, en este arreglo si o si hay por lo menos un tipo de cada uno
              !filtrados.includes(datoFiltrado) ? filtrados.push(datoFiltrado) : null
          })

          arrayTipoContent.forEach((item) => {//filtro los content

            datoFiltrado = datosFiltrados.find((element) => {
                if (element.content == item) return element
              })
//solo guardo los que no se repiten
              !filtrados.includes(datoFiltrado) ? filtrados.push(datoFiltrado) : null
          })
          return filtrados;
        }

        console.log(filtradoFinal(elementosFiltrados).map(item => item.pathF));//por ultimo con map solo me quedo con las rutas a los archivos

      }

    })
