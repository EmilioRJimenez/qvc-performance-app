const express = require("express");
const router = express.Router();

const pool = require("../database");

router.post("/produccion", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM vistaproduccion GROUP BY ID_EQUIPO`
  );
  res.json({ produccion: result });
});

router.post("/opciones", async (req, res) => {
  const { opcion } = req.body;
  const result = await pool.query(`SELECT nombre FROM ${opcion}`);
  res.json(result);
});

router.post("/queryproduccion", async (req, res) => {
  let { reporte, turno, tipo, opcion, fechaInicio, fechaFin } = req.body;
  var queryOption = "";
  if (tipo === "tipoequipo") {
    tipo = "tipo";
  }

  

  if (reporte === "produccion") {
    reporte = "vistaproduccion";
  } else if (reporte === "tiempos_corte") {
    reporte = "vistatiempo";
  } else if (reporte === "calidad_corte") {
    reporte = "vistascrap";
  }


    if (opcion === "Todo") {
      if (turno === "Ambos") {
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      } else {
        console.log("step")
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      }
    } else {
      console.log("step 1")
      if (turno === "Ambos") {
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      } else {
        console.log("step 2")
        if(tipo === "Todo"){
          console.log("b1")
          queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY fecha`;
          resultado = await pool.query(queryOption);
          res.json({ result: resultado });
        }else{
          console.log("b2")
          queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE turno = '${turno}' and ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY fecha`;
          resultado = await pool.query(queryOption);
          res.json({ result: resultado });
        }
      }
    }
});

router.post("/", async (req, res) => {
  getReport(req, res);
});

router.post("/", async (req, res) => {});

async function getReport(req, res) {
  let { reporte, turno, tipo, opcion, fechaInicio, fechaFin } = req.body;
  const data = {};
  var queryOption = "";
  let resultado;
  if (tipo === "tipoequipo") {
    tipo = "tipo";
  }

  let columns = "";

  if (reporte === "produccion") {
    reporte = "vistaproduccion";
    if (opcion !== "Todo") {
      columns = "id_equipo, SUM(produccion) AS produccion, SUM(estandar) AS estandar, equipo, fecha, turno";
    } else {
      columns =
        "id_equipo, SUM(PRODUCCION) AS produccion, SUM(ESTANDAR) AS estandar, equipo, fecha, turno";
    }
  } else if (reporte === "tiempos_corte") {
    reporte = "vistatiempo";
    columns = "";
  } else if (reporte === "calidad_corte") {
    reporte = "vistascrap";
    columns = "";
  }

  if (opcion === "Todo") {
    if (turno === "Ambos") {
    
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
      
      
    } else {
      queryOption = `SELECT ${columns} FROM ${reporte} WHERE turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
    }
  } else {
    if (turno === "Ambos") {

      if(tipo !== "tipo"){
        console.log("Estoy aqui");
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY fecha ORDER BY fecha`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
      }else{
       
        columns =
        "id_equipo, SUM(PRODUCCION) AS produccion, SUM(ESTANDAR) AS estandar, equipo, fecha, turno";
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
      }
  }else{
    if(tipo === "Todo"){
      queryOption = `SELECT ${columns} FROM ${reporte} WHERE turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
    }else{
      console.log("3");
      if(turno === "Ambos"){
        console.log("2");
        columns = "id_equipo, SUM(produccion), SUM(estandar), equipo, fecha, turno";
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      }else{
        console.log("1");
        columns = "id_equipo, produccion, estandar, equipo, fecha, turno";
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE turno = '${turno}' and ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      }
      
    }
    
  }
}
}

router.post("/dateproduccion", async (req, res) => {

  let { reporte, turno, tipo, opcion, fechaInicio, fechaFin, equipo } = req.body;
  let resultado;
if(reporte === "produccion"){
  reporte = "vistaproduccion";
}

console.log(req.body);
  columns = "id_equipo, SUM(produccion) AS produccion, SUM(estandar) AS estandar, equipo, fecha, turno";
if(turno === "Ambos" && tipo === "equipo"){
   queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${equipo}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY fecha ORDER BY fecha`;
  resultado = await pool.query(queryOption);
  res.json({ result: resultado });
}else{
  console.log("4");
  if(tipo === "tipoequipo" && turno === "Ambos"){
    console.log("3");
    tipo = "tipo";
    queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY fecha ORDER BY fecha`;
  resultado = await pool.query(queryOption);
  res.json({ result: resultado });
  }else{
    console.log("5");
    tipo = "tipo";
    queryOption = `SELECT ${columns} FROM ${reporte} WHERE equipo = '${equipo}' and turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY fecha ORDER BY fecha`;
    resultado = await pool.query(queryOption);
    res.json({ result: resultado });
  }
   
}
    
});

router.post("/detailsproduction", async (req, res) => {
  //console.log(req.body);
   
});

router.post("/production", async (req, res) => {

  if(req.body.equipo != "Todo" && req.body.turno != "Ambos"){
    const result = await pool.query(`SELECT id,produccion, estandar FROM vistaproduccion WHERE equipo = '${req.body.equipo}' and turno = '${req.body.turno}' and fecha = '${req.body.fecha}';`);
    res.json(result);
  }else if(req.body.equipo != "Todo" && req.body.turno == "Ambos"){
    console.log("Todos los equipos y ambos turnos")
  }else if(req.body.equipo == "Todo" && req.body.turno != "Ambos"){
    console.log("1");
  }else{
    console.log("otro")
  }
    
});

