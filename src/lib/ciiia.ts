/**
 * Contenido institucional real del CII.IA (Centro de Innovación Industrial en
 * Inteligencia Artificial), portado desde el proyecto cii.ia-artificial-intelligence.
 * No inventar cifras, clientes ni cargos: donde falta un dato se usa SIN_DATO.
 */

export const SIN_DATO = "—";

export type ExecutionStage = {
  id: string;
  number: string;
  name: string;
  focus: string;
  deliverable: string;
  products: string[];
  description: string;
};

export type ServiceItem = {
  id: string;
  title: string;
  previousName?: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  points: string[];
  startingPrice: string;
  stageMapping: string[];
  technicalSpecs: string[];
  externalLink?: { label: string; href: string };
};

export type ProjectCase = {
  id: string;
  title: string;
  sector: string;
  technology: string;
  metricHighlight: string;
  metricLabel: string;
  challenge: string;
  approach: string;
  outcome: string;
  tags: string[];
};

export type EcosystemPartner = {
  name: string;
  category: "Tech" | "Shareholders" | "Academy & Research" | "AI Specialized" | "Platforms";
  roleInEcosystem: string;
  isFoundingPartner?: boolean;
};

export const TAGLINE = "Global Solutions delivered Locally";

export const MANIFESTO = {
  eyebrow: "CII.IA // NOSOTROS",
  title: "Inteligencia artificial, de la idea a la operación.",
  problem: ["El problema no es la IA.", "Es la última milla."],
  lead: "El CII.IA es el Centro de Innovación Industrial en Inteligencia Artificial. Desde el PIIT, en Nuevo León, acompaña a empresas e instituciones a llevar la inteligencia artificial de la idea a la operación.",
  reto: "Solo el 5% de las empresas de Nuevo León cuenta con equipos internos de ciencia de datos. El CII.IA trabaja el tramo que va del piloto a la operación: prototipado en laboratorio propio, integración con los sistemas existentes, adopción acompañada en piso y gobernanza.",
};

export const INSTITUTIONAL_METRICS: { id: string; value: string; label: string }[] = [
  { id: "i1", value: "12", label: "Soluciones documentadas" },
  { id: "i2", value: "50+", label: "Organizaciones aliadas" },
  { id: "i3", value: "5", label: "Socios fundadores" },
  { id: "i4", value: "2021", label: "Inauguración en el PIIT, Nuevo León" },
];

export type AboutStat = {
  id: string;
  value: string;
  label: string;
  /** Los años no se animan: se imprimen tal cual. */
  isDate: boolean;
};

export type AboutFoundingPartner = {
  id: string;
  name: string;
  role: string;
  /** Ruta dentro de `public/logos/`. */
  logo: string;
  /** Dimensiones intrínsecas del asset: sin ellas next/image deforma la razón. */
  logoWidth: number;
  logoHeight: number;
  url?: string;
  /**
   * El asset viene con fondo claro y marca oscura, así que hay que invertirlo
   * para que se lea sobre el tile oscuro. Innecesario con un SVG transparente.
   */
  logoOnLight?: boolean;
};

export type WorkPrinciple = {
  id: string;
  affirmative: string;
  negative: string;
  highlighted: boolean;
};

export type AboutData = {
  eyebrow: string;
  headlineLines: string[];
  highlightValue: string;
  highlightCopy: string;
  leadParagraph: string;
  labImageSrc: string;
  labImageAlt: string;
  labCaption: string;
  stats: AboutStat[];
  foundingPartnersTitle: string;
  foundingPartnersCopy: string;
  foundingPartners: AboutFoundingPartner[];
  principlesEyebrow: string;
  principlesTitle: string;
  workPrinciples: WorkPrinciple[];
};

/** El índice 01..09 se deriva de la posición en el array, no se guarda aquí. */
export const WORK_PRINCIPLES: WorkPrinciple[] = [
  { id: "descubrimos", affirmative: "DESCUBRIMOS", negative: "no diagnosticamos", highlighted: true },
  { id: "guiamos", affirmative: "GUIAMOS", negative: "no entrenamos", highlighted: false },
  { id: "catalizamos", affirmative: "CATALIZAMOS", negative: "no instruimos", highlighted: false },
  { id: "materializamos", affirmative: "MATERIALIZAMOS", negative: "no adoctrinamos", highlighted: false },
  { id: "educamos", affirmative: "EDUCAMOS", negative: "no damos sermones", highlighted: true },
  { id: "demostramos", affirmative: "DEMOSTRAMOS", negative: "no solo hablamos", highlighted: false },
  { id: "innovamos", affirmative: "INNOVAMOS", negative: "no imitamos", highlighted: false },
  { id: "interrumpimos", affirmative: "INTERRUMPIMOS", negative: "no vamos con la corriente", highlighted: false },
  { id: "lideramos", affirmative: "LIDERAMOS", negative: "no seguimos", highlighted: true },
];

