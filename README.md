

# Sección 2. Determinación de necesidades

|Número| Fecha | Técnica seleccionada | Evidencias de la reunión | Conflictos presentados | Tema tratado | Participantes|
|--|--|--|--|--|--| -- |
| 1 | 04/02/2025 | Entrevista: Se realizó una reunión con el usuario para recibir nuevamente explicaciones de las necesidades y el estado actual de la información que poseen y el desarrollo que ya tienen, para plantear posibles soluciones que fuesen acordes al tiempo, capacidad de respuesta del equipo. | <a href="https://eafit-my.sharepoint.com/personal/fmendozag_eafit_edu_co/_layouts/15/stream.aspx?id=%2Fpersonal%2Ffmendozag%5Feafit%5Fedu%5Fco%2FDocuments%2FGrabaciones%2FReuni%C3%B3n%20inicial%20%2D%20PI2%2D20250204%5F141217%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E7bbedae5%2D5024%2D4f48%2D9e4e%2De91e901b0eb3 "> Grabación</a> | No se presentaron conflictos | Alcance del proyecto, necesidades del cliente. Estado de la aplicación, fuente de datos y nuevo desarrollo. Solicitud de acceso al repositorio de Azure. | - Equipo de trabajo <br> - Felipe Mendoza |



## 2.2 Exploración de antecedentes y aplicaciones similares
**ENEL X**
Lo que diferencia a Enel X de nuestro sistema es que se especializa solo en la parte de monitoreo de energía en tiempo real y está ubicado en Argentina.

**Link:** https://www.enelx.com/ar/es/empresas/plataformas-de-gestion/Monitoreo-en-tiempo-real

### Capturas de Pantalla

<p align="center">
  <img src="https://github.com/user-attachments/assets/ac35d1d2-a93c-4366-b443-b28a7034dbd0" width="300">
  <img src="https://github.com/user-attachments/assets/eb0556ff-6a90-4c0d-a337-73de8e530e96" width="300">
  <img src="https://github.com/user-attachments/assets/232ae6e0-b8d4-4149-81cb-bef6b8791c51" width="300">
</p>

<hr>

**TuOnda**
El factor diferencial de tuOnda con respecto anuestro proyecto es que este se especializa en la venta de energía pero a grandes empresas como lo son EPM, Cens, Energía de Pereira y ElectroHuila, entre otras.

**Link:** https://tuonda.com.co/

#### Capturas de Pantalla

<p align="center">
  <img src="https://github.com/user-attachments/assets/59bb3bea-5dbf-4b79-9a57-125925268a57" width="300">
  <img src="https://github.com/user-attachments/assets/4c952347-7a7d-4f1a-bcb3-b4d87f296832" width="300">
</p>

<hr>

**EPM**
EPM tiene un apartado dentro de su empresa de venta de energía a las personas del común, sin embargo este se diferencia de nuestro sistema porque el de EPM funciona con energía solar y es como un canje de cierta parte de energía eléctrica con energía solar y a cambio de ciertos beneficios.

**Link:** https://www.epm.com.co/clientesyusuarios/energia/tipos-de-energia/energia-solar/venta-de-energia-solar.html#

#### Capturas de Pantalla

<p align="center">
  <img src="https://github.com/user-attachments/assets/b16859fc-c92a-4710-ab5e-4c241f3845c2" width="300">
  <img src="https://github.com/user-attachments/assets/01e55c60-10c7-4d9b-8210-f903b7daa2fd" width="300">
</p>

<hr>

Adicional a estos queremos mencionar 2 alternativas que encontramos con IA bajo la estructura vista en la clase #3

| Criterios | EnergyMarket  | Power2Peer |
|--|--|--|
| Funcionalidad | Actua como un Marketplace de energia |Comercialización de energía asegurada por blockchain  |
| UX | Sencilla enfocada en facilidad de uso | Sencilla y poco intuitiva |
| Tecnologías | No información | JavaScript, Solidity, React Native, Truffle y Blockchain de SDN |
| Modelos de negocio | Marketplace de energía basado en oferta y demanda |Transacciones directas entre productores y consumidores|
| Seguridad | No información|Seguridad en blockchaikn, con registros inmutables y encriptación avanzada|
| Rendimiento | Limitada por la infraestructura | Alta eficiencia en transacciones peer to peer  |

<hr>

# Sección 3. User story mapping y backlog del producto

## 3.1 Story mapping

https://miro.com/welcomeonboard/NFpWemgxSmsvMUI4ak9XUjJoNWE0WlVFditncGkvWC9jV0VKSzl2dnNiVmp3THpwS1ROZFFBUHFDNjRIaWxZMTcwV3hSREpJdE9QT040T3ZvWFJ3Um00TTNLakUwd0VFRkE2T0NBWk5CUXpEamVJc1Z2RlFzK1hmTlJ2SDRCMXFnbHpza3F6REdEcmNpNEFOMmJXWXBBPT0hdjE=?share_link_id=355807133262

