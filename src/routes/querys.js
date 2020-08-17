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
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      } else {
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE turno = '${turno}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY equipo ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      }
    } else {
      if (turno === "Ambos") {
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
      } else {
        queryOption = `SELECT equipo, numero, produccion, estandar, turno, fecha FROM ${reporte} WHERE turno = '${turno}' and ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
        resultado = await pool.query(queryOption);
        res.json({ result: resultado });
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
      columns = "id_equipo, produccion, estandar, equipo, fecha, turno";
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
    
        queryOption = `SELECT ${columns} FROM ${reporte} WHERE ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
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
    queryOption = `SELECT ${columns} FROM ${reporte} WHERE turno = '${turno}' and ${tipo} = '${opcion}' and fecha BETWEEN '${fechaInicio}' AND '${fechaFin}' ORDER BY id_equipo`;
      resultado = await pool.query(queryOption);
      res.json({ result: resultado });
  }
}
}

module.exports = router;
