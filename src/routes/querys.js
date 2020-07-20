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

router.post("/", async (req, res) => {
  const { reporte, turno, tipo, opcion, fechaInicio, fechaFin } = req.body;
  const data = {};
  var queryOption = "";
  let resultado;
  if (tipo === "equipo") {
    if (turno === "Ambos" && opcion === "Todo") {
      queryOption = `SELECT ID_EQUIPO, SUM(PRODUCCION) AS PRODUCCION, SUM(ESTANDAR) AS ESTANDAR, EQUIPO FROM vistaproduccion WHERE FECHA BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY EQUIPO ORDER BY ID_EQUIPO`;

      resultado = await pool.query(queryOption);
      res.json({ produccion: resultado });
    } else {
      queryOption = `SELECT ID_EQUIPO, SUM(PRODUCCION) AS PRODUCCION, SUM(ESTANDAR) AS ESTANDAR, EQUIPO FROM vistaproduccion WHERE ID_LOCACION = ${req.user.id_locacion} AND TURNO = '${turno}' AND EQUIPO = '${opcion}' AND FECHA BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY EQUIPO ORDER BY ID_EQUIPO`;

      resultado = await pool.query(queryOption);
      res.json({ produccion: resultado });
    }
  } else if (tipo === "tipo_equipo") {
    if (turno === "Ambos" && opcion === "Todo") {
      queryOption = `SELECT ID_EQUIPO, SUM(PRODUCCION) AS PRODUCCION, SUM(ESTANDAR) AS ESTANDAR, EQUIPO FROM vistaproduccion WHERE ID_LOCACION = ${req.user.id_locacion} AND FECHA BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY EQUIPO ORDER BY ID_EQUIPO`;
      resultado = await pool.query(queryOption);
      res.json({ produccion: resultado });
    } else {
      queryOption = `SELECT ID_EQUIPO, SUM(PRODUCCION) AS PRODUCCION, SUM(ESTANDAR) AS ESTANDAR, EQUIPO FROM vistaproduccion WHERE ID_LOCACION = ${req.user.id_locacion} AND TURNO = '${turno}' AND TIPO_EQUIPO = '${opcion}' AND FECHA BETWEEN '${fechaInicio}' AND '${fechaFin}' GROUP BY EQUIPO ORDER BY ID_EQUIPO `;
      resultado = await pool.query(queryOption);
      res.json({ produccion: resultado });
    }
  } else {
    if (turno === "Ambos") {
      queryOption = ``;
    } else {
      queryOption = ``;
    }
  }
});

module.exports = router;