![History Mapping 2](https://github.com/user-attachments/assets/8b5c8548-5235-48fd-b3f8-d41518121cd6)

## 3.2 Backlog del producto


### **Historias de Usuario - Requisitos Funcionales**

#### 1. Inicio de sesión y registro
- **a.** Como usuario final, deseo poder iniciar sesión en mi aplicación móvil para gestionar mis consumos y producción energética de manera personalizada.
- **b.** Como usuario final, deseo poder registrarme en el sistema desde mi aplicación móvil para comenzar a monitorear mis datos energéticos.

#### 2. Consumos energéticos
- **a.** Como usuario final, quiero observar mis consumos energéticos desglosados por días y horas para identificar patrones y ahorrar energía.
- **b.** Como usuario final, quiero tener gráficos interactivos que muestren mi consumo energético mensual, para entender mejor mis gastos y optimizarlos.

#### 3. Producción energética
- **a.** Como usuario final, deseo poder monitorear la producción energética diaria y semanal para asegurarme de que estoy generando suficiente energía.
- **b.** Como usuario final, quiero visualizar tendencias en mi producción energética para anticipar posibles fluctuaciones y planificar mi consumo.

#### 4. Analítica y predicción
- **a.** Como usuario final, quiero acceder a la analítica de mis consumos energéticos, incluyendo predicciones para los próximos días, para tomar decisiones informadas.
- **b.** Como usuario final, quiero analizar la eficiencia de mi producción energética con recomendaciones basadas en mis datos históricos para mejorar mi rendimiento.
- **c.** Como usuario final, quiero obtener análisis que comparen mi consumo real con las predicciones de consumo y generación, para identificar tendencias y tomar decisiones informadas.

#### 5. Especificación de consumo
- **a.** Como usuario final, quiero establecer y modificar límites de consumo máximo de energía, para evitar penalizaciones y optimizar mi uso energético.

#### 6. Gestión de ofertas de venta de energía excedente
- **a.** Como usuario final, quiero crear y gestionar ofertas para vender mi energía excedente, con el fin de aprovechar al máximo la energía que genero y no consumo.

#### 7. Visualización de ofertas del mercado
- **a.** Como usuario final, quiero explorar y evaluar ofertas de energía disponibles en el mercado, para comprar energía adicional cuando la necesite al mejor precio.

#### 8. Transacciones con contratos inteligentes
- **a.** Como usuario final, quiero comprar y vender energía a través de contratos inteligentes, para garantizar que las transacciones sean seguras, rápidas y confiables.

#### 9. Notificaciones relevantes
- **a.** Como usuario final, quiero recibir alertas en tiempo real cuando mi generación de energía sea baja, mi consumo sea alto y haya transacciones relacionadas con mi energía, para tomar acciones oportunas y evitar problemas energéticos.

#### 10. Gestión de perfil
- **a.** Como usuario registrado, quiero iniciar sesión y gestionar mi perfil, para personalizar mis datos y ajustar configuraciones según mis necesidades.

### **Historias de Usuario - No Funcionales**

#### 11. Seguridad de datos
- **a.** Como usuario final, quiero que todos mis datos sean almacenados y transmitidos de manera encriptada, para proteger mi información personal y financiera contra accesos no autorizados.

#### 12. Disponibilidad y escalabilidad
- **a.** Como administrador del sistema, quiero que la aplicación sea completamente escalable y siempre disponible, para garantizar un servicio confiable, incluso con un gran número de usuarios.

#### 13. Rendimiento en consultas
- **a.** Como usuario del sistema, quiero que las consultas de datos y análisis sean rápidas y eficientes, para acceder a la información en tiempo real sin demoras.

#### 14. Manejo de errores
- **a.** Como usuario del sistema, quiero que los errores sean manejados correctamente con mensajes claros y específicos, para saber cómo resolverlos o reportarlos.

#### 15. Tolerancia a fallos
- **a.** Como usuario del sistema, quiero que la plataforma funcione adecuadamente incluso si un microservicio falla, para evitar interrupciones en el servicio.

#### 16. Documentación para desarrolladores
- **a.** Como desarrollador o nuevo miembro del equipo, quiero acceder a documentación clara y completa del sistema y la API, para comprender rápidamente su funcionamiento y comenzar a trabajar sin dificultades.




<hr>

# Sección 4. Sprint Backlog

<hr>

# Sección 5: Prototipos/ mockups 
El prototipo de Solar Gauge es una primera representación del sistema diseñado para monitorear y gestionar el consumo y la generación de energía en tiempo real. Este prototipo está orientado a usuarios que buscan una solución eficiente para controlar sus fuentes de energía, especialmente aquellas relacionadas con la energía solar.

## Link del prototipo:
 https://www.figma.com/proto/9MBZlRFlehHSyywOP2puTZ/p2?node-id=1-2&t=Il9sJRRfpSAO4kkF-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1

<hr>

<p align="center">
  <img src="https://github.com/user-attachments/assets/ce20e203-f14e-4646-b8ed-160ee45f570f" width="300">
  <img src="https://github.com/user-attachments/assets/df11cf77-673e-4c3d-b851-4a8ecd32f7ee" width="300">
  <img src="https://github.com/user-attachments/assets/ae79c632-b133-422e-b2ed-4221787b3fb2" width="300">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/5cccafee-2c8d-483d-bc3a-b16a3a80c68c" width="300">
  <img src="https://github.com/user-attachments/assets/59cf16a8-b5f1-4762-9bb5-ecd018f3e5ec" width="300">
  <img src="https://github.com/user-attachments/assets/abb8a590-10e7-4fba-934d-64d07e35d998" width="300">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/fd214044-45a7-4e52-86f0-bd6d41e90933" width="300">
  <img src="https://github.com/user-attachments/assets/245a6736-fea0-4d92-a46f-65c3e4d7a993" width="300">
  <img src="https://github.com/user-attachments/assets/4a061932-2151-4b50-9368-f17472c240d3" width="300">
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/080fbaf1-b2b0-407f-aba2-649955150d4b" width="300">
  <img src="https://github.com/user-attachments/assets/cc2dd98c-18e6-4c25-b387-fcce71ef44a2" width="300">
  <img src="https://github.com/user-attachments/assets/db1d54d1-c66d-46f1-94d7-0bfc3643fee9" width="300">
</p>



<hr>

## **Conclusión:**
El prototipo de Solar Gauge es un paso inicial hacia la creación de una herramienta poderosa para la gestión de la energía. A medida que se desarrolle y se perfeccione, se espera que se convierta en un recurso esencial para usuario que deseen maximizar la eficiencia de sus sistemas de energía.

<hr>

# Base de Arquitectura:
## 1. Alcance 

El proyecto consiste en el desarrollo e integración de una aplicación móvil que replicará y ampliará las funcionalidades de la web app existente. La aplicación tendrá como objetivo principal ofrecer a los usuarios una experiencia intuitiva y accesible para gestionar y monitorear sus datos energéticos. 

El alcance funcional de la aplicación incluirá: 

**1. Visualización de consumos y producción:** Los usuarios podrán acceder a datos en tiempo real y históricos sobre un consumo energético y producción (por ejemplo, si cuentan con paneles solares u otras fuentes de energía renovable). Se incluirán gráficos interactivos, tendencias y comparativas para facilitar el análisis. 

**2. Modelos Predictivos:** la aplicación integrará algoritmos de machine learning para ofrecer predicciones personalizadas sobre el consumo futuro, la producción energética y la optimización de recursos. Estos modelos se basarían en datos históricos y factores externos como condiciones climáticas o patrones de uso. 

**3. Mercado Energético:** El Modulo de Mercado Energético permite a los usuarios participar activamente en la compra y venta de energía, ofreciendo herramientas para crear y gestionar ofertas con precios y cantidades personalizadas. Los usuarios accederán a información en tiempo real sobre precios y tarifas dinámicas, junto con recomendaciones inteligentes para ajustar sus ofertas o consumo según las condiciones del mercado. Esto permitirá maximizar ingresos, reducir costes y tomar decisiones informadas para optimizar su participación en el mercado energético. 

**4. Energía Almacenada:** La aplicación incluirá un módulo para monitorear y gestionar la energía almacenada (por ejemplo, en baterías). Los usuarios podrán visualizar el porcentaje de la carga, la capacidad de almacenamiento y la energía disponible. 

## 2. Descripción de los componentes

**Estilos Arquitectónicos Usados**
| Tipo aplicación: | Web site/ APP  | 
|--|--|
| **Estilo arquitectónico:**| Arquitectura Basada en Microservicios  **Justificación:** Permite escalar cada servicio de manera independiente, facilitando la integración con terceros. **Implicaciones:** Mayor complejidad en la gestión de despliegues y comunicación entre servicios, pero mayor flexibilidad.   |
| **Lenguaje de programación:**| JavaScript / TypeScript |
| **Aspectos técnicos:** | Node.js, MySql, TailwindCSS, FastAPI |
| **Frameworks:** | React Native, Expo Librarie, Node.js |

## 3. Dimensión del sistema


## 4. Requisitos no funcionales


## 5. Diagrama de clases

## 6.Diagrama de componentes del sistema



