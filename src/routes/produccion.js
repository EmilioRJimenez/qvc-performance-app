const express = require("express");
const router = express.Router();

const pool = require("../database");

let getUser = async (req, res, next) => {
  if (req.user) {
    //console.log(req.user);
    let infoUsuario = await pool.query(
      "SELECT * FROM vistausuarios WHERE id = ?",
      [req.user.id]
    );
    req.infoUsuario = infoUsuario;
  }
  next();
};

router.post("/save", getUser, async (req, res) => {
  const infoUsuario = req.infoUsuario;
  const user = req.user.id;
  const turno = req.user.turno;
  

  const { equipo } = req.body;

  const resultado = await pool.query(
    "SELECT estandar FROM estandares WHERE id_equipo = ? and turno = ?",
    [equipo, infoUsuario[0].turno]
  );
  let estandar = resultado[0].estandar;
  estandar = Number(estandar);
  
  let {
    piezas,
    cct,
    cst,
    terminal,
    errores,
    defectos,
    calidad,
    mantenimiento,
    materiales,
    cdd,
    procesos,
    enrredos,
    atorones,
    setupa,
    setupb,
    setupc,
    setupe,
    ajuste,
    sellocalidad,
    terminalanillo,
    cobre,
    otrostiempos,
    comments,
    tarjetas, 
    fecha,
    numerosetupa,
    numerosetupb,
    numerosetupc,
    numerosetupe,
    tiempocorrido
  } = req.body;

  cst = Number(cst);
  cct = Number(cct);
  terminal = Number(terminal);
  sellocalidad = Number(sellocalidad);
  terminalanillo = Number(terminalanillo);
  cobre = Number(cobre);
  piezas = Number(piezas);

  let efectividad = (piezas * 100) / estandar;
  efectividad = Math.round(efectividad);

  if(!tarjetas){
    efectividad = 100;
  }

  const datosProduccion = {
    piezas,
    turno,
    fecha,
    efectividad,
    id_equipo: equipo,
    id_usuario: user
  };

  const verifyDate = await pool.query("SELECT * FROM produccion WHERE fecha = ? and id_equipo = ? and turno = ?", [fecha, equipo, infoUsuario[0].turno])
  .then(async function(result){
   
    if(result.length === 0){
    const query = "INSERT INTO produccion SET ?";
  
    const resultProd = await pool.query(query, [
      datosProduccion,
    ]);
  
    const idProduccion = resultProd.insertId;
  
    let resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'cst'"
    );
    let costocst = resultado[0].costo;
    
    resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'cct'"
    )
    let costocct = resultado[0].costo;

    resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'Terminal'"
    )
    let costoterminal = resultado[0].costo;

    resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'Terminal con anillo'"
    )
    let costoterminalconanillo = resultado[0].costo;

    resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'Sello'"
    )
    let costosello = resultado[0].costo;

    resultado = await pool.query(
      "SELECT costo FROM vistacostosscrap WHERE nombre = 'Cobre'"
    )
    let costocobre = resultado[0].costo;

    let datosCalidad = {
      cst,
      costocst,
      cct,
      costocct,
      terminal,
      costoterminal,
      terminal_anillo: terminalanillo,
      costoterminalconanillo,
      sello: sellocalidad,
      costosello,
      cobre,
      costocobre,
      errores,
      defectos,
      id_produccion: idProduccion,
    };
  
    const datosTiempoMuerto = {
      calidad,
      mantto: mantenimiento,
      materiales,
      cdd,
      procesos,
      enrredos,
      atorones,
      numerosetupa,
      setupa,
      numerosetupb,
      setupb,
      numerosetupc,
      setupc,
      numerosetupe,
      setupe,
      ajuste,
      otros: otrostiempos,
      tiempocorrido,
      id_produccion: idProduccion,
    };
  
    if (resultProd.affectedRows > 0) {
      const resultCalidad = await pool.query("INSERT INTO calidad_corte SET ?", [
        datosCalidad,
      ]);
      const resultTiempo = await pool.query("INSERT INTO tiempos_corte SET ?", [
        datosTiempoMuerto,
      ]);
  
      if (comments !== undefined) {
        if (typeof comments === "string") {
          const datacomment = {
            comentario: comments,
            id_produccion: idProduccion,
          };
          await pool.query("INSERT INTO comentarios SET ?", [datacomment]);
        } else {
          comments.forEach(async (element) => {
            let comentario = element;
            let id_produccion = idProduccion;
            const datacomment = { comentario, id_produccion };
            await pool.query("INSERT INTO comentarios SET ?", [datacomment]);
          });
        }
      }
  
      if (resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0) {
        return res.redirect(
          "/produccioncorte",
          201,
          req.flash("success", "Datos guardados satisfactoriamente.")
        );
      } else {
        await pool.query("DELETE FROM produccion WHERE id = ?", [idProduccion]);
        return res.redirect(
          "/produccioncorte",
          500,
          req.flash(
            "messageError",
            "Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo."
          )
        );
      }
    } else {
      return res.redirect(
        "/produccioncorte",
        500,
        req.flash(
          "messageError",
          "Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo."
        )
      );
     }
    }else{





      const infoUsuario = req.infoUsuario;
      const user = req.user.id;
      const turno = req.user.turno;
      
    
      const { equipo } = req.body;
    
      const resultado = await pool.query(
        "SELECT estandar FROM estandares WHERE id_equipo = ? and turno = ?",
        [equipo, infoUsuario[0].turno]
      );
      let estandar = resultado[0].estandar;
      estandar = Number(estandar);
      
      let {
        piezas,
        cct,
        cst,
        terminal,
        errores,
        defectos,
        calidad,
        mantenimiento,
        materiales,
        cdd,
        procesos,
        enrredos,
        atorones,
        setupa,
        setupb,
        setupc,
        setupe,
        ajuste,
        sellocalidad,
        terminalanillo,
        cobre,
        otrostiempos,
        comments,
        tarjetas, 
        fecha,
        numerosetupa,
        numerosetupb,
        numerosetupc,
        numerosetupe,
        tiempocorrido
      } = req.body;
    
      cst = Number(cst);
      cct = Number(cct);
      terminal = Number(terminal);
      sellocalidad = Number(sellocalidad);
      terminalanillo = Number(terminalanillo);
      cobre = Number(cobre);
      piezas = Number(piezas);
    
      let efectividad = (piezas * 100) / estandar;
      efectividad = Math.round(efectividad);
    
      if(!tarjetas){
        efectividad = 100;
      }
    
      const datosProduccion = {
        piezas,
        efectividad
      };
    


      const idProduccion = result[0].id;
      const query = "UPDATE produccion SET ? WHERE id = ?";
  
      const resultProd = await pool.query(query, [
        datosProduccion,idProduccion
      ]);
    
      
    
      let resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'cst'"
      );
      let costocst = resultado2[0].costo;
      
      resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'cct'"
      )
      let costocct = resultado2[0].costo;
  
      resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'Terminal'"
      )
      let costoterminal = resultado2[0].costo;
  
      resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'Terminal con anillo'"
      )
      let costoterminalconanillo = resultado2[0].costo;
  
      resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'Sello'"
      )
      let costosello = resultado2[0].costo;
  
      resultado2 = await pool.query(
        "SELECT costo FROM vistacostosscrap WHERE nombre = 'Cobre'"
      )
      let costocobre = resultado2[0].costo;
  
      let datosCalidad = {
        cst,
        costocst,
        cct,
        costocct,
        terminal,
        costoterminal,
        terminal_anillo: terminalanillo,
        costoterminalconanillo,
        sello: sellocalidad,
        costosello,
        cobre,
        costocobre,
        errores,
        defectos
      };
    
      const datosTiempoMuerto = {
        calidad,
        mantto: mantenimiento,
        materiales,
        cdd,
        procesos,
        enrredos,
        atorones,
        numerosetupa,
        setupa,
        numerosetupb,
        setupb,
        numerosetupc,
        setupc,
        numerosetupe,
        setupe,
        ajuste,
        otros: otrostiempos,
        tiempocorrido
      };
    
      if (resultProd.affectedRows > 0) {
        const resultCalidad = await pool.query("UPDATE calidad_corte SET ? WHERE id_produccion = ?", [
          datosCalidad, idProduccion
        ]);
        const resultTiempo = await pool.query("UPDATE tiempos_corte SET ? WHERE id_produccion = ?", [
          datosTiempoMuerto, idProduccion
        ]);
    
        if (comments !== undefined) {
          if (typeof comments === "string") {
            const datacomment = {
              comentario: comments,
              id_produccion: idProduccion,
            };
            await pool.query("INSERT INTO comentarios SET ?", [datacomment]);
          } else {
            comments.forEach(async (element) => {
              let comentario = element;
              let id_produccion = idProduccion;
              const datacomment = { comentario, id_produccion };
              await pool.query("INSERT INTO comentarios SET ?", [datacomment]);
            });
          }
        }
    
        if (resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0) {
          return res.redirect(
            "/produccioncorte",
            201,
            req.flash("success", "Los datos se actualizarón debido a que ya existian datos de producción del equipo.")
          );
        } else {
          await pool.query("DELETE FROM produccion WHERE id = ?", [idProduccion]);
          return res.redirect(
            "/produccioncorte",
            500,
            req.flash(
              "messageError",
              "Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo."
            )
          );
        }
      } else {
        return res.redirect(
          "/produccioncorte",
          500,
          req.flash(
            "messageError",
            "Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo."
          )
        );
       }














































      console.log(result)
      res.redirect('/produccioncorte', 400, req.flash("messageError", "Operación cancelada. Los datos de produccion de la maquina ya se guardarón una vez."));
    }
  })
  .catch(err=>{
    console.log(err);
    res.redirect('/produccioncorte', 500, req.flash("messageError", "Error en el servidor. Contacta al desarrollador."));
  });
  /*
 
  }*/
});

module.exports = router;