/**
 * TODO: colocar el render del laboratorio en `public/nosotros-encabezado.jpg`.
 * Mientras el archivo no exista, el marco de la imagen se renderiza vacío.
 */
export const ABOUT_LAB_IMAGE_SRC = "/nosotros-encabezado.jpg";

export const ABOUT_DATA: AboutData = {
  eyebrow: MANIFESTO.eyebrow,
  headlineLines: ["El problema", "no es la IA.", "Es la última milla."],
  highlightValue: "5%",
  highlightCopy:
    "de las empresas de Nuevo León cuenta con equipos internos de ciencia de datos",
  leadParagraph:
    "En CII.IA, entendemos que el verdadero desafío no radica en la creación de algoritmos avanzados, sino en la implementación efectiva de estas soluciones en el entorno empresarial real. Nuestra misión es cerrar esa brecha crítica.",
  labImageSrc: ABOUT_LAB_IMAGE_SRC,
  labImageAlt:
    "Laboratorio del CII.IA en el PIIT: celda de manufactura con brazos robóticos industriales",
  labCaption:
    "Nuestra infraestructura de laboratorio, ubicada en el PIIT, es el núcleo de nuestros desarrollos tangibles. Desde aquí, conectamos con ecosistemas globales para acelerar la adopción de IA de vanguardia en la industria regional, asegurando que cada proyecto llegue al final de la milla.",
  stats: INSTITUTIONAL_METRICS.map((metric) => ({
    ...metric,
    isDate: metric.id === "i4",
  })),
  foundingPartnersTitle: "Cinco instituciones fundadoras",
  foundingPartnersCopy:
    "El centro se inauguró en 2021 dentro del programa federal de Centros de Innovación Industrial. Monterrey IT Clúster se encarga de su administración.",
  // TODO: sustituir los PNG por SVG con fondo transparente. Los assets
  // actuales traen fondo opaco (blanco, salvo PROSOFT que es negro), por eso
  // llevan `logoOnLight` y el tratamiento de mezcla en el componente.
  foundingPartners: [
    {
      id: "prosoft",
      name: "PROSOFT · Gobierno de México",
      role: "Programa federal de Centros de Innovación Industrial",
      logo: "/logos/prosoft.png",
      logoWidth: 552,
      logoHeight: 362,
    },
    {
      id: "gobierno",
      name: "Gobierno del Estado de Nuevo León",
      role: "Sede en el Parque de Investigación e Innovación Tecnológica",
      logo: "/logos/gobierno-nl.png",
      logoWidth: 444,
      logoHeight: 450,
      logoOnLight: true,
    },
    {
      id: "mitc",
      name: "Monterrey IT Clúster (Csoftmty)",
      role: "Administración del centro y vinculación con la industria de TI",
      logo: "/logos/mitc.png",
      logoWidth: 350,
      logoHeight: 350,
      logoOnLight: true,
    },
    {
      id: "uanl",
      name: "Universidad Autónoma de Nuevo León",
      role: "Formación de talento y transferencia tecnológica",
      logo: "/logos/uanl.png",
      logoWidth: 697,
      logoHeight: 360,
      logoOnLight: true,
    },
    {
      id: "cimat",
      name: "CIMAT",
      role: "Centro de Investigación en Matemáticas",
      logo: "/logos/cimat.png",
      logoWidth: 395,
      logoHeight: 506,
      logoOnLight: true,
    },
  ],
  principlesEyebrow: "CII.IA // PRINCIPIOS",
  principlesTitle: "Cómo trabajamos",
  workPrinciples: WORK_PRINCIPLES,
};

export const CLIENT_QUOTES = [
  {
    id: "q1",
    quote: "Llevo más de un año tratando de lanzar asistentes virtuales.",
    role: "Voz de cliente recogida por CII.IA",
  },
  {
    id: "q2",
    quote: "Ingeniería trae soluciones a la planta, pero en piso nadie entiende cómo usarlas.",
    role: "Voz de cliente recogida por CII.IA",
  },
];

