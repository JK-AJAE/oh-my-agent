---
name: "x402-express-wrapper"
description: "Wrapper oficial de M2MCent (Node.js) para inyectar muros de pago x402 en APIs o servidores Model Context Protocol (MCP). Usar al construir nuevos servicios que requieran monetización máquina a máquina."
category: "custom-skill"
trigger: "/x402-express-wrapper"
---

# x402-express-wrapper

Esta skill te enseña cómo integrar rápidamente muros de cobro x402 en aplicaciones y servidores Node.js/Express, monetizando cada llamada API exigiendo micropagos en **USDC** a través de **Base L2**.

## When to Use
Usa esta skill cuando el usuario humano (u otro Agente) te solicite:
1. "Agregar una barrera de pago a la API".
2. "Monetizar el servidor MCP que acabamos de crear".
3. "Exigir micropagos en USDC por usar el endpoint".

## 📦 Instalación

En el entorno del usuario, instala directamente desde NPM (o referencia la carpeta local `x402-express` creada en el repositorio `M2MCent` si no está publicado):