router.post("/tiempomuerto", async (req, res) => {
  if(req.body.equipo != "Todo" && req.body.turno != "Ambos"){
    console.log(req.body.id_produccion)
    const result = await pool.query(`SELECT * FROM tiempos_corte WHERE id_produccion = ${req.body.id_produccion};`);
    res.json(result);
  }else if(req.body.equipo != "Todo" && req.body.turno == "Ambos"){
    console.log("Todos los equipos y ambos turnos")
  }else if(req.body.equipo == "Todo" && req.body.turno != "Ambos"){
    console.log("1");
  }else{
    console.log("otro")
  }
})

router.post("/calidad", async (req, res) => {
  const result = await pool.query("SELECT errores, defectos FROM calidad_corte WHERE id_produccion = ?", [req.body.id_produccion]);
  return res.json(result);
})


router.post("/scrap", async (req, res) => {
  const result = await pool.query("SELECT * FROM calidad_corte WHERE id_produccion = ?", [req.body.id_produccion]);
  return res.json(result);
})

router.post("/estandarscrap", async (req, res) => {
  const result = await pool.query("SELECT estandar_scrap FROM vistaequipos WHERE nombre = ? and turno = ?", [req.body.equipo, req.body.turno]);
  return res.json(result);
})

router.post("/comentarios", async (req, res) => {
  const result = await pool.query("SELECT * FROM comentarios WHERE id_produccion = ?;", [req.body.id_produccion]);
  res.json(result);
})


router.post("/detallesproduccion", async (req, res) => {
  if(req.body.turno != "Ambos"){
    const result = await pool.query("SELECT COUNT(id) as 'num', SUM(piezas) as 'produccion', SUM(estandar) as 'estandar', SUM(estandarscrap) as 'estandarscrap', turno, numero, nombre, tipoequipo, SUM(setupa) as 'setupa', SUM(numerosetupa) as 'numerosetupa', SUM(setupb) as 'setupb', SUM(numerosetupb) as 'numerosetupb', SUM(setupc) as 'setupc', SUM(numerosetupc) as 'numerosetupc', SUM(setupe) as 'setupe', SUM(numerosetupe) as 'numerosetupe', SUM(calidad) as 'calidad', SUM(mantto) as 'mantto', SUM(materiales) as 'materiales', SUM(cdd) as 'cdd', SUM(procesos) as 'procesos', SUM(enrredos) as 'enrredos', SUM(atorones) as 'atorones', SUM(ajuste) as 'ajuste', SUM(otros) as 'otros', SUM(tiempocorrido) as 'tiempocorrido', SUM(cst) as 'cst', costocst, SUM(cct) as 'cct', costocct, SUM(terminal) as 'terminal', costoterminal, SUM(terminal_anillo) as 'terminalanillo', costoterminalconanillo, SUM(sello) as 'sello', costosello, SUM(cobre) as 'cobre', costocobre, SUM(errores) as 'errores', SUM(defectos) as 'defectos'  FROM detallesproduccion WHERE nombre = ? AND turno = ? AND fecha BETWEEN ? AND ?", [req.body.equipo, req.body.turno, req.body.fechaInicio, req.body.fechaFin]);
    return res.json(result);
  }else{
    const result = await pool.query("SELECT COUNT(id) as 'num', SUM(piezas) as 'produccion', SUM(estandar) as 'estandar', SUM(estandarscrap) as 'estandarscrap', turno, numero, nombre, tipoequipo, SUM(setupa) as 'setupa', SUM(numerosetupa) as 'numerosetupa', SUM(setupb) as 'setupb', SUM(numerosetupb) as 'numerosetupb', SUM(setupc) as 'setupc', SUM(numerosetupc) as 'numerosetupc', SUM(setupe) as 'setupe', SUM(numerosetupe) as 'numerosetupe', SUM(calidad) as 'calidad', SUM(mantto) as 'mantto', SUM(materiales) as 'materiales', SUM(cdd) as 'cdd', SUM(procesos) as 'procesos', SUM(enrredos) as 'enrredos', SUM(atorones) as 'atorones', SUM(ajuste) as 'ajuste', SUM(otros) as 'otros', SUM(tiempocorrido) as 'tiempocorrido', SUM(cst) as 'cst', costocst, SUM(cct) as 'cct', costocct, SUM(terminal) as 'terminal', costoterminal, SUM(terminal_anillo) as 'terminalanillo', costoterminalconanillo, SUM(sello) as 'sello', costosello, SUM(cobre) as 'cobre', costocobre, SUM(errores) as 'errores', SUM(defectos) as 'defectos'  FROM detallesproduccion WHERE nombre = ? AND fecha BETWEEN ? AND ?", [req.body.equipo, req.body.fechaInicio, req.body.fechaFin]);
    return res.json(result);
  }
 
})

router.post("/todosloscomentarios", async (req, res) => {
  if(req.body.turno != "Ambos"){
    const result = await pool.query("SELECT * FROM vistacomentarios WHERE turno = ? AND fecha BETWEEN ? AND ?", [req.body.turno, req.body.fechaInicio, req.body.fechaFin]);
    return res.json(result);
  }else{

  }
  
});


module.exports = router;