export const BRAND_PAIRS = [
  { verb1: "DESCUBRIMOS", verb2: "no diagnosticamos" },
  { verb1: "GUIAMOS", verb2: "no entrenamos" },
  { verb1: "CATALIZAMOS", verb2: "no instruimos" },
  { verb1: "MATERIALIZAMOS", verb2: "no adoctrinamos" },
  { verb1: "EDUCAMOS", verb2: "no damos sermones" },
  { verb1: "DEMOSTRAMOS", verb2: "no solo hablamos" },
  { verb1: "INNOVAMOS", verb2: "no imitamos" },
  { verb1: "INTERRUMPIMOS", verb2: "no vamos con la corriente" },
  { verb1: "LIDERAMOS", verb2: "no seguimos" },
];

export const FOUNDING_PARTNERS: EcosystemPartner[] = [
  {
    name: "PROSOFT · Gobierno de México",
    category: "Shareholders",
    roleInEcosystem: "Socio fundador · Programa federal de Centros de Innovación Industrial",
    isFoundingPartner: true,
  },
  {
    name: "Gobierno del Estado de Nuevo León",
    category: "Shareholders",
    roleInEcosystem: "Socio fundador · Sede en el Parque de Investigación e Innovación Tecnológica",
    isFoundingPartner: true,
  },
  {
    name: "Monterrey IT Clúster (Csoftmty)",
    category: "Shareholders",
    roleInEcosystem: "Socio fundador · Administración del centro y vinculación con la industria de TI",
    isFoundingPartner: true,
  },
  {
    name: "Universidad Autónoma de Nuevo León",
    category: "Shareholders",
    roleInEcosystem: "Socio fundador · Formación de talento y transferencia tecnológica",
    isFoundingPartner: true,
  },
  {
    name: "CIMAT",
    category: "Shareholders",
    roleInEcosystem: "Socio fundador · Centro de Investigación en Matemáticas",
    isFoundingPartner: true,
  },
];

export const ALL_PARTNERS: EcosystemPartner[] = [
  ...FOUNDING_PARTNERS,
  { name: "NVIDIA", category: "Tech", roleInEcosystem: "Aliado tecnológico · Deep Learning Institute" },
  { name: "IBM", category: "Tech", roleInEcosystem: "Aliado tecnológico" },
  { name: "Microsoft", category: "Tech", roleInEcosystem: "Aliado tecnológico" },
  { name: "Intel", category: "Tech", roleInEcosystem: "Aliado tecnológico" },
  { name: "Qualcomm", category: "Tech", roleInEcosystem: "Aliado tecnológico" },
  { name: "KUKA", category: "Tech", roleInEcosystem: "Aliado tecnológico · Robótica industrial" },
  { name: "Microsoft Azure", category: "Platforms", roleInEcosystem: "Plataforma de nube" },
  { name: "Amazon Web Services", category: "Platforms", roleInEcosystem: "Plataforma de nube" },
  { name: "Google Cloud", category: "Platforms", roleInEcosystem: "Plataforma de nube" },
  { name: "H2O.ai", category: "Platforms", roleInEcosystem: "Plataforma de IA" },
  { name: "AVEVA", category: "Platforms", roleInEcosystem: "Plataforma industrial" },
  { name: "REKOR", category: "Platforms", roleInEcosystem: "Plataforma de visión" },
  { name: "Tecnológico de Monterrey · AI Hub", category: "Academy & Research", roleInEcosystem: "Academia e investigación" },
  { name: "FIME · UANL", category: "Academy & Research", roleInEcosystem: "Academia e investigación" },
  { name: "Université de Montréal", category: "Academy & Research", roleInEcosystem: "Academia internacional" },
  { name: "Universidad Externado de Colombia", category: "Academy & Research", roleInEcosystem: "Academia internacional" },
  { name: "INCmty", category: "Academy & Research", roleInEcosystem: "Ecosistema de innovación" },
  { name: "Nuevo León 4.0", category: "AI Specialized", roleInEcosystem: "Iniciativa estatal de Industria 4.0" },
  { name: "CLAUT", category: "AI Specialized", roleInEcosystem: "Clúster automotriz de Nuevo León" },
  { name: "CLELAC", category: "AI Specialized", roleInEcosystem: "Clúster de electrodomésticos" },
  { name: "AMT", category: "AI Specialized", roleInEcosystem: "Organismo del ecosistema industrial" },
  { name: "mxTI", category: "AI Specialized", roleInEcosystem: "Consejo nacional de clústeres de TI" },
  { name: "Kernel", category: "Shareholders", roleInEcosystem: "Empresa socia · desarrolla y opera HIVA" },
  { name: "Microsip", category: "Shareholders", roleInEcosystem: "Empresa socia" },
  { name: "Novalan", category: "Shareholders", roleInEcosystem: "Empresa socia" },
  { name: "Northware", category: "Shareholders", roleInEcosystem: "Empresa socia" },
  { name: "SIT Consultores", category: "Shareholders", roleInEcosystem: "Empresa socia" },
  { name: "PCG", category: "Shareholders", roleInEcosystem: "Empresa socia" },
];

