const express = require('express');
const router = express.Router();

const pool = require('../database');


router.post('/save', async (req, res) => {
    const user = req.user.id;
    const turno = req.user.turno;

    const {
        equipo
    } = req.body;

        const resultado = await pool.query('SELECT estandar, estandar_scrap FROM equipo WHERE id = ?', [equipo]);
        let estandar = resultado[0].estandar; estandar = Number(estandar);
        let estandar_scrap = resultado[0].estandar_scrap; estandar_scrap = Number(estandar_scrap);
                


        const idLocation = req.user.id_locacion;
        const stringLocation = await pool.query('SELECT nombre FROM locaciones WHERE id = ?', [idLocation]);
        
        if(stringLocation[0].nombre === 'Corte') {

            let {
                piezas, cct, cst, terminal,
                errores, defectos, calidad, mantenimiento, materiales, cdd,
                procesos, enrredos, atorones, sello, setupa, setupb, setupc,
                setupd, ajuste, otroscalidad, otrostiempos, comments
            } = req.body;

            cst = Number(cst); cct = Number(cct); terminal = Number(terminal); otroscalidad = Number(otroscalidad); piezas = Number(piezas);

            let efectividad = (piezas * 100) / estandar;
            efectividad = Math.round(efectividad);
            let efectividad_scrap = ((cct + cst + terminal + otroscalidad) * 100 ) / estandar_scrap;
            efectividad_scrap = Math.round(efectividad_scrap);
            const datosProduccion = {
                 id_equipo: equipo, piezas, turno, efectividad, id_usuario: user
            };
            const resultProd = await pool.query('INSERT INTO produccion SET ?', [datosProduccion]);
            const idProduccion = resultProd.insertId;

            let datosCalidad = {
                cst, cct, terminal, otros: otroscalidad, errores, defectos, efectividad: efectividad_scrap, id_produccion: idProduccion
           }
           
           

           const datosTiempoMuerto = {
                 calidad, mantto: mantenimiento, materiales, cdd, procesos, enrredos, atorones, sello, setupa, setupb, setupc, setupd, ajuste, otros: otrostiempos, id_produccion: idProduccion
           }

            if(resultProd.affectedRows > 0){
                
                const resultCalidad = await pool.query('INSERT INTO calidad_corte SET ?', [datosCalidad]);
                const resultTiempo = await pool.query('INSERT INTO tiempos_corte SET ?', [datosTiempoMuerto]);

                
               if(comments !== undefined){
                    if(typeof comments === 'string'){
                        const datacomment = {
                            comentario: comments,
                            id_produccion: idProduccion
                        };
                        await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                    }else{
                        comments.forEach(async (element) => {
                            let comentario = element;
                            let id_produccion = idProduccion;
                            const datacomment = {comentario, id_produccion};
                            await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                        });
                    }  
                }
                
                if(resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0){
                    return res.redirect('/produccioncorte', 201, req.flash('success', 'Datos guardados satisfactoriamente.'));
                }else{
                    await pool.query('DELETE FROM produccion WHERE id = ?', [idProduccion]);
                    return res.redirect('/produccioncorte', 500, req.flash('messageError', 'Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo.'));
                }

            }else{
                return res.redirect('/produccioncorte', 500, req.flash('messageError', 'Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo.'));
            }
    }
        else if(stringLocation[0].nombre === 'L. Pred') {


            const {
                piezas, cct, cst, terminal, manga, empalme,
                errores, defectos, calidad, mantenimiento, materiales,
                procesos, otroscalidad, otrostiempos, comments
            } = req.body;
              
    
            const datosProduccion = {
                 id_equipo: equipo, piezas, turno, id_usuario: user
            };

            const resultProd = await pool.query('INSERT INTO produccion SET ?', [datosProduccion]);
            const idProduccion = resultProd.insertId;

            const datosCalidad = {
                cct, cst, terminal, manga, empalme, otros: otroscalidad, id_produccion: idProduccion, errores, defectos, 
           }

           const datosTiempoMuerto = {
            calidad, mantto: mantenimiento, materiales, procesos, otros: otrostiempos, id_produccion: idProduccion
            }

            if(resultProd.affectedRows > 0){
                
                const resultCalidad = await pool.query('INSERT INTO calidad_leadpred SET ?', [datosCalidad]);
                const resultTiempo = await pool.query('INSERT INTO tiempos_linea_leadp SET ?', [datosTiempoMuerto]);

                
                if(comments !== undefined){
                    if(typeof comments === 'string'){
                        const datacomment = {
                            comentario: comments,
                            id_produccion: idProduccion
                        };
                        await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                    }else{
                        comments.forEach(async (element) => {
                            let comentario = element;
                            let id_produccion = idProduccion;
                            const datacomment = {comentario, id_produccion};
                            await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                        });
                    }  
                }
                
                if(resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0){
                    return res.redirect('/produccionleadp', 201, req.flash('success', 'Datos guardados satisfactoriamente.'));
                }else{
                    await pool.query('DELETE FROM produccion WHERE id = ?', [idProduccion]);
                    return res.redirect('/produccionleadp', 500, req.flash('messageError', 'Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo.'));
                }

            }else{
                return res.redirect('/produccionleadp', 500, req.flash('messageError', 'Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo.'));
            }

        } else{

        
            const {
                piezas, cintavinil, cintagarra, cable, componentes,
                errores, defectos, calidad, mantenimiento, materiales,
                procesos, otroscalidad, otrostiempos, comments
            } = req.body;
            
    
            const datosProduccion = {
                 id_equipo: equipo, piezas, turno, id_usuario: user
            };

            const resultProd = await pool.query('INSERT INTO produccion SET ?', [datosProduccion]);
            const idProduccion = resultProd.insertId;

            const datosCalidad = {
                cintavinil, cintagarra, cable, componentes, otros: otroscalidad, errores, defectos, id_produccion: idProduccion
           }

           const datosTiempoMuerto = {
            calidad, mantto: mantenimiento, materiales, procesos, otros: otrostiempos, id_produccion: idProduccion
            }

            if(resultProd.affectedRows > 0){
                
                const resultCalidad = await pool.query('INSERT INTO calidad_lineas SET ?', [datosCalidad]);
                const resultTiempo = await pool.query('INSERT INTO tiempos_linea_leadp SET ?', [datosTiempoMuerto]);

                
                if(comments !== undefined){
                    if(typeof comments === 'string'){
                        const datacomment = {
                            comentario: comments,
                            id_produccion: idProduccion
                        };
                        await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                    }else{
                        comments.forEach(async (element) => {
                            let comentario = element;
                            let id_produccion = idProduccion;
                            const datacomment = {comentario, id_produccion};
                            await pool.query('INSERT INTO comentarios SET ?', [datacomment]);
                        });
                    }  
                }
                
                if(resultCalidad.affectedRows > 0 && resultTiempo.affectedRows > 0){
                    return res.redirect('/produccionlinea', 201, req.flash('success', 'Datos guardados satisfactoriamente.'));
                }else{
                    await pool.query('DELETE FROM produccion WHERE id = ?', [idProduccion]);
                    return res.redirect('/produccionlinea', 500, req.flash('messageError', 'Ha ocurrido un problema al intentar guardar los datos. Vuelve a intentarlo.'));
                }

            }else{
                return res.redirect('/produccionlinea', 500, req.flash('messageError', 'Ha ocurrido un error al guardar los datos de producción. Vuelve a intentarlo.'));
            }
    }
});

module.exports = router;