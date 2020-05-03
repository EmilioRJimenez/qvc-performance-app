const express = require('express');
const router = express.Router();

const pool = require('../database');

router.post('/save', async (req, res) => {
    const user = req.user.id;
    const turno = req.user.turno;

    const {
        equipo, numeroequipo
    } = req.body;

    const realequipo = await pool.query('SELECT id FROM equipo WHERE (numero = ?) AND (id_tipoequipo = ?)', [numeroequipo, equipo]);
    
    if(realequipo.length > 0){
        
        const area = req.user.id_locacion;
        if(area === 2) {

            const {
                piezas, cct, cst, terminal,
                errores, defectos, calidad, mantenimiento, materiales, cdd,
                procesos, enrredos, atorones, sello, setupa, setupb, setupc,
                setupd, ajuste, otroscalidad, otrostiempos
            } = req.body;
    
            const idEquipo = realequipo[0].id;
    
            const datosProduccion = {
                 id_equipo: idEquipo, piezas, turno, id_usuario: user
            };
            const resultProd = await pool.query('INSERT INTO produccion SET ?', [datosProduccion]);
            const idProduccion = resultProd.insertId;

            const datosCalidad = {
                cst, cct, terminal, otroscalidad, errores, defectos, id_produccion: idProduccion
           }
   
           const datosTiempoMuerto = {
                 calidad, mantto: mantenimiento, materiales, cdd, procesos, enrredos, atorones, sello, setupa, setupb, setupc, setupd, ajuste, otrostiempos, id_produccion: idProduccion
           }

            if(resultProd.affectedRows > 0){
                
                const resultCalidad = await pool.query('INSERT INTO calidad_corte SET ?', [datosCalidad]);
                const resultTiempo = await pool.query('INSERT INTO tiempos_corte SET ?', [datosTiempoMuerto]);
                if(resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0){
                    return res.redirect('/produccion', 201, req.flash('success', 'Datos guardados satisfactoriamente.'));
                }else{
                    await pool.query('DELETE FROM produccion WHERE id = ?', [idProduccion]);
                    return res.redirect('/produccion', 500, req.flash('messageError', 'Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo.'));
                }
            }else{
                return res.redirect('/produccion', 500, req.flash('messageError', 'Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo.'));
            }
        } else if(area === 3) {
            
        } else{

        }

    }else{
        return res.redirect('/produccion', 500, req.flash('messageError', 'El equipo que ingreso no existe. Vuelve a intentarlo.'));
    }

   


    res.send('saved');
});

module.exports = router;