export type EcosystemCategoryId =
  | "tecnologia"
  | "plataformas"
  | "academia"
  | "industria"
  | "empresas";

export type EcosystemCategory = {
  id: EcosystemCategoryId;
  label: string;
};

export type EcosystemPartnerEntry = {
  id: string;
  name: string;
  categoryId: EcosystemCategoryId;
  /** Ruta en `public/logos/ecosistema/`, derivada del id. */
  logo: string;
  /** Solo cuando aporta algo que la categoría no comunica ya. */
  note?: string;
  url?: string;
};

export const ECOSYSTEM_CATEGORIES: EcosystemCategory[] = [
  { id: "tecnologia", label: "Tecnología" },
  { id: "plataformas", label: "Plataformas" },
  { id: "academia", label: "Academia e investigación" },
  { id: "industria", label: "Industria y clústeres" },
  { id: "empresas", label: "Empresas socias" },
];

const ecosystemLogo = (id: string): string => `/logos/ecosistema/${id}.svg`;

/**
 * TODO: faltan los 28 SVG en `public/logos/ecosistema/`. Mientras no existan,
 * cada tile cae al fallback con el nombre en mono. Archivos esperados:
 * nvidia.svg, ibm.svg, microsoft.svg, intel.svg, qualcomm.svg, kuka.svg,
 * microsoft-azure.svg, aws.svg, google-cloud.svg, h2o-ai.svg, aveva.svg,
 * rekor.svg, tec-monterrey.svg, fime-uanl.svg, universite-montreal.svg,
 * externado-colombia.svg, incmty.svg, nuevo-leon-40.svg, claut.svg,
 * clelac.svg, amt.svg, mxti.svg, kernel.svg, microsip.svg, novalan.svg,
 * northware.svg, sit-consultores.svg, pcg.svg
 */
