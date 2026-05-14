export interface OwnProject {
  id: string
  category: string
  categoryColor: string
  titles: Record<string, string>
  location: string
  phase: string
}

export const ownProjects: OwnProject[] = [
  {
    id: 'juguetes-hospitalizados',
    category: 'Protecció/Social',
    categoryColor: 'bg-amber-100 text-amber-700',
    titles: {
      ca: 'Joguines per a nens hospitalitzats',
      es: 'Juguetes para niños hospitalizados',
      en: 'Toys for hospitalised children',
      fr: 'Jouets pour enfants hospitalisés',
      de: 'Spielzeug für hospitalisierte Kinder',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'libros-infantiles',
    category: 'Educació',
    categoryColor: 'bg-blue-100 text-blue-700',
    titles: {
      ca: 'Llibres infantils 0–6 anys',
      es: 'Libros infantiles 0-6 años',
      en: 'Children\'s books 0–6 years',
      fr: 'Livres pour enfants 0–6 ans',
      de: 'Kinderbücher 0–6 Jahre',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'olla-comunitaria',
    category: 'Alimentació',
    categoryColor: 'bg-orange-100 text-orange-700',
    titles: {
      ca: 'Olla comunitària setmanal (1 mes)',
      es: 'Olla comunitaria semanal (1 mes)',
      en: 'Weekly community pot (1 month)',
      fr: 'Marmite communautaire hebdomadaire (1 mois)',
      de: 'Wöchentlicher Gemeinschaftstopf (1 Monat)',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'material-artistico',
    category: 'Educació',
    categoryColor: 'bg-blue-100 text-blue-700',
    titles: {
      ca: 'Material artístic per a escoles',
      es: 'Material artístico para escuelas',
      en: 'Art materials for schools',
      fr: 'Matériel artistique pour les écoles',
      de: 'Kunstmaterial für Schulen',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'calcetines-termicos',
    category: 'Calçat i roba',
    categoryColor: 'bg-pink-100 text-pink-700',
    titles: {
      ca: 'Mitjons tèrmics per a l\'hivern',
      es: 'Calcetines térmicos para invierno',
      en: 'Thermal socks for winter',
      fr: 'Chaussettes thermiques pour l\'hiver',
      de: 'Thermosocken für den Winter',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'manta-emergencia',
    category: 'Habitatge/Energia',
    categoryColor: 'bg-green-100 text-green-700',
    titles: {
      ca: 'Manta d\'emergència (supervivència)',
      es: 'Manta de emergencia (supervivencia)',
      en: 'Emergency blanket (survival)',
      fr: 'Couverture de survie',
      de: 'Notfalldecke (Überleben)',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'manta-saco',
    category: 'Habitatge/Energia',
    categoryColor: 'bg-green-100 text-green-700',
    titles: {
      ca: 'Manta i sac de dormir tèrmic',
      es: 'Manta y saco de dormir térmico',
      en: 'Thermal blanket and sleeping bag',
      fr: 'Couverture et sac de couchage thermique',
      de: 'Thermische Decke und Schlafsack',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'actividades-recreativas',
    category: 'Protecció/Social',
    categoryColor: 'bg-amber-100 text-amber-700',
    titles: {
      ca: 'Activitats recreatives per a menors',
      es: 'Actividades recreativas para menores',
      en: 'Recreational activities for minors',
      fr: 'Activités récréatives pour mineurs',
      de: 'Freizeitaktivitäten für Minderjährige',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'limpieza-playa',
    category: 'Medi ambient',
    categoryColor: 'bg-teal-100 text-teal-700',
    titles: {
      ca: 'Neteja de platja o riu (esdeveniment)',
      es: 'Limpieza de playa o río (evento)',
      en: 'Beach or river clean-up (event)',
      fr: 'Nettoyage de plage ou rivière (événement)',
      de: 'Strand- oder Flussreinigung (Veranstaltung)',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'educacion-ambiental',
    category: 'Medi ambient',
    categoryColor: 'bg-teal-100 text-teal-700',
    titles: {
      ca: 'Educació ambiental a col·legis',
      es: 'Educación ambiental en colegios',
      en: 'Environmental education in schools',
      fr: 'Éducation environnementale dans les écoles',
      de: 'Umweltbildung in Schulen',
    },
    location: 'España',
    phase: 'Fase 1',
  },
  {
    id: 'nevera-comunitaria',
    category: 'Alimentació',
    categoryColor: 'bg-orange-100 text-orange-700',
    titles: {
      ca: 'Nevera comunitària + reposició mensual',
      es: 'Nevera comunitaria + reposición mensual',
      en: 'Community fridge + monthly restocking',
      fr: 'Réfrigérateur communautaire + réapprovisionnement mensuel',
      de: 'Gemeinschaftskühlschrank + monatliche Auffüllung',
    },
    location: 'España',
    phase: 'Fase 1',
  },
]

export const pageTitles: Record<string, string> = {
  ca: 'Projectes Propis',
  es: 'Proyectos Propios',
  en: 'Own Projects',
  fr: 'Projets Propres',
  de: 'Eigene Projekte',
}

export const pageSubtitles: Record<string, string> = {
  ca: 'Acció directa a Espanya — Fase 1',
  es: 'Acción directa en España — Fase 1',
  en: 'Direct action in Spain — Phase 1',
  fr: 'Action directe en Espagne — Phase 1',
  de: 'Direktmaßnahmen in Spanien — Phase 1',
}

export const pageDescs: Record<string, string> = {
  ca: 'A més de col·laborar amb ONG acreditades, Unaria impulsa projectes propis d\'acció directa sobre el terreny. Aquests són els primers projectes de la Fase 1, centrats en necessitats bàsiques a Espanya.',
  es: 'Además de colaborar con ONG acreditadas, Unaria impulsa proyectos propios de acción directa sobre el terreno. Estos son los primeros proyectos de la Fase 1, centrados en necesidades básicas en España.',
  en: 'In addition to working with accredited NGOs, Unaria drives its own direct-action projects on the ground. These are the first Phase 1 projects, focused on basic needs in Spain.',
  fr: 'En plus de collaborer avec des ONG accréditées, Unaria porte ses propres projets d\'action directe sur le terrain. Ce sont les premiers projets de la Phase 1, axés sur les besoins essentiels en Espagne.',
  de: 'Neben der Zusammenarbeit mit akkreditierten NGOs fördert Unaria eigene Direkteinsatzprojekte vor Ort. Dies sind die ersten Phase-1-Projekte mit Fokus auf Grundbedürfnisse in Spanien.',
}
