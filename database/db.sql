
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calidad_corte`
--

CREATE TABLE `calidad_corte` (
  `id` int(11) NOT NULL,
  `cst` decimal(10,3) NOT NULL,
  `cct` decimal(10,3) NOT NULL,
  `terminal` decimal(10,3) NOT NULL,
  `terminal_anillo` decimal(10,3) NOT NULL,
  `sello` decimal(10,3) NOT NULL,
  `cobre` decimal(10,3) NOT NULL,
  `errores` int(11) NOT NULL,
  `defectos` int(11) NOT NULL,
  `efectividad` int(11) NOT NULL,
  `id_produccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `id_produccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `costos_scrap`
--

CREATE TABLE `costos_scrap` (
  `id` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `costo` decimal(10,3) NOT NULL DEFAULT '0.000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `costos_scrap`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `id_tipoequipo` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estandares`
--

CREATE TABLE `estandares` (
  `id` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `estandar` int(11) NOT NULL DEFAULT '0',
  `estandar_scrap` decimal(10,2) NOT NULL DEFAULT '0.00',
  `turno` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pendientes`
--

CREATE TABLE `pendientes` (
  `id` int(11) NOT NULL,
  `turno` char(1) NOT NULL,
  `pendiente` varchar(250) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE `produccion` (
  `id` int(11) NOT NULL,
  `piezas` int(11) NOT NULL,
  `turno` char(1) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `efectividad` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Supervisor');

-- --------------------------------------------------------


--
-- Estructura de tabla para la tabla `tiempos_corte`
--

CREATE TABLE `tiempos_corte` (
  `id` int(11) NOT NULL,
  `calidad` decimal(10,2) NOT NULL,
  `mantto` decimal(10,2) NOT NULL,
  `materiales` decimal(10,2) NOT NULL,
  `cdd` decimal(10,2) NOT NULL,
  `procesos` decimal(10,2) NOT NULL,
  `enrredos` decimal(10,2) NOT NULL,
  `atorones` decimal(10,2) NOT NULL,
  `sello` decimal(10,2) NOT NULL,
  `setupa` decimal(10,2) NOT NULL,
  `setupb` decimal(10,2) NOT NULL,
  `setupc` decimal(10,2) NOT NULL,
  `setupd` decimal(10,2) NOT NULL,
  `ajuste` decimal(10,2) NOT NULL,
  `otros` decimal(10,2) NOT NULL,
  `id_produccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

----------------------------------------------------


--
-- Estructura de tabla para la tabla `tipo_equipo`
--

CREATE TABLE `tipo_equipo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_scrap`
--

CREATE TABLE `tipo_scrap` (
  `id` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `password` varchar(250) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `id_rol` int(11) NOT NULL,
  `turno` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `email`, `telefono`, `password`, `estado`, `id_rol`, `turno`) VALUES
('Emilio Rincón', 'emilio.2rj@gmail.com', '6731427946', '$2a$10$Jo6d3Y89WHPAPfq4GPkIuO0I7nExRS1bsCkvzELRnfHzUFvPHnqqG', 1, 1, 'B'),

-- --------------------------------------------------------


----------------------------------------------------

--
-- Estructura para la vista `vistacostosscrap`
--

CREATE VIEW `vistacostosscrap`  AS  select `costos_scrap`.`id` AS `id`,`tipo_scrap`.`nombre` AS `nombre`,`costos_scrap`.`costo` AS `costo` from (`tipo_scrap` join `costos_scrap`) where (`costos_scrap`.`id_tipo` = `tipo_scrap`.`id`) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaequipos`
-

CREATE VIEW `vistaequipos`  AS  select `equipo`.`id` AS `id`,`equipo`.`id_tipoequipo` AS `id_tipoequipo`,`tipo_equipo`.`nombre` AS `tipo`,`equipo`.`numero` AS `numero`,`equipo`.`nombre` AS `nombre`,`estandares`.`estandar` AS `estandar`,`estandares`.`estandar_scrap` AS `estandar_scrap`,`estandares`.`turno` AS `turno`,`equipo`.`estado` AS `estado` from (((`equipo` join `tipo_equipo`) join `locaciones`) join `estandares`) where ((`equipo`.`id_tipoequipo` = `tipo_equipo`.`id`) and (`estandares`.`id_equipo` = `equipo`.`id`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaestandares`
--

CREATE VIEW `vistaestandares`  AS  select `estandares`.`id` AS `id`,`equipo`.`nombre` AS `nombre`,`estandares`.`estandar` AS `estandar`,`estandares`.`estandar_scrap` AS `estandar_scrap`,`estandares`.`turno` AS `turno` from (`estandares` join `equipo`) where (`estandares`.`id_equipo` = `equipo`.`id`) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistaproduccion`
--

CREATE VIEW `vistaproduccion`  AS  select `produccion`.`id_equipo` AS `ID_EQUIPO`,`equipo`.`id_tipoequipo` AS `ID_TIPO_EQUIPO`,`tipo_equipo`.`nombre` AS `TIPO_EQUIPO`,`equipo`.`numero` AS `NUMERO`,`equipo`.`nombre` AS `EQUIPO`,`estandares`.`estandar` AS `ESTANDAR`,`produccion`.`piezas` AS `PRODUCCION`,`produccion`.`turno` AS `TURNO`,`produccion`.`efectividad` AS `EFECTIVIDAD`,`produccion`.`id_usuario` AS `ID_USUARIO`,`usuarios`.`usuario` AS `USUARIO`,`produccion`.`fecha` AS `FECHA` from ((((`produccion` join `equipo`) join `tipo_equipo`) join `usuarios`) join `estandares`) where ((`produccion`.`id_equipo` = `equipo`.`id`) and (`produccion`.`id_usuario` = `usuarios`.`id`) and (`equipo`.`id_tipoequipo` = `tipo_equipo`.`id`) and (`estandares`.`id_equipo` = `equipo`.`id`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `vistausuarios`
--

CREATE VIEW `vistausuarios`  AS  select `usuarios`.`id` AS `id`,`usuarios`.`usuario` AS `usuario`,`usuarios`.`email` AS `email`,`usuarios`.`telefono` AS `telefono`,`usuarios`.`id_rol` AS `id_rol`,`roles`.`nombre` AS `rol`,`usuarios`.`turno` AS `turno`,`usuarios`.`estado` AS `estado` from (`usuarios` join `roles`) where (`usuarios`.`id_rol` = `roles`.`id`) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calidad_corte`
--
ALTER TABLE `calidad_corte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_produccion` (`id_produccion`);


--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_produccion` (`id_produccion`);

--
-- Indices de la tabla `costos_scrap`
--
ALTER TABLE `costos_scrap`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_tipo` (`id_tipo`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_tipoequipo` (`id_tipoequipo`);

--
-- Indices de la tabla `estandares`
--
ALTER TABLE `estandares`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_equipo` (`id_equipo`);


--
-- Indices de la tabla `pendientes`
--
ALTER TABLE `pendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_equipo` (`id_equipo`),
  ADD KEY `fk_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);


--
-- Indices de la tabla `tiempos_corte`
--
ALTER TABLE `tiempos_corte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_produccion` (`id_produccion`);


--
-- Indices de la tabla `tipo_equipo`
--
ALTER TABLE `tipo_equipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_scrap`
--
ALTER TABLE `tipo_scrap`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_role` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calidad_corte`
--
ALTER TABLE `calidad_corte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `costos_scrap`
--
ALTER TABLE `costos_scrap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `estandares`
--
ALTER TABLE `estandares`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pendientes`
--
ALTER TABLE `pendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `produccion`
--
ALTER TABLE `produccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tiempos_corte`
--
ALTER TABLE `tiempos_corte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tiempos_linea_leadp`
--
-- AUTO_INCREMENT de la tabla `tipo_equipo`
--
ALTER TABLE `tipo_equipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tipo_scrap`
--
ALTER TABLE `tipo_scrap`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calidad_corte`
--
ALTER TABLE `calidad_corte`
  ADD CONSTRAINT `calidad_corte_ibfk_1` FOREIGN KEY (`id_produccion`) REFERENCES `produccion` (`id`);


--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_produccion`) REFERENCES `produccion` (`id`);

--
-- Filtros para la tabla `costos_scrap`
--
ALTER TABLE `costos_scrap`
  ADD CONSTRAINT `costos_scrap_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_scrap` (`id`);

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`id_tipoequipo`) REFERENCES `tipo_equipo` (`id`);

--
-- Filtros para la tabla `estandares`
--
ALTER TABLE `estandares`
  ADD CONSTRAINT `estandares_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`);

--
-- Filtros para la tabla `pendientes`
--
ALTER TABLE `pendientes`
  ADD CONSTRAINT `pendientes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id`),
  ADD CONSTRAINT `produccion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `tiempos_corte`
--
ALTER TABLE `tiempos_corte`
  ADD CONSTRAINT `tiempos_corte_ibfk_1` FOREIGN KEY (`id_produccion`) REFERENCES `produccion` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_id_role` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