export const ECOSYSTEM_PARTNERS: EcosystemPartnerEntry[] = [
  { id: "nvidia", name: "NVIDIA", categoryId: "tecnologia", logo: ecosystemLogo("nvidia"), note: "Deep Learning Institute" },
  { id: "ibm", name: "IBM", categoryId: "tecnologia", logo: ecosystemLogo("ibm") },
  { id: "microsoft", name: "Microsoft", categoryId: "tecnologia", logo: ecosystemLogo("microsoft") },
  { id: "intel", name: "Intel", categoryId: "tecnologia", logo: ecosystemLogo("intel") },
  { id: "qualcomm", name: "Qualcomm", categoryId: "tecnologia", logo: ecosystemLogo("qualcomm") },
  { id: "kuka", name: "KUKA", categoryId: "tecnologia", logo: ecosystemLogo("kuka"), note: "Robótica industrial" },

  { id: "microsoft-azure", name: "Microsoft Azure", categoryId: "plataformas", logo: ecosystemLogo("microsoft-azure") },
  { id: "aws", name: "Amazon Web Services", categoryId: "plataformas", logo: ecosystemLogo("aws") },
  { id: "google-cloud", name: "Google Cloud", categoryId: "plataformas", logo: ecosystemLogo("google-cloud") },
  { id: "h2o-ai", name: "H2O.ai", categoryId: "plataformas", logo: ecosystemLogo("h2o-ai") },
  { id: "aveva", name: "AVEVA", categoryId: "plataformas", logo: ecosystemLogo("aveva"), note: "Plataforma industrial" },
  { id: "rekor", name: "REKOR", categoryId: "plataformas", logo: ecosystemLogo("rekor"), note: "Plataforma de visión" },

  { id: "tec-monterrey", name: "Tecnológico de Monterrey", categoryId: "academia", logo: ecosystemLogo("tec-monterrey"), note: "AI Hub" },
  { id: "fime-uanl", name: "FIME · UANL", categoryId: "academia", logo: ecosystemLogo("fime-uanl") },
  { id: "universite-montreal", name: "Université de Montréal", categoryId: "academia", logo: ecosystemLogo("universite-montreal"), note: "Internacional" },
  { id: "externado-colombia", name: "Universidad Externado de Colombia", categoryId: "academia", logo: ecosystemLogo("externado-colombia"), note: "Internacional" },
  { id: "incmty", name: "INCmty", categoryId: "academia", logo: ecosystemLogo("incmty"), note: "Ecosistema de innovación" },

  { id: "nuevo-leon-40", name: "Nuevo León 4.0", categoryId: "industria", logo: ecosystemLogo("nuevo-leon-40"), note: "Iniciativa estatal de Industria 4.0" },
  { id: "claut", name: "CLAUT", categoryId: "industria", logo: ecosystemLogo("claut"), note: "Clúster automotriz" },
  { id: "clelac", name: "CLELAC", categoryId: "industria", logo: ecosystemLogo("clelac"), note: "Clúster de electrodomésticos" },
  { id: "amt", name: "AMT", categoryId: "industria", logo: ecosystemLogo("amt") },
  { id: "mxti", name: "mxTI", categoryId: "industria", logo: ecosystemLogo("mxti"), note: "Consejo nacional de clústeres de TI" },

  { id: "kernel", name: "Kernel", categoryId: "empresas", logo: ecosystemLogo("kernel"), note: "Desarrolla y opera HIVA" },
  { id: "microsip", name: "Microsip", categoryId: "empresas", logo: ecosystemLogo("microsip") },
  { id: "novalan", name: "Novalan", categoryId: "empresas", logo: ecosystemLogo("novalan") },
  { id: "northware", name: "Northware", categoryId: "empresas", logo: ecosystemLogo("northware") },
  { id: "sit-consultores", name: "SIT Consultores", categoryId: "empresas", logo: ecosystemLogo("sit-consultores") },
  { id: "pcg", name: "PCG", categoryId: "empresas", logo: ecosystemLogo("pcg") },
];

export const ECOSYSTEM_INTRO =
  "Más de 50 organizaciones de tecnología, academia, gobierno e industria forman parte del ecosistema del CII.IA.";

export const ECOSYSTEM_GROUPS: { category: EcosystemPartner["category"]; title: string }[] = [
  { category: "Tech", title: "Tecnología" },
  { category: "Platforms", title: "Plataformas" },
  { category: "Academy & Research", title: "Academia e investigación" },
  { category: "AI Specialized", title: "Industria y clústeres" },
  { category: "Shareholders", title: "Empresas socias" },
];

