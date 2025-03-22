export function formatearRespuesta(datos, { pagina = 1, limite = datos.length, total = datos.length }) {
    return {
      total_registros: total,
      pagina,
      limite,
      datos: datos.map(item => ({
        id: item.id ?? null,
        nombre: item.nombre ?? null,
        edad: item.edad ?? null,
        email: item.email ?? null
      })),
      siguiente_pagina: pagina * limite < total ? pagina + 1 : null
    };
  }
  