export const EXECUTION_STAGES: ExecutionStage[] = [
  {
    id: "descubrir",
    number: "01",
    name: "DESCUBRIR",
    focus: "Estrategia y priorización de casos de uso",
    deliverable: "Roadmap de Adopción IA a 6–12 meses",
    products: ["Workshop IA + Innovación", "Masterclass ejecutiva", "Assessment"],
    description:
      "Identificamos los retos operativos donde la inteligencia artificial tiene sentido y los ordenamos por impacto y viabilidad. Nada se construye antes de saber qué merece construirse.",
  },
  {
    id: "disenar",
    number: "02",
    name: "DISEÑAR",
    focus: "Arquitectura, integración y gobernanza",
    deliverable: "Blueprint técnico y modelo operativo",
    products: ["Arquitectura e integración", "Gobernanza de datos y ética", "Ciberseguridad"],
    description:
      "Definimos datos, integración, modelo y gobernanza. El diseño contempla desde el principio cómo se va a mantener la solución, no solo cómo se va a demostrar.",
  },
  {
    id: "desarrollar",
    number: "03",
    name: "DESARROLLAR",
    focus: "Prototipado en laboratorio propio",
    deliverable: "Sandbox → MVP → PoC",
    products: ["AI Lab", "AI Learning Factory NL", "Modelos a la medida"],
    description:
      "Construimos y probamos en el laboratorio del PIIT, con equipo físico. El prototipo se valida contra las condiciones de tu operación antes de convertirse en inversión.",
  },
  {
    id: "desplegar",
    number: "04",
    name: "DESPLEGAR",
    focus: "Puesta en operación y adopción",
    deliverable: "Integración y despliegue en operación",
    products: ["Integración", "HIVA", "Change management", "CII.IA Academy"],
    description:
      "Integramos con los sistemas existentes y acompañamos la adopción en piso, que es donde la mayoría de los proyectos se detienen.",
  },
  {
    id: "escalar",
    number: "05",
    name: "ESCALAR",
    focus: "Industrialización y eficiencia operativa",
    deliverable: "Operación continua y optimización",
    products: ["Industrialización", "Optimización", "Formación del equipo interno"],
    description:
      "Industrializamos lo que ya funciona y formamos al equipo interno para que la capacidad se quede en tu organización. Escalar no es repetir el piloto: es hacerlo sostenible.",
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-execution",
    title: "AI EXECUTION",
    previousName: "Antes: AI Consulting",
    category: "Estrategia y ejecución",
    badge: "TRANSFORMADO",
    tagline: "Convertimos estrategia en soluciones operando.",
    description:
      "Una consultora entrega recomendaciones. Nosotros acompañamos hasta que la solución opera, con arquitectura, gobernanza y adopción en piso.",
    points: [
      "Workshop IA + Innovación: ideación y priorización de casos de uso",
      "Roadmap de Adopción IA a 6–12 meses",
      "Proyectos a la medida: ciencia de datos, visión, IA generativa, XR y gemelos digitales",
    ],
    startingPrice: "Workshop desde MXN $85,000",
    stageMapping: ["descubrir", "disenar"],
    technicalSpecs: ["Masterclass ejecutiva", "Workshop de 6–8 h", "Roadmap priorizado"],
  },
  {
    id: "ai-lab",
    title: "AI LAB / PROTOTYPING",
    previousName: "Laboratorio de prototipado",
    category: "Infraestructura física",
    badge: "ACTIVO DIFERENCIADOR",
    tagline: "Tu reto en prototipo antes de ser inversión.",
    description:
      "Infraestructura física propia en el PIIT: celda de manufactura, robots, drones, equipo de realidad virtual, dispositivos edge y data center. Es un activo que muy pocos tienen en México.",
    points: [
      "Ciclo Sandbox → MVP → PoC → Industrialización",
      "Validación con equipo industrial antes de tocar la línea de producción",
      "Modelos propios y adaptados: datos sintéticos, visión y asistentes",
    ],
    startingPrice: "A cotizar según alcance",
    stageMapping: ["disenar", "desarrollar"],
    technicalSpecs: ["Celda de manufactura", "Robótica y drones", "Realidad virtual", "Edge y data center"],
  },
  {
    id: "academy",
    title: "CII.IA ACADEMY",
    previousName: "Antes: AI Training",
    category: "Formación",
    badge: "NVIDIA DLI",
    tagline: "Que la capacidad se quede dentro de tu organización.",
    description:
      "Formación ejecutiva y técnica. El CII.IA imparte certificaciones del NVIDIA Deep Learning Institute y programas corporativos a la medida.",
    points: [
      "Siete líneas de producto, de programas ejecutivos a tracks técnicos",
      "Certificaciones NVIDIA Deep Learning Institute",
      "Programas corporativos adaptados al reto de cada organización",
    ],
    startingPrice: "Certificación NVIDIA DLI desde MXN $7,950",
    stageMapping: ["desplegar", "escalar"],
    technicalSpecs: ["NVIDIA DLI", "Programas ejecutivos", "Programas corporativos"],
    externalLink: { label: "Certificación NVIDIA DLI en ciiia.mx", href: "https://ciiia.mx/nvidia" },
  },
  {
    id: "hiva",
    title: "HIVA",
    category: "Plataforma de agentes",
    badge: "PLATAFORMA DEL ECOSISTEMA",
    tagline: "Agentes que entienden, responden y ejecutan.",
    description:
      "Plataforma empresarial de agentes virtuales con cinco capas: agente, modelo de lenguaje, base de conocimiento, integración y seguridad empresarial.",
    points: [
      "Integración con ERP, CRM, bases de datos, documentos, data lakes y APIs",
      "Despliegue SaaS multi-tenant, instancia dedicada o en tu infraestructura",
      "Base de conocimiento y flujos de trabajo configurables por agente",
    ],
    startingPrice: "Licencia anual USD $7,950 + implementación USD $3,500",
    stageMapping: ["desplegar", "escalar"],
    technicalSpecs: ["SaaS multi-tenant", "Instancia dedicada", "On-premise", "Seguridad empresarial"],
  },
  {
    id: "pymes",
    title: "IA PARA PYMES",
    previousName: "Programa de Innovación Empresarial con IA",
    category: "Acceso y competitividad",
    badge: "PROGRAMA INSTITUCIONAL",
    tagline: "Capacidades de clase mundial sin equipo interno.",
    description:
      "Solo el 5% de las empresas de Nuevo León —principalmente trasnacionales— cuenta con equipos internos de ciencia de datos. Este programa existe para el otro 95%.",
    points: [
      "Adopción de IA: diagnóstico, casos de uso, MVP funcional e implementación",
      "Consultoría preferencial",
      "Formación especializada",
    ],
    startingPrice: "Valor estimado del proyecto MXN $100,000 · con apoyo institucional",
    stageMapping: ["descubrir", "desarrollar"],
    technicalSpecs: ["Diagnóstico", "MVP funcional", "Acompañamiento"],
  },
];

export const PROJECT_CASES: ProjectCase[] = [
  {
    id: "caso-01",
    title: "Sistema de Inspección",
    sector: "Manufactura",
    technology: "Visión Computacional",
    metricHighlight: "-55%",
    metricLabel: "PAROS DE LÍNEA",
    challenge: "La inspección manual no alcanza el ritmo de la línea y los defectos se detectan tarde.",
    approach: "Inspección automatizada con visión por computadora integrada al proceso productivo.",
    outcome: "55% menos paros, 28% menos tiempo improductivo, 30% menos desperdicio y 60% menos tiempo de inspección.",
    tags: ["Visión por computadora", "Calidad", "Manufactura"],
  },
  {
    id: "caso-02",
    title: "Mantenimiento Predictivo",
    sector: "Manufactura",
    technology: "Ciencia de Datos",
    metricHighlight: "3",
    metricLabel: "MODELOS DE MACHINE LEARNING",
    challenge: "El mantenimiento reactivo genera paros no programados en equipo crítico.",
    approach: "Tres modelos de machine learning sobre datos de operación del equipo.",
    outcome: "Detección de anomalías, predicción de fallo y estimación de vida útil.",
    tags: ["Ciencia de datos", "Confiabilidad", "Mantenimiento"],
  },
  {
    id: "caso-03",
    title: "Plataforma Inteligente de Producción",
    sector: "Manufactura",
    technology: "IA Generativa",
    metricHighlight: "7",
    metricLabel: "COMPONENTES DE LA PLATAFORMA",
    challenge: "Las decisiones de producción se toman sin visibilidad integrada del proceso.",
    approach: "Plataforma que combina modelo predictivo, analítica de operación y asistente virtual.",
    outcome:
      "Modelo predictivo, OEE, sistema de recomendación, eficiencia operativa, análisis de operación, variables exógenas y asistente virtual.",
    tags: ["IA generativa", "Ciencia de datos", "OEE"],
  },
  {
    id: "caso-04",
    title: "Inspección de Calidad",
    sector: "Manufactura",
    technology: "Visión Computacional",
    metricHighlight: "4",
    metricLabel: "CAPACIDADES EN TIEMPO REAL",
    challenge: "La detección de defectos depende del criterio y la fatiga del inspector.",
    approach: "Visión por computadora en tiempo real sobre la línea.",
    outcome: "Detección de defectos, clasificación, medición y métricas de productividad.",
    tags: ["Visión por computadora", "Calidad"],
  },
  {
    id: "caso-05",
    title: "Plataforma de Asistentes Virtuales",
    sector: "Multisectorial",
    technology: "IA Generativa",
    metricHighlight: "4",
    metricLabel: "CAPACIDADES DEL AGENTE",
    challenge: "Las organizaciones necesitan asistentes que además de responder, ejecuten.",
    approach: "Plataforma empresarial para crear asistentes virtuales inteligentes.",
    outcome: "Agentes capaces de entender, responder, ejecutar y aprender.",
    tags: ["IA generativa", "Agentes", "HIVA"],
  },
  {
    id: "caso-06",
    title: "Sistema de Recomendación",
    sector: "Comercio y Retail",
    technology: "IA Generativa",
    metricHighlight: "3",
    metricLabel: "PALANCAS DE RENDIMIENTO",
    challenge: "Las decisiones comerciales se toman sin modelar el comportamiento del cliente.",
    approach: "Análisis de comportamiento y agente de recomendaciones sobre variables comerciales.",
    outcome: "Mejores rendimientos en margen, ingreso y volumen.",
    tags: ["Ciencia de datos", "IA generativa", "Comercial"],
  },
  {
    id: "caso-07",
    title: "Sistema de Visión Retail",
    sector: "Comercio y Retail",
    technology: "Visión Computacional",
    metricHighlight: "5",
    metricLabel: "DIMENSIONES DE ANÁLISIS",
    challenge: "El comportamiento del cliente en piso de venta no se mide.",
    approach: "Visión por computadora sobre las cámaras del punto de venta.",
    outcome: "Segmentación y conteo, mapas de calor, análisis demográfico, flujo y permanencia, y detección de emociones.",
    tags: ["Visión por computadora", "Retail"],
  },
  {
    id: "caso-08",
    title: "Sistema de Visión para Seguridad",
    sector: "Seguridad Industrial",
    technology: "Visión Computacional",
    metricHighlight: "4",
    metricLabel: "CAPAS DE DETECCIÓN",
    challenge: "El cumplimiento de seguridad depende de supervisión humana intermitente.",
    approach: "Visión por computadora sobre las cámaras existentes de la instalación.",
    outcome: "Detección de equipo de protección personal, zonas restringidas, situaciones de riesgo y prevención de incidentes.",
    tags: ["Visión por computadora", "Seguridad industrial", "EPP"],
  },
  {
    id: "caso-09",
    title: "Detección de Intrusos",
    sector: "Seguridad Industrial",
    technology: "Robótica y Drones",
    metricHighlight: "2",
    metricLabel: "MODOS DE VIGILANCIA",
    challenge: "La vigilancia perimetral de instalaciones extensas es costosa y discontinua.",
    approach: "Visión por computadora combinada con drones para cobertura perimetral.",
    outcome: "Detección de personas y de comportamientos intrusivos en el perímetro.",
    tags: ["Drones", "Visión por computadora", "Perímetro"],
  },
  {
    id: "caso-10",
    title: "Análisis de Comportamiento de Cartera",
    sector: "Servicios Financieros",
    technology: "Ciencia de Datos",
    metricHighlight: "3",
    metricLabel: "COMPONENTES DEL SISTEMA",
    challenge: "El deterioro de cartera se detecta cuando el incumplimiento ya se materializó.",
    approach: "Modelos para identificar desviaciones tempranas en el comportamiento de pago.",
    outcome:
      "Detección temprana, alertas priorizadas y un asistente interno que explica qué cambió, por qué importa y qué acciones considerar.",
    tags: ["Ciencia de datos", "IA generativa", "Riesgo"],
  },
  {
    id: "caso-11",
    title: "Detección de Anomalías y Planeación de Demanda",
    sector: "Multisectorial",
    technology: "Ciencia de Datos",
    metricHighlight: "3",
    metricLabel: "CAPACIDADES DE PLANEACIÓN",
    challenge: "La planeación de demanda se apoya en históricos sin considerar variables externas.",
    approach: "Modelos de pronóstico con detección de anomalías y simulación de escenarios.",
    outcome: "Planeación de demanda, pronóstico de ventas y simulación de escenarios.",
    tags: ["Ciencia de datos", "Pronóstico", "Planeación"],
  },
  {
    id: "caso-12",
    title: "Plataforma de Incidencia Delictiva",
    sector: "Seguridad Pública",
    technology: "Ciencia de Datos",
    metricHighlight: "4",
    metricLabel: "MÓDULOS DE LA PLATAFORMA",
    challenge: "Las fuentes de información sobre incidencia están dispersas y sin modelo predictivo.",
    approach: "Integración de fuentes y modelado espacial y temporal de la incidencia.",
    outcome: "Mapas de calor, pronóstico, integración de fuentes y análisis de comportamiento.",
    tags: ["Ciencia de datos", "IA generativa", "Sector público"],
  },
];

export const INDUSTRIAL_SECTORS = [
  { id: "manufactura", name: "Manufactura" },
  { id: "retail", name: "Comercio y Retail" },
  { id: "seguridad-industrial", name: "Seguridad Industrial" },
  { id: "multisectorial", name: "Multisectorial" },
  { id: "financiero", name: "Servicios Financieros" },
  { id: "publico", name: "Seguridad Pública" },
];

export const CONTACT_INFO = {
  email: "contacto@ciiia.mx",
  phoneDisplay: "+52 81 2000 2127",
  phoneHref: "tel:+528120002127",
  location: "Parque de Investigación e Innovación Tecnológica (PIIT), Apodaca, Nuevo León",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/cii-ia/" },
    { label: "Facebook", href: "https://www.facebook.com/CII.IA1/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCz3SuYojOMFFs5re1oMRiBg" },
  ],
